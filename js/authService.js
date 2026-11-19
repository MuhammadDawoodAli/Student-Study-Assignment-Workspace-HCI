/**
 * FocusFlow Authentication Service (Supabase Auth)
 */
class AuthService {
  get client() {
    return window.supabaseClient;
  }

  ensureClient() {
    if (!window.isSupabaseConfigured() || !this.client) {
      throw new Error('Supabase is not configured. Add your Project URL and Anon Key in js/config.js.');
    }
  }

  async getSession() {
    if (!this.client) return null;
    const { data, error } = await this.client.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  async getCurrentUser() {
    const session = await this.getSession();
    return session ? session.user : null;
  }

  async signUpWithEmail(email, password, fullName) {
    this.ensureClient();
    const { data, error } = await this.client.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });
    if (error) throw error;
    return data;
  }

  async signInWithEmail(email, password) {
    this.ensureClient();
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  }

  async signInWithGoogle() {
    this.ensureClient();
    const { data, error } = await this.client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + window.location.pathname
      }
    });
    if (error) throw error;
    return data;
  }

  async signOut() {
    if (!this.client) return;
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }

  onAuthStateChange(callback) {
    if (!this.client) return { data: { subscription: { unsubscribe: () => {} } } };
    return this.client.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }
}

window.AuthService = new AuthService();
