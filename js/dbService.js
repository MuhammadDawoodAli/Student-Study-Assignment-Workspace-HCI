/**
 * FocusFlow Database Service (Supabase PostgreSQL CRUD)
 */
class DbService {
  get client() {
    return window.supabaseClient;
  }

  async requireUserId() {
    const user = await window.AuthService.getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    return user.id;
  }

  getLocalDateStr(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // --------------------------------------------------------------------------
  // PROFILES
  // --------------------------------------------------------------------------
  async getProfile() {
    const userId = await this.requireUserId();
    const { data, error } = await this.client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      const user = await window.AuthService.getCurrentUser();
      const fallbackName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student';
      const { data: created, error: insertErr } = await this.client
        .from('profiles')
        .upsert({
          id: userId,
          full_name: fallbackName,
          email: user.email
        })
        .select()
        .single();
      if (insertErr) throw insertErr;
      return created;
    }

    // Reset visible streak if user missed yesterday
    const today = this.getLocalDateStr();
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = this.getLocalDateStr(yesterdayDate);

    if (data.last_study_date && data.last_study_date !== today && data.last_study_date !== yesterday && data.current_streak > 0) {
      const { data: updated } = await this.client
        .from('profiles')
        .update({ current_streak: 0, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single();
      return updated || data;
    }

    return data;
  }

  async updateProfile(updates) {
    const userId = await this.requireUserId();
    const { data, error } = await this.client
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // --------------------------------------------------------------------------
  // COURSES CRUD
  // --------------------------------------------------------------------------
  async getCourses() {
    const userId = await this.requireUserId();
    const { data, error } = await this.client
      .from('courses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async createCourse({ code, name, color }) {
    const userId = await this.requireUserId();
    const { data, error } = await this.client
      .from('courses')
      .insert({
        user_id: userId,
        code: code.trim().toUpperCase(),
        name: name.trim(),
        color: color || '#6366f1'
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteCourse(courseId) {
    const userId = await this.requireUserId();
    const { error } = await this.client
      .from('courses')
      .delete()
      .eq('id', courseId)
      .eq('user_id', userId);
    if (error) throw error;
  }

  // --------------------------------------------------------------------------
  // ASSIGNMENTS CRUD
  // --------------------------------------------------------------------------
  async getAssignments() {
    const userId = await this.requireUserId();
    const { data, error } = await this.client
      .from('assignments')
      .select('*, courses(id, code, name, color)')
      .eq('user_id', userId)
      .order('status', { ascending: true })
      .order('due_date', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async createAssignment(payload) {
    const userId = await this.requireUserId();
    const { data, error } = await this.client
      .from('assignments')
      .insert({
        user_id: userId,
        course_id: payload.course_id || null,
        title: payload.title.trim(),
        notes: payload.notes ? payload.notes.trim() : null,
        priority: payload.priority || 'medium',
        due_date: payload.due_date || null,
        estimated_pomodoros: Number(payload.estimated_pomodoros) || 2,
        status: payload.status || 'todo'
      })
      .select('*, courses(id, code, name, color)')
      .single();
    if (error) throw error;
    return data;
  }

  async updateAssignment(id, updates) {
    const userId = await this.requireUserId();
    const cleanUpdates = { ...updates, updated_at: new Date().toISOString() };
    if (cleanUpdates.status === 'completed' && !cleanUpdates.completed_at) {
      cleanUpdates.completed_at = new Date().toISOString();
    } else if (cleanUpdates.status && cleanUpdates.status !== 'completed') {
      cleanUpdates.completed_at = null;
    }

    const { data, error } = await this.client
      .from('assignments')
      .update(cleanUpdates)
      .eq('id', id)
      .eq('user_id', userId)
      .select('*, courses(id, code, name, color)')
      .single();
    if (error) throw error;
    return data;
  }

  async deleteAssignment(id) {
    const userId = await this.requireUserId();
    const { error } = await this.client
      .from('assignments')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    if (error) throw error;
  }

  // --------------------------------------------------------------------------
  // FOCUS SESSIONS & STREAK ENGINE
  // --------------------------------------------------------------------------
  async logFocusSession({ assignmentId, mode, durationMinutes, contextMode, fatigueLevel }) {
    const userId = await this.requireUserId();

    // 1. Insert session record
    const { data: sessionRow, error: sessErr } = await this.client
      .from('focus_sessions')
      .insert({
        user_id: userId,
        assignment_id: assignmentId || null,
        mode,
        duration_minutes: durationMinutes,
        context_mode: contextMode || 'afternoon',
        fatigue_level: fatigueLevel || 'normal'
      })
      .select('*, assignments(id, title)')
      .single();

    if (sessErr) throw sessErr;

    if (mode === 'focus') {
      // 2. Increment assignment completed_pomodoros if linked
      if (assignmentId) {
        const { data: currentTask } = await this.client
          .from('assignments')
          .select('completed_pomodoros, status')
          .eq('id', assignmentId)
          .eq('user_id', userId)
          .single();

        if (currentTask) {
          const nextStatus = currentTask.status === 'todo' ? 'in_progress' : currentTask.status;
          await this.client
            .from('assignments')
            .update({
              completed_pomodoros: (currentTask.completed_pomodoros || 0) + 1,
              status: nextStatus,
              updated_at: new Date().toISOString()
            })
            .eq('id', assignmentId)
            .eq('user_id', userId);
        }
      }

      // 3. Update daily streak in profile
      await this.syncStreakOnFocusComplete();
    }

    return sessionRow;
  }

  async syncStreakOnFocusComplete() {
    const profile = await this.getProfile();
    const today = this.getLocalDateStr();
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = this.getLocalDateStr(yesterdayDate);

    if (profile.last_study_date === today) {
      return profile; // Already counted today
    }

    const newStreak = profile.last_study_date === yesterday ? (profile.current_streak || 0) + 1 : 1;
    const longestStreak = Math.max(profile.longest_streak || 0, newStreak);

    return this.updateProfile({
      current_streak: newStreak,
      longest_streak: longestStreak,
      last_study_date: today
    });
  }

  async getTodayStats() {
    const userId = await this.requireUserId();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const { data, error } = await this.client
      .from('focus_sessions')
      .select('*, assignments(id, title)')
      .eq('user_id', userId)
      .gte('completed_at', startOfDay.toISOString())
      .order('completed_at', { ascending: false });

    if (error) throw error;

    const sessions = data || [];
    const focusSessions = sessions.filter(s => s.mode === 'focus');
    const totalMinutesToday = focusSessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);

    return {
      completedSessionsToday: focusSessions.length,
      totalMinutesToday,
      todaySessions: sessions
    };
  }
}

window.DbService = new DbService();
