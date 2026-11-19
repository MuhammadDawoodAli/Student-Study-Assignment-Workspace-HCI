-- ============================================================================
-- FocusFlow - Student Study & Assignment Workspace
-- Production PostgreSQL Schema & Row-Level Security (RLS) for Supabase
-- ============================================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. PROFILES TABLE (1-to-1 with auth.users)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  daily_goal integer not null default 4 check (daily_goal >= 1 and daily_goal <= 20),
  preferred_soundscape text not null default 'rain' check (preferred_soundscape in ('rain', 'binaural', 'whitenoise', 'waves')),
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_study_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Automatically create a profile row when a new user signs up (Email or Google)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 2. COURSES TABLE (Student Subjects / Modules)
-- ----------------------------------------------------------------------------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  code text not null,
  name text not null,
  color text not null default '#6366f1',
  created_at timestamptz not null default now()
);

create index if not exists idx_courses_user_id on public.courses(user_id);

alter table public.courses enable row level security;

create policy "Users can view their own courses"
  on public.courses for select
  using (auth.uid() = user_id);

create policy "Users can create their own courses"
  on public.courses for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own courses"
  on public.courses for update
  using (auth.uid() = user_id);

create policy "Users can delete their own courses"
  on public.courses for delete
  using (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 3. ASSIGNMENTS TABLE (Tasks, Deadlines, Pomodoro Estimates)
-- ----------------------------------------------------------------------------
create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete set null,
  title text not null,
  notes text,
  priority text not null default 'medium' check (priority in ('high', 'medium', 'low')),
  due_date date,
  estimated_pomodoros integer not null default 2 check (estimated_pomodoros >= 1 and estimated_pomodoros <= 50),
  completed_pomodoros integer not null default 0 check (completed_pomodoros >= 0),
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'completed')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_assignments_user_id on public.assignments(user_id);
create index if not exists idx_assignments_due_date on public.assignments(user_id, due_date);

alter table public.assignments enable row level security;

create policy "Users can view their own assignments"
  on public.assignments for select
  using (auth.uid() = user_id);

create policy "Users can create their own assignments"
  on public.assignments for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own assignments"
  on public.assignments for update
  using (auth.uid() = user_id);

create policy "Users can delete their own assignments"
  on public.assignments for delete
  using (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 4. FOCUS SESSIONS TABLE (Persistent Pomodoro & Break Logs)
-- ----------------------------------------------------------------------------
create table if not exists public.focus_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assignment_id uuid references public.assignments(id) on delete set null,
  mode text not null default 'focus' check (mode in ('focus', 'shortBreak', 'longBreak')),
  duration_minutes integer not null check (duration_minutes > 0),
  context_mode text not null default 'afternoon' check (context_mode in ('morning', 'afternoon', 'night')),
  fatigue_level text not null default 'normal' check (fatigue_level in ('low', 'normal', 'high')),
  completed_at timestamptz not null default now()
);

create index if not exists idx_focus_sessions_user_date on public.focus_sessions(user_id, completed_at desc);

alter table public.focus_sessions enable row level security;

create policy "Users can view their own focus sessions"
  on public.focus_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own focus sessions"
  on public.focus_sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own focus sessions"
  on public.focus_sessions for delete
  using (auth.uid() = user_id);
