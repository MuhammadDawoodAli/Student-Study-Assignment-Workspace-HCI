/**
 * ============================================================================
 * FocusFlow - Main Application Controller
 * Coordinates Auth, PostgreSQL CRUD, Pomodoro Timer, Circadian Adaptation,
 * Soundscapes, and Accessibility.
 * ============================================================================
 */

class FocusFlowApp {
  constructor() {
    this.CIRCUMFERENCE = 2 * Math.PI * 130; // 816.81 px for SVG Ring
    this.authMode = 'signin'; // 'signin' | 'signup'
    this.courses = [];
    this.assignments = [];
    this.todaySessions = [];
    this.selectedCourseFilter = 'all';
    this.currentUser = null;
  }

  async init() {
    window.ContextEngine.init();
    if (window.AccessibilityEngine) window.AccessibilityEngine.init();

    this.setupProgressRing();
    this.bindAuthControls();
    this.bindTimerControls();
    this.bindContextControls();
    this.bindFatigueWidget();
    this.bindAudioControls();
    this.bindModalControls();
    this.bindWorkspaceControls();
    this.bindKeyboardShortcuts();

    window.PersuasiveEngine.subscribe((data) => this.renderTimerUpdate(data));
    window.ContextEngine.subscribe((data) => this.renderContextUpdate(data));
    window.PersuasiveEngine.onSessionLogged = async () => {
      await this.loadWorkspaceData();
    };

    // Check Supabase configuration
    if (!window.isSupabaseConfigured()) {
      const warnEl = document.getElementById('supabase-config-warning');
      if (warnEl) warnEl.classList.remove('hidden');
      this.showAuthView();
      return;
    }

    // Listen to auth state changes
    window.AuthService.onAuthStateChange(async (_event, session) => {
      if (session && session.user) {
        await this.handleSignedIn(session.user);
      } else {
        this.handleSignedOut();
      }
    });

    // Initial session check
    try {
      const session = await window.AuthService.getSession();
      if (session && session.user) {
        await this.handleSignedIn(session.user);
      } else {
        this.showAuthView();
      }
    } catch (err) {
      console.error('Initial auth check error:', err);
      this.showAuthView();
    }
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATION UI & STATE
  // --------------------------------------------------------------------------
  bindAuthControls() {
    const tabSignin = document.getElementById('auth-tab-signin');
    const tabSignup = document.getElementById('auth-tab-signup');
    const nameWrap = document.getElementById('auth-name-wrap');
    const submitBtn = document.getElementById('auth-submit-btn');
    const authForm = document.getElementById('auth-form');
    const googleBtn = document.getElementById('google-signin-btn');
    const signOutBtn = document.getElementById('sign-out-btn');

    const setMode = (mode) => {
      this.authMode = mode;
      this.clearAuthFeedback();
      if (mode === 'signup') {
        tabSignup.classList.add('active', 'text-white');
        tabSignup.classList.remove('opacity-75', 'text-slate-300');
        tabSignin.classList.remove('active', 'text-white');
        tabSignin.classList.add('opacity-75', 'text-slate-300');
        nameWrap.classList.remove('hidden');
        submitBtn.textContent = 'Create Account';
      } else {
        tabSignin.classList.add('active', 'text-white');
        tabSignin.classList.remove('opacity-75', 'text-slate-300');
        tabSignup.classList.remove('active', 'text-white');
        tabSignup.classList.add('opacity-75', 'text-slate-300');
        nameWrap.classList.add('hidden');
        submitBtn.textContent = 'Sign In';
      }
    };

    if (tabSignin) tabSignin.addEventListener('click', () => setMode('signin'));
    if (tabSignup) tabSignup.addEventListener('click', () => setMode('signup'));

    if (authForm) {
      authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        this.clearAuthFeedback();
        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-password').value;
        const fullName = document.getElementById('auth-fullname').value.trim();

        submitBtn.disabled = true;
        submitBtn.textContent = this.authMode === 'signup' ? 'Creating Account...' : 'Signing In...';

        try {
          if (this.authMode === 'signup') {
            const data = await window.AuthService.signUpWithEmail(email, password, fullName || email.split('@')[0]);
            if (data.user && !data.session) {
              this.showAuthFeedback('Account created! Please check your email to confirm your address before signing in.', 'success');
            }
          } else {
            await window.AuthService.signInWithEmail(email, password);
          }
        } catch (err) {
          this.showAuthFeedback(err.message || 'Authentication failed.', 'error');
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = this.authMode === 'signup' ? 'Create Account' : 'Sign In';
        }
      });
    }

    if (googleBtn) {
      googleBtn.addEventListener('click', async () => {
        this.clearAuthFeedback();
        try {
          await window.AuthService.signInWithGoogle();
        } catch (err) {
          this.showAuthFeedback(err.message || 'Google sign-in failed.', 'error');
        }
      });
    }

    if (signOutBtn) {
      signOutBtn.addEventListener('click', async () => {
        window.PersuasiveEngine.pauseTimer();
        await window.AuthService.signOut();
      });
    }
  }

  showAuthFeedback(message, type = 'error') {
    const el = document.getElementById('auth-feedback');
    if (!el) return;
    el.textContent = message;
    el.className = type === 'success'
      ? 'p-3 rounded-xl text-xs font-medium bg-emerald-500/20 border border-emerald-400/40 text-emerald-200'
      : 'p-3 rounded-xl text-xs font-medium bg-rose-500/20 border border-rose-400/40 text-rose-200';
    el.classList.remove('hidden');
  }

  clearAuthFeedback() {
    const el = document.getElementById('auth-feedback');
    if (el) el.classList.add('hidden');
  }

  showAuthView() {
    document.getElementById('auth-section')?.classList.remove('hidden');
    document.getElementById('main-content')?.classList.add('hidden');
    const accountBar = document.getElementById('user-account-bar');
    if (accountBar) {
      accountBar.classList.add('hidden');
      accountBar.classList.remove('flex');
    }
  }

  async handleSignedIn(user) {
    this.currentUser = user;
    document.getElementById('auth-section')?.classList.add('hidden');
    document.getElementById('main-content')?.classList.remove('hidden');

    const accountBar = document.getElementById('user-account-bar');
    if (accountBar) {
      accountBar.classList.remove('hidden');
      accountBar.classList.add('flex');
    }

    const nameEl = document.getElementById('user-display-name');
    if (nameEl) {
      nameEl.textContent = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student';
    }

    await this.loadWorkspaceData();
  }

  handleSignedOut() {
    this.currentUser = null;
    this.courses = [];
    this.assignments = [];
    this.todaySessions = [];
    this.showAuthView();
  }

  // --------------------------------------------------------------------------
  // DATABASE HYDRATION & RENDERING
  // --------------------------------------------------------------------------
  async loadWorkspaceData() {
    if (!this.currentUser || !window.isSupabaseConfigured()) return;

    try {
      const [profile, courses, assignments, todayStats] = await Promise.all([
        window.DbService.getProfile(),
        window.DbService.getCourses(),
        window.DbService.getAssignments(),
        window.DbService.getTodayStats()
      ]);

      this.courses = courses;
      this.assignments = assignments;
      this.todaySessions = todayStats.todaySessions || [];

      if (profile?.full_name) {
        const nameEl = document.getElementById('user-display-name');
        if (nameEl) nameEl.textContent = profile.full_name;
      }

      if (profile?.preferred_soundscape && window.AudioEngine) {
        window.AudioEngine.setSoundscape(profile.preferred_soundscape);
        this.highlightSoundscapePill(profile.preferred_soundscape);
      }

      await window.PersuasiveEngine.syncFromDatabase();

      this.renderCourseFilters();
      this.renderAssignmentSelects();
      this.renderAssignmentsList();
      this.renderAdaptivePanels();
    } catch (err) {
      console.error('Failed to load workspace data:', err);
    }
  }

  // --------------------------------------------------------------------------
  // TIMER & PROGRESS RING
  // --------------------------------------------------------------------------
  setupProgressRing() {
    const ring = document.getElementById('timer-progress-ring');
    if (ring) {
      ring.style.strokeDasharray = `${this.CIRCUMFERENCE} ${this.CIRCUMFERENCE}`;
      ring.style.strokeDashoffset = '0';
    }
  }

  bindTimerControls() {
    const startPauseBtn = document.getElementById('start-pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const skipBtn = document.getElementById('skip-btn');
    const activeAssignSelect = document.getElementById('active-assignment-select');
    const editGoalBtn = document.getElementById('edit-daily-goal-btn');

    const focusBtn = document.getElementById('mode-focus-btn');
    const shortBtn = document.getElementById('mode-short-btn');
    const longBtn = document.getElementById('mode-long-btn');

    if (startPauseBtn) {
      startPauseBtn.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playTick();
        if (window.PersuasiveEngine.isRunning) {
          window.PersuasiveEngine.pauseTimer();
        } else {
          window.PersuasiveEngine.startTimer();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playTick();
        window.PersuasiveEngine.resetTimer();
      });
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playTick();
        window.PersuasiveEngine.handleTimerCompletion(false);
      });
    }

    if (activeAssignSelect) {
      activeAssignSelect.addEventListener('change', (e) => {
        window.PersuasiveEngine.setActiveAssignment(e.target.value || null);
        this.renderAdaptivePanels();
      });
    }

    if (editGoalBtn) {
      editGoalBtn.addEventListener('click', async () => {
        const current = window.PersuasiveEngine.state.dailyGoal || 4;
        const input = prompt('Set your daily study sprint goal (1–20 sessions):', String(current));
        if (input !== null) {
          await window.PersuasiveEngine.setDailyGoal(input);
        }
      });
    }

    [
      { btn: focusBtn, mode: 'focus' },
      { btn: shortBtn, mode: 'shortBreak' },
      { btn: longBtn, mode: 'longBreak' }
    ].forEach(({ btn, mode }) => {
      if (btn) {
        btn.addEventListener('click', () => {
          if (window.AudioEngine) window.AudioEngine.playTick();
          window.PersuasiveEngine.setMode(mode);
          this.updateModePills(mode);
        });
      }
    });
  }

  updateModePills(activeMode) {
    const pills = {
      focus: document.getElementById('mode-focus-btn'),
      shortBreak: document.getElementById('mode-short-btn'),
      longBreak: document.getElementById('mode-long-btn')
    };

    Object.entries(pills).forEach(([key, pill]) => {
      if (!pill) return;
      if (key === activeMode) {
        pill.classList.add('active', 'bg-indigo-600/30', 'border-indigo-400');
        pill.classList.remove('opacity-60');
      } else {
        pill.classList.remove('active', 'bg-indigo-600/30', 'border-indigo-400');
        pill.classList.add('opacity-60');
      }
    });

    const modeLabel = document.getElementById('timer-mode-label');
    if (modeLabel) {
      modeLabel.textContent = activeMode === 'focus' ? 'Focus Sprint' : activeMode === 'shortBreak' ? 'Short Break' : 'Long Break';
    }
  }

  // --------------------------------------------------------------------------
  // CONTEXT & FATIGUE CONTROLS
  // --------------------------------------------------------------------------
  bindContextControls() {
    const selector = document.getElementById('context-override-select');
    if (selector) {
      selector.value = window.ContextEngine.overrideMode;
      selector.addEventListener('change', (e) => {
        if (window.AudioEngine) window.AudioEngine.playTick();
        window.ContextEngine.setOverride(e.target.value);
      });
    }
  }

  bindFatigueWidget() {
    const fatigueOptions = document.querySelectorAll('.fatigue-option-btn');
    fatigueOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.fatigue;
        if (window.AudioEngine) window.AudioEngine.playTick();
        window.ContextEngine.setFatigueLevel(level);

        fatigueOptions.forEach(b => b.classList.remove('active', 'ring-2', 'ring-amber-400'));
        btn.classList.add('active', 'ring-2', 'ring-amber-400');
      });
    });
  }

  // --------------------------------------------------------------------------
  // AUDIO & SOUNDSCAPE POPOVER
  // --------------------------------------------------------------------------
  bindAudioControls() {
    const muteBtn = document.getElementById('audio-mute-btn');
    const popoverBtn = document.getElementById('ambient-popover-btn');
    const popover = document.getElementById('soundscape-popover');
    const ambientBtn = document.getElementById('ambient-sound-btn');

    if (popoverBtn && popover) {
      popoverBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !popover.classList.contains('hidden');
        popover.classList.toggle('hidden', isOpen);
        popoverBtn.setAttribute('aria-expanded', String(!isOpen));
      });

      document.addEventListener('click', (e) => {
        if (!popover.classList.contains('hidden') && !popover.contains(e.target) && e.target !== popoverBtn) {
          popover.classList.add('hidden');
          popoverBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = window.AudioEngine.toggleMute();
        muteBtn.innerHTML = isMuted
          ? `<svg class="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>`
          : `<svg class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>`;
      });
    }

    if (ambientBtn) {
      ambientBtn.addEventListener('click', () => {
        const isPlaying = window.AudioEngine.toggleAmbientSound();
        this.updateAmbientStatusLabel(isPlaying);
      });
    }

    const soundscapeBtns = document.querySelectorAll('.soundscape-option-btn');
    soundscapeBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const soundscape = btn.dataset.soundscape;
        const isCurrentActive = window.AudioEngine.currentSoundscape === soundscape && window.AudioEngine.isAmbientPlaying;

        if (isCurrentActive) {
          window.AudioEngine.stopAmbientSound();
          this.updateAmbientStatusLabel(false);
        } else {
          window.AudioEngine.setSoundscape(soundscape);
          window.AudioEngine.startAmbientSound();
          this.highlightSoundscapePill(soundscape);
          this.updateAmbientStatusLabel(true);

          if (this.currentUser && window.isSupabaseConfigured()) {
            try {
              await window.DbService.updateProfile({ preferred_soundscape: soundscape });
            } catch (e) {}
          }
        }
      });
    });

    const volSlider = document.getElementById('ambient-volume-slider');
    const volLabel = document.getElementById('ambient-vol-label');
    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        window.AudioEngine.setAmbientVolume(val / 100);
        if (volLabel) volLabel.textContent = `${val}%`;
      });
    }
  }

  highlightSoundscapePill(soundscape) {
    document.querySelectorAll('.soundscape-option-btn').forEach(b => {
      const isMatch = b.dataset.soundscape === soundscape;
      b.classList.toggle('active', isMatch);
      b.classList.toggle('border-emerald-400', isMatch);
      b.classList.toggle('opacity-70', !isMatch);
    });
  }

  updateAmbientStatusLabel(isPlaying) {
    const statusLabel = document.getElementById('ambient-sound-status');
    const popoverBtn = document.getElementById('ambient-popover-btn');
    if (statusLabel) {
      statusLabel.textContent = isPlaying ? window.AudioEngine.currentSoundscape.toUpperCase() : 'Soundscapes';
    }
    if (popoverBtn) {
      popoverBtn.classList.toggle('border-sky-400', isPlaying);
      popoverBtn.classList.toggle('bg-sky-500/20', isPlaying);
    }
  }

  // --------------------------------------------------------------------------
  // NUDGE MODAL
  // --------------------------------------------------------------------------
  bindModalControls() {
    const modalOverlay = document.getElementById('nudge-modal-overlay');
    const confirmBtn = document.getElementById('nudge-modal-confirm');
    const dismissBtn = document.getElementById('nudge-modal-dismiss');

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playTick();
        window.PersuasiveEngine.closeNudgeModal();
        window.PersuasiveEngine.startTimer();
      });
    }

    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        if (window.AudioEngine) window.AudioEngine.playTick();
        window.PersuasiveEngine.closeNudgeModal();
      });
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) window.PersuasiveEngine.closeNudgeModal();
      });
    }
  }

  // --------------------------------------------------------------------------
  // COURSES & ASSIGNMENTS CRUD WORKSPACE
  // --------------------------------------------------------------------------
  bindWorkspaceControls() {
    // Search & status filters
    document.getElementById('assignment-search-input')?.addEventListener('input', () => this.renderAssignmentsList());
    document.getElementById('assignment-status-filter')?.addEventListener('change', () => this.renderAssignmentsList());

    // Assignment Modal Open/Close
    document.getElementById('open-assignment-modal-btn')?.addEventListener('click', () => this.openAssignmentModal());
    document.getElementById('close-assignment-modal-btn')?.addEventListener('click', () => this.closeAssignmentModal());
    document.getElementById('cancel-assignment-modal-btn')?.addEventListener('click', () => this.closeAssignmentModal());

    // Assignment Form Submit (Create or Update)
    document.getElementById('assignment-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('assignment-id-input').value;
      const payload = {
        title: document.getElementById('assignment-title-input').value,
        course_id: document.getElementById('assignment-course-input').value || null,
        priority: document.getElementById('assignment-priority-input').value,
        due_date: document.getElementById('assignment-due-input').value || null,
        estimated_pomodoros: Number(document.getElementById('assignment-est-input').value) || 2,
        notes: document.getElementById('assignment-notes-input').value
      };

      try {
        if (id) {
          await window.DbService.updateAssignment(id, payload);
        } else {
          await window.DbService.createAssignment(payload);
        }
        this.closeAssignmentModal();
        await this.loadWorkspaceData();
      } catch (err) {
        alert(err.message || 'Could not save assignment.');
      }
    });

    // Course Modal Open/Close
    document.getElementById('open-course-modal-btn')?.addEventListener('click', () => this.openCourseModal());
    document.getElementById('close-course-modal-btn')?.addEventListener('click', () => this.closeCourseModal());

    // Course Form Submit
    document.getElementById('course-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = document.getElementById('course-code-input').value;
      const name = document.getElementById('course-name-input').value;
      const color = document.getElementById('course-color-input').value;

      try {
        await window.DbService.createCourse({ code, name, color });
        document.getElementById('course-form').reset();
        await this.loadWorkspaceData();
        this.renderCoursesModalList();
      } catch (err) {
        alert(err.message || 'Could not add course.');
      }
    });
  }

  openAssignmentModal(assignment = null) {
    const modal = document.getElementById('assignment-modal');
    const titleEl = document.getElementById('assignment-modal-title');
    if (!modal) return;

    document.getElementById('assignment-id-input').value = assignment ? assignment.id : '';
    document.getElementById('assignment-title-input').value = assignment ? assignment.title : '';
    document.getElementById('assignment-course-input').value = assignment?.course_id || '';
    document.getElementById('assignment-priority-input').value = assignment?.priority || 'medium';
    document.getElementById('assignment-due-input').value = assignment?.due_date || '';
    document.getElementById('assignment-est-input').value = assignment?.estimated_pomodoros || 2;
    document.getElementById('assignment-notes-input').value = assignment?.notes || '';

    if (titleEl) titleEl.textContent = assignment ? 'Edit Assignment' : 'New Assignment';
    modal.classList.add('open');
  }

  closeAssignmentModal() {
    document.getElementById('assignment-modal')?.classList.remove('open');
  }

  openCourseModal() {
    this.renderCoursesModalList();
    document.getElementById('course-modal')?.classList.add('open');
  }

  closeCourseModal() {
    document.getElementById('course-modal')?.classList.remove('open');
  }

  renderCoursesModalList() {
    const list = document.getElementById('courses-modal-list');
    if (!list) return;

    if (this.courses.length === 0) {
      list.innerHTML = `<p class="text-xs text-slate-400 text-center py-3">No courses added yet. Add your first subject above.</p>`;
      return;
    }

    list.innerHTML = this.courses.map(c => `
      <div class="flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-white/10">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="w-3 h-3 rounded-full flex-shrink-0" style="background:${this.escapeHtml(c.color)}"></span>
          <span class="text-xs font-bold text-white">${this.escapeHtml(c.code)}</span>
          <span class="text-xs text-slate-300 truncate">${this.escapeHtml(c.name)}</span>
        </div>
        <button data-delete-course="${c.id}" class="text-xs text-rose-400 hover:text-rose-300 px-2 py-1">Delete</button>
      </div>
    `).join('');

    list.querySelectorAll('[data-delete-course]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Delete this course? Linked assignments will remain as uncategorized.')) {
          await window.DbService.deleteCourse(btn.dataset.deleteCourse);
          await this.loadWorkspaceData();
          this.renderCoursesModalList();
        }
      });
    });
  }

  renderCourseFilters() {
    const bar = document.getElementById('course-filter-bar');
    if (!bar) return;

    const allActive = this.selectedCourseFilter === 'all';
    let html = `
      <button data-course-filter="all" class="px-3 py-1.5 rounded-xl text-xs font-semibold glass-pill ${allActive ? 'active border-indigo-400 text-white' : 'text-slate-300 opacity-75'}">
        All Courses
      </button>
    `;

    this.courses.forEach(c => {
      const isActive = this.selectedCourseFilter === c.id;
      html += `
        <button data-course-filter="${c.id}" class="px-3 py-1.5 rounded-xl text-xs font-semibold glass-pill flex items-center gap-1.5 ${isActive ? 'active border-indigo-400 text-white' : 'text-slate-300 opacity-80'}">
          <span class="w-2 h-2 rounded-full" style="background:${this.escapeHtml(c.color)}"></span>
          <span>${this.escapeHtml(c.code)}</span>
        </button>
      `;
    });

    bar.innerHTML = html;
    bar.querySelectorAll('[data-course-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedCourseFilter = btn.dataset.courseFilter;
        this.renderCourseFilters();
        this.renderAssignmentsList();
      });
    });
  }

  renderAssignmentSelects() {
    // 1. Course dropdown inside Assignment Modal
    const modalCourseSelect = document.getElementById('assignment-course-input');
    if (modalCourseSelect) {
      modalCourseSelect.innerHTML = `<option value="" class="bg-slate-900">No Course</option>` +
        this.courses.map(c => `<option value="${c.id}" class="bg-slate-900">${this.escapeHtml(c.code)} — ${this.escapeHtml(c.name)}</option>`).join('');
    }

    // 2. Active Assignment dropdown inside Focus Timer
    const timerSelect = document.getElementById('active-assignment-select');
    if (timerSelect) {
      const currentVal = window.PersuasiveEngine.activeAssignmentId || '';
      const activeTasks = this.assignments.filter(a => a.status !== 'completed');
      timerSelect.innerHTML = `<option value="" class="bg-slate-900 text-slate-300">General Study Session (Unlinked)</option>` +
        activeTasks.map(a => `<option value="${a.id}" class="bg-slate-900 text-white">${this.escapeHtml(a.title)} (${a.completed_pomodoros}/${a.estimated_pomodoros} 🍅)</option>`).join('');
      timerSelect.value = activeTasks.some(a => a.id === currentVal) ? currentVal : '';
    }
  }

  renderAssignmentsList() {
    const container = document.getElementById('assignments-list');
    if (!container) return;

    const search = (document.getElementById('assignment-search-input')?.value || '').trim().toLowerCase();
    const statusFilter = document.getElementById('assignment-status-filter')?.value || 'all';

    const filtered = this.assignments.filter(a => {
      if (this.selectedCourseFilter !== 'all' && a.course_id !== this.selectedCourseFilter) return false;
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      if (search && !a.title.toLowerCase().includes(search) && !(a.notes || '').toLowerCase().includes(search)) return false;
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="p-8 rounded-2xl bg-black/20 border border-white/10 text-center space-y-2">
          <p class="text-sm font-semibold text-slate-300">No assignments found</p>
          <p class="text-xs text-slate-400">Click <strong>+ New Assignment</strong> to add coursework and link it to your Pomodoro timer.</p>
        </div>
      `;
      return;
    }

    const priorityStyles = {
      high: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
      medium: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      low: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
    };

    const todayStr = window.DbService.getLocalDateStr();

    container.innerHTML = filtered.map(a => {
      const isCompleted = a.status === 'completed';
      const isFocused = window.PersuasiveEngine.activeAssignmentId === a.id;
      const isOverdue = !isCompleted && a.due_date && a.due_date < todayStr;
      const courseBadge = a.courses
        ? `<span class="px-2 py-0.5 rounded-md text-[10px] font-bold border border-white/10" style="background:${this.escapeHtml(a.courses.color)}22; color:${this.escapeHtml(a.courses.color)}">${this.escapeHtml(a.courses.code)}</span>`
        : '';

      return `
        <div class="p-4 rounded-2xl glass-card border ${isFocused ? 'border-indigo-400 ring-1 ring-indigo-400/50' : 'border-white/10'} flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all">
          <div class="flex items-start gap-3 min-w-0 flex-1">
            <button data-toggle-complete="${a.id}" class="mt-0.5 w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all ${isCompleted ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-white/30 hover:border-indigo-400'}" aria-label="Toggle completion">
              ${isCompleted ? '✓' : ''}
            </button>
            <div class="min-w-0 flex-1 space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                ${courseBadge}
                <h3 class="text-sm font-bold ${isCompleted ? 'line-through text-slate-400' : 'text-white'} truncate">${this.escapeHtml(a.title)}</h3>
                <span class="assignment-secondary-meta px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${priorityStyles[a.priority] || priorityStyles.medium}">${a.priority}</span>
              </div>
              <div class="assignment-secondary-meta flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
                <span>🍅 ${a.completed_pomodoros}/${a.estimated_pomodoros} sprints</span>
                ${a.due_date ? `<span class="${isOverdue ? 'text-rose-400 font-semibold' : ''}">📅 Due ${a.due_date}${isOverdue ? ' (Overdue)' : ''}</span>` : ''}
                ${a.notes ? `<span class="truncate max-w-xs text-slate-400">${this.escapeHtml(a.notes)}</span>` : ''}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1.5 flex-shrink-0">
            ${!isCompleted ? `
              <button data-focus-assignment="${a.id}" class="assignment-focus-btn px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${isFocused ? 'bg-indigo-500 text-white' : 'glass-pill text-indigo-300 hover:text-white'}">
                ${isFocused ? 'Focused' : 'Focus'}
              </button>
            ` : ''}
            <button data-edit-assignment="${a.id}" class="assignment-secondary-meta px-2.5 py-1.5 rounded-xl glass-pill text-xs text-slate-300 hover:text-white">Edit</button>
            <button data-delete-assignment="${a.id}" class="assignment-secondary-meta px-2.5 py-1.5 rounded-xl glass-pill text-xs text-rose-400 hover:text-rose-300">Delete</button>
          </div>
        </div>
      `;
    }).join('');

    // Wire action buttons
    container.querySelectorAll('[data-toggle-complete]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const item = this.assignments.find(x => x.id === btn.dataset.toggleComplete);
        if (!item) return;
        const nextStatus = item.status === 'completed' ? 'todo' : 'completed';
        await window.DbService.updateAssignment(item.id, { status: nextStatus });
        await this.loadWorkspaceData();
      });
    });

    container.querySelectorAll('[data-focus-assignment]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.focusAssignment;
        window.PersuasiveEngine.setActiveAssignment(id);
        const sel = document.getElementById('active-assignment-select');
        if (sel) sel.value = id;
        this.renderAssignmentsList();
        this.renderAdaptivePanels();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    container.querySelectorAll('[data-edit-assignment]').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = this.assignments.find(x => x.id === btn.dataset.editAssignment);
        if (item) this.openAssignmentModal(item);
      });
    });

    container.querySelectorAll('[data-delete-assignment]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Delete this assignment?')) {
          await window.DbService.deleteAssignment(btn.dataset.deleteAssignment);
          if (window.PersuasiveEngine.activeAssignmentId === btn.dataset.deleteAssignment) {
            window.PersuasiveEngine.setActiveAssignment(null);
          }
          await this.loadWorkspaceData();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // ADAPTIVE CIRCADIAN PANELS (DB-DRIVEN)
  // --------------------------------------------------------------------------
  renderAdaptivePanels() {
    // 1. Morning Priority Queue
    const morningList = document.getElementById('morning-priority-list');
    if (morningList) {
      const pending = this.assignments.filter(a => a.status !== 'completed').slice(0, 3);
      if (pending.length === 0) {
        morningList.innerHTML = `<div class="col-span-3 text-slate-400">All caught up! Add a new assignment below to plan your morning.</div>`;
      } else {
        morningList.innerHTML = pending.map(a => `
          <button data-quick-focus="${a.id}" class="text-left p-3 rounded-xl bg-black/25 hover:bg-black/40 border border-white/10 transition-all space-y-1">
            <div class="font-bold text-white truncate">${this.escapeHtml(a.title)}</div>
            <div class="text-[11px] text-sky-300">${a.courses ? this.escapeHtml(a.courses.code) : 'General'} &bull; ${a.completed_pomodoros}/${a.estimated_pomodoros} sprints</div>
          </button>
        `).join('');
        morningList.querySelectorAll('[data-quick-focus]').forEach(btn => {
          btn.addEventListener('click', () => {
            window.PersuasiveEngine.setActiveAssignment(btn.dataset.quickFocus);
            const sel = document.getElementById('active-assignment-select');
            if (sel) sel.value = btn.dataset.quickFocus;
            this.renderAssignmentsList();
            this.renderAdaptivePanels();
          });
        });
      }
    }

    // 2. Afternoon Active Spotlight
    const spotlight = document.getElementById('afternoon-active-spotlight');
    if (spotlight) {
      const active = this.assignments.find(a => a.id === window.PersuasiveEngine.activeAssignmentId);
      if (active) {
        spotlight.innerHTML = `
          <div class="font-bold text-white text-sm mb-1">${this.escapeHtml(active.title)}</div>
          <div class="text-indigo-300 mb-1">${active.completed_pomodoros} of ${active.estimated_pomodoros} sprints completed</div>
          ${active.due_date ? `<div class="text-slate-400">Due: ${active.due_date}</div>` : ''}
        `;
      } else {
        spotlight.textContent = 'Select an assignment in the timer above to track your Pomodoro sprints against it.';
      }
    }

    // 3. Afternoon Today's Study Log
    const logContainer = document.getElementById('afternoon-session-log');
    const logCount = document.getElementById('today-log-count');
    if (logContainer) {
      const focusOnly = this.todaySessions.filter(s => s.mode === 'focus');
      if (logCount) logCount.textContent = `${focusOnly.length} focus ${focusOnly.length === 1 ? 'session' : 'sessions'}`;
      if (focusOnly.length === 0) {
        logContainer.innerHTML = `<div class="text-slate-400">No focus sessions logged today yet. Start your first sprint!</div>`;
      } else {
        logContainer.innerHTML = focusOnly.slice(0, 5).map(s => {
          const time = new Date(s.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const taskName = s.assignments?.title || 'General Study';
          return `<div class="flex items-center justify-between py-1 border-b border-white/5 last:border-0"><span class="truncate text-slate-200">${this.escapeHtml(taskName)}</span><span class="text-slate-400 ml-2 whitespace-nowrap">${s.duration_minutes}m &bull; ${time}</span></div>`;
        }).join('');
      }
    }

    // 4. Night / Fatigued Summary
    const nightSummary = document.getElementById('night-summary-text');
    if (nightSummary) {
      const st = window.PersuasiveEngine.state;
      nightSummary.textContent = `You have completed ${st.completedSessionsToday} focus ${st.completedSessionsToday === 1 ? 'session' : 'sessions'} (${st.totalMinutesToday} minutes) today with a ${st.streak}-day streak. Keep your evening gentle and rest well.`;
    }
  }

  // --------------------------------------------------------------------------
  // KEYBOARD SHORTCUTS & RENDERERS
  // --------------------------------------------------------------------------
  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
      if (!this.currentUser) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (window.PersuasiveEngine.isRunning) window.PersuasiveEngine.pauseTimer();
          else window.PersuasiveEngine.startTimer();
          break;
        case 'KeyR':
          window.PersuasiveEngine.resetTimer();
          break;
        case 'KeyS':
          window.PersuasiveEngine.handleTimerCompletion(false);
          break;
        case 'KeyM':
          document.getElementById('audio-mute-btn')?.click();
          break;
        case 'KeyV':
          window.AccessibilityEngine?.toggleVoiceControl();
          break;
        case 'KeyC':
          window.AccessibilityEngine?.toggleHighContrast();
          break;
        case 'KeyF':
          window.AccessibilityEngine?.cycleFontSize();
          break;
        case 'Slash':
          if (e.shiftKey) {
            e.preventDefault();
            window.AccessibilityEngine?.openHelpModal();
          }
          break;
      }
    });
  }

  renderTimerUpdate(data) {
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) timerDisplay.textContent = data.formattedTime;

    const timerWrap = document.getElementById('timer-circle-wrap');
    if (timerWrap) {
      timerWrap.setAttribute('aria-valuenow', Math.round(data.progress * 100));
      timerWrap.setAttribute('aria-valuetext', `${data.formattedTime} remaining in ${data.currentMode}`);
    }

    window.AccessibilityEngine?.announceTimerMilestone(data.timeLeft, data.totalDuration, data.currentMode, data.isRunning);

    document.title = `${data.formattedTime} - ${data.currentMode === 'focus' ? 'Focus' : 'Break'} | FocusFlow`;

    const ring = document.getElementById('timer-progress-ring');
    if (ring) {
      ring.style.strokeDashoffset = this.CIRCUMFERENCE * (1 - data.progress);
    }

    const startPauseIcon = document.getElementById('start-pause-icon');
    const startPauseText = document.getElementById('start-pause-text');
    if (startPauseIcon && startPauseText) {
      if (data.isRunning) {
        startPauseIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />`;
        startPauseText.textContent = 'Pause';
        timerWrap?.classList.add('timer-pulse-active');
      } else {
        startPauseIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />`;
        startPauseText.textContent = 'Start Focus';
        timerWrap?.classList.remove('timer-pulse-active');
      }
    }

    if (data.state) {
      const streakVal = document.getElementById('streak-count-value');
      const sessionsVal = document.getElementById('sessions-today-value');
      const minutesVal = document.getElementById('total-minutes-value');
      const goalBar = document.getElementById('daily-goal-bar');
      const goalRatio = document.getElementById('daily-goal-ratio');

      if (streakVal) streakVal.textContent = data.state.streak;
      if (sessionsVal) sessionsVal.textContent = data.state.completedSessionsToday;
      if (minutesVal) minutesVal.textContent = `${data.state.totalMinutesToday}m`;

      if (goalBar && goalRatio) {
        const pct = Math.min(100, Math.round((data.state.completedSessionsToday / data.state.dailyGoal) * 100));
        goalBar.style.width = `${pct}%`;
        goalRatio.textContent = `${data.state.completedSessionsToday}/${data.state.dailyGoal} (${pct}%)`;
      }
    }

    this.updateModePills(data.currentMode);
  }

  renderContextUpdate(data) {
    const badge = document.getElementById('active-context-badge');
    const greeting = document.getElementById('context-greeting');
    const subtitle = document.getElementById('context-subtitle');

    if (badge) {
      const icons = {
        morning: '🌅 Morning Dawn',
        afternoon: '⚡ Peak Afternoon',
        night: '🌙 Evening Warm'
      };
      badge.textContent = icons[data.context] || data.context.toUpperCase();
    }

    if (greeting && subtitle) {
      if (data.fatigueLevel === 'high') {
        greeting.textContent = 'Simplified Focus Mode';
        subtitle.textContent = 'Visual clutter is reduced and controls are enlarged for comfortable studying.';
      } else if (data.context === 'morning') {
        greeting.textContent = 'Good Morning! Plan Your Study Day';
        subtitle.textContent = 'High-clarity morning theme active. Prioritize your top assignments below.';
      } else if (data.context === 'afternoon') {
        greeting.textContent = 'Afternoon Flow State';
        subtitle.textContent = 'Balanced deep study workspace. Pick an assignment and start your sprint.';
      } else {
        greeting.textContent = 'Gentle Evening Mode';
        subtitle.textContent = 'Warm amber palette engaged to reduce eye strain during late study sessions.';
      }
    }
  }

  escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

window.FocusFlowApp = new FocusFlowApp();
document.addEventListener('DOMContentLoaded', () => {
  window.FocusFlowApp.init();
});
