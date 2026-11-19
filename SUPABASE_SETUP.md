# FocusFlow — Supabase Backend Setup Guide

FocusFlow uses **Supabase (PostgreSQL + Auth)** with zero build tools required. Follow these steps to connect your own live database in ~3 minutes:

## 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New Project**, choose an organization, enter a name (e.g., `focusflow-prod`), set a database password, and click **Create new project**.

## 2. Run the Database Schema
1. In your Supabase dashboard, open **SQL Editor** from the left sidebar.
2. Click **New query**.
3. Copy the entire contents of `supabase/schema.sql` and paste it into the editor.
4. Click **Run** (Ctrl+Enter). This creates:
   - `profiles` (user preferences, daily study goal, persistent streak)
   - `courses` (student subjects/modules)
   - `assignments` (tasks, priorities, due dates, Pomodoro progress)
   - `focus_sessions` (real Pomodoro session logs linked to assignments)
   - Row-Level Security (RLS) policies + automatic profile creation trigger.

## 3. Configure Authentication
1. Go to **Authentication → Providers** in Supabase:
   - **Email**: Enabled by default. (For quick testing/viva, you can disable "Confirm email" under *Authentication → Providers → Email* so newly registered accounts sign in immediately.)
   - **Google (Optional)**: Enable Google, add your Google Cloud OAuth Client ID & Secret, and add your local/deployed URL to **Authentication → URL Configuration → Redirect URLs** (e.g., `http://localhost:5500` or `http://127.0.0.1:5500`).

## 4. Add Your Project Keys to `js/config.js`
1. Go to **Project Settings → API** in Supabase.
2. Copy your **Project URL** and **anon public** key.
3. Open `js/config.js` and paste them:
   ```js
   window.APP_CONFIG = {
     SUPABASE_URL: 'https://your-project-id.supabase.co',
     SUPABASE_ANON_KEY: 'your-anon-public-key'
   };
   ```

## 5. Run Locally (No Build Step)
Serve the folder over `http://localhost` (required for Service Workers & OAuth redirects):
- **VS Code**: Right-click `index.html` → **Open with Live Server**
- **Node**: `npx serve .`
- **Python**: `python -m http.server 5500`
