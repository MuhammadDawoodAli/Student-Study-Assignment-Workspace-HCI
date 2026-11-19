/**
 * FocusFlow Supabase Client Wrapper
 * Initializes the Supabase JS v2 client from window.APP_CONFIG.
 */
(function () {
  const cfg = window.APP_CONFIG || {};
  const url = (cfg.SUPABASE_URL || '').trim();
  const key = (cfg.SUPABASE_ANON_KEY || '').trim();

  const isConfigured =
    url.startsWith('https://') &&
    !url.includes('YOUR_SUPABASE_URL') &&
    key.length > 20 &&
    !key.includes('YOUR_SUPABASE_ANON_KEY');

  window.isSupabaseConfigured = () => isConfigured;

  if (isConfigured && window.supabase && typeof window.supabase.createClient === 'function') {
    window.supabaseClient = window.supabase.createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  } else {
    window.supabaseClient = null;
  }
})();
