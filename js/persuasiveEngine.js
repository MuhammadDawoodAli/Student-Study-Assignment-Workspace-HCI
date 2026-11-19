/**
 * ============================================================================
 * FocusFlow - Focus Timer & Behavioral Habit Engine
 * Manages Pomodoro intervals, active assignment tracking, real DB persistence,
 * and timely recovery/habit nudges.
 * ============================================================================
 */

class PersuasiveEngine {
  constructor() {
    this.durations = {
      focus: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60
    };

    this.currentMode = 'focus'; // 'focus' | 'shortBreak' | 'longBreak'
    this.timeLeft = this.durations.focus;
    this.totalDuration = this.durations.focus;
    this.isRunning = false;
    this.timerInterval = null;
    this.activeAssignmentId = null;
    this.onSessionLogged = null; // Callback for App to refresh assignment list & logs

    this.state = {
      streak: 0,
      longestStreak: 0,
      completedSessionsToday: 0,
      totalMinutesToday: 0,
      dailyGoal: 4
    };

    this.nudgeLibrary = [
      {
        id: 'retention-boost',
        type: 'modal',
        tag: 'Memory Consolidation',
        headline: 'Lock In What You Just Studied',
        message: 'A 5-minute screen-free break helps your brain consolidate new concepts and boosts recall by up to 20%.',
        actionText: 'Start 5-Min Break',
        secondaryText: 'Skip Break'
      },
      {
        id: 'social-proof',
        type: 'modal',
        tag: 'Study Habit',
        headline: 'Time for a Quick Reset',
        message: 'Most top-performing students step away for water and eye relief after 25 minutes of deep focus.',
        actionText: 'Take 5-Min Break',
        secondaryText: 'Keep Going'
      },
      {
        id: 'loss-aversion',
        type: 'toast',
        headline: 'Protect Your Momentum',
        message: 'You are building a strong study streak. Taking short recovery breaks keeps error rates low.'
      },
      {
        id: 'bj-fogg-prompt',
        type: 'toast',
        headline: 'Just Start for 2 Minutes',
        message: 'Starting is the hardest part. Commit to two focused minutes and momentum will take over.'
      },
      {
        id: 'goal-gradient',
        type: 'toast',
        headline: 'Almost There!',
        message: 'Final stretch of this focus sprint — stay locked in until the chime.'
      }
    ];

    this.listeners = [];
  }

  /**
   * Loads real user stats (streak, daily goal, today's sessions & minutes) from Supabase.
   */
  async syncFromDatabase() {
    try {
      if (!window.DbService || !window.isSupabaseConfigured()) return;
      const [profile, todayStats] = await Promise.all([
        window.DbService.getProfile(),
        window.DbService.getTodayStats()
      ]);

      this.state = {
        streak: profile.current_streak || 0,
        longestStreak: profile.longest_streak || 0,
        completedSessionsToday: todayStats.completedSessionsToday || 0,
        totalMinutesToday: todayStats.totalMinutesToday || 0,
        dailyGoal: profile.daily_goal || 4
      };

      this.notify();
    } catch (err) {
      console.error('Failed to sync focus stats from database:', err);
    }
  }

  setActiveAssignment(assignmentId) {
    this.activeAssignmentId = assignmentId || null;
    this.notify();
  }

  async setDailyGoal(goal) {
    const parsed = Math.max(1, Math.min(20, parseInt(goal, 10) || 4));
    this.state.dailyGoal = parsed;
    this.notify();
    try {
      if (window.DbService && window.isSupabaseConfigured()) {
        await window.DbService.updateProfile({ daily_goal: parsed });
      }
    } catch (err) {
      console.error('Failed to update daily goal:', err);
    }
  }

  setMode(mode) {
    this.pauseTimer();
    this.currentMode = mode;
    this.totalDuration = this.durations[mode];
    this.timeLeft = this.totalDuration;
    this.notify();
  }

  startTimer() {
    if (this.isRunning) return;

    this.isRunning = true;
    if (window.AudioEngine) {
      window.AudioEngine.playStartChime();
    }

    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;

        if (this.currentMode === 'focus' && this.timeLeft === Math.floor(this.totalDuration * 0.2)) {
          this.triggerNudge('goal-gradient');
        }

        this.notify();
      } else {
        this.handleTimerCompletion(true);
      }
    }, 1000);

    this.notify();
  }

  pauseTimer() {
    if (!this.isRunning) return;
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.notify();
  }

  resetTimer() {
    this.pauseTimer();
    this.timeLeft = this.totalDuration;
    this.notify();
  }

  /**
   * Handles natural timer completion (or manual "Complete/Skip" cycle).
   * @param {boolean} completedNaturally - true when countdown reached 00:00
   */
  async handleTimerCompletion(completedNaturally = false) {
    this.pauseTimer();

    if (window.AudioEngine) {
      window.AudioEngine.playCompletionGong();
    }

    if (this.currentMode === 'focus') {
      // Calculate elapsed minutes (at least 1 minute if skipped early, or full 25m when natural)
      const elapsedSeconds = this.totalDuration - this.timeLeft;
      const loggedMinutes = completedNaturally
        ? Math.round(this.durations.focus / 60)
        : Math.max(1, Math.round(elapsedSeconds / 60));

      const prevGoalMet = this.state.completedSessionsToday >= this.state.dailyGoal;

      try {
        if (window.DbService && window.isSupabaseConfigured()) {
          await window.DbService.logFocusSession({
            assignmentId: this.activeAssignmentId,
            mode: 'focus',
            durationMinutes: loggedMinutes,
            contextMode: window.ContextEngine ? window.ContextEngine.currentContext : 'afternoon',
            fatigueLevel: window.ContextEngine ? window.ContextEngine.fatigueLevel : 'normal'
          });
          await this.syncFromDatabase();
          if (typeof this.onSessionLogged === 'function') {
            await this.onSessionLogged();
          }
        }
      } catch (err) {
        console.error('Error logging focus session:', err);
      }

      if (!prevGoalMet && this.state.completedSessionsToday >= this.state.dailyGoal && window.AudioEngine) {
        setTimeout(() => window.AudioEngine.playStreakCelebration(), 1200);
      }

      const modalNudge = this.state.completedSessionsToday % 2 === 0
        ? this.nudgeLibrary.find(n => n.id === 'social-proof')
        : this.nudgeLibrary.find(n => n.id === 'retention-boost');

      this.displayNudgeModal(modalNudge);

      // Default next cycle to recovery break
      this.currentMode = (this.state.completedSessionsToday > 0 && this.state.completedSessionsToday % 4 === 0)
        ? 'longBreak'
        : 'shortBreak';
      this.totalDuration = this.durations[this.currentMode];
      this.timeLeft = this.totalDuration;
    } else {
      // Log break session too
      try {
        if (window.DbService && window.isSupabaseConfigured() && completedNaturally) {
          await window.DbService.logFocusSession({
            assignmentId: null,
            mode: this.currentMode,
            durationMinutes: Math.round(this.totalDuration / 60),
            contextMode: window.ContextEngine ? window.ContextEngine.currentContext : 'afternoon',
            fatigueLevel: window.ContextEngine ? window.ContextEngine.fatigueLevel : 'normal'
          });
          if (typeof this.onSessionLogged === 'function') {
            await this.onSessionLogged();
          }
        }
      } catch (err) {
        console.error('Error logging break session:', err);
      }

      this.currentMode = 'focus';
      this.totalDuration = this.durations.focus;
      this.timeLeft = this.totalDuration;

      this.triggerToastNudge({
        headline: 'Break Complete',
        message: 'Recharged and ready. Start your next study sprint when you are set.'
      });
    }

    this.notify();
  }

  triggerNudge(nudgeId) {
    const nudge = this.nudgeLibrary.find(n => n.id === nudgeId);
    if (!nudge) return;
    if (nudge.type === 'modal') {
      this.displayNudgeModal(nudge);
    } else {
      this.triggerToastNudge(nudge);
    }
  }

  displayNudgeModal(nudge) {
    const modalOverlay = document.getElementById('nudge-modal-overlay');
    const modalHeadline = document.getElementById('nudge-modal-headline');
    const modalMessage = document.getElementById('nudge-modal-message');
    const modalTag = document.getElementById('nudge-modal-tag');
    const modalConfirmBtn = document.getElementById('nudge-modal-confirm');
    const modalDismissBtn = document.getElementById('nudge-modal-dismiss');

    if (!modalOverlay || !nudge) return;

    if (modalHeadline) modalHeadline.textContent = nudge.headline;
    if (modalMessage) modalMessage.textContent = nudge.message;
    if (modalTag) modalTag.textContent = nudge.tag || 'Recovery Break';
    if (modalConfirmBtn && nudge.actionText) modalConfirmBtn.textContent = nudge.actionText;
    if (modalDismissBtn && nudge.secondaryText) modalDismissBtn.textContent = nudge.secondaryText;

    modalOverlay.classList.add('open');

    if (window.AudioEngine) {
      window.AudioEngine.playNudgeAlert();
    }
  }

  closeNudgeModal() {
    const modalOverlay = document.getElementById('nudge-modal-overlay');
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  }

  triggerToastNudge(nudge) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `
      <div class="text-xl">✨</div>
      <div class="flex-1">
        <div class="text-xs font-semibold tracking-wider uppercase text-sky-400">${nudge.headline}</div>
        <div class="text-xs text-slate-200 mt-0.5 leading-snug">${nudge.message}</div>
      </div>
      <button class="text-slate-400 hover:text-white p-1 text-sm font-bold ml-1" aria-label="Dismiss">&times;</button>
    `;
    toast.querySelector('button').addEventListener('click', () => toast.remove());

    container.appendChild(toast);

    if (window.AudioEngine) {
      window.AudioEngine.playNudgeAlert();
    }

    setTimeout(() => {
      if (toast && toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 450);
      }
    }, 5500);
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify() {
    const progress = (this.totalDuration - this.timeLeft) / this.totalDuration;
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const data = {
      timeLeft: this.timeLeft,
      totalDuration: this.totalDuration,
      progress,
      formattedTime,
      isRunning: this.isRunning,
      currentMode: this.currentMode,
      activeAssignmentId: this.activeAssignmentId,
      state: this.state
    };

    this.listeners.forEach(cb => {
      try { cb(data); } catch (e) { console.error('Timer listener error:', e); }
    });
  }
}

window.PersuasiveEngine = new PersuasiveEngine();
