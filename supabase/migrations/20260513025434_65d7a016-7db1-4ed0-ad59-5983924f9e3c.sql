create table public.mood_checks (
  id uuid primary key default gen_random_uuid(),
  mood smallint not null check (mood between 1 and 5),
  note text check (note is null or char_length(note) <= 500),
  session_id text,
  created_at timestamptz not null default now()
);
alter table public.mood_checks enable row level security;

create policy "Anyone can submit a mood" on public.mood_checks
  for insert to anon, authenticated with check (
    mood between 1 and 5 and (note is null or char_length(note) <= 500)
  );

create policy "Admins can view moods" on public.mood_checks
  for select to authenticated using (private.has_role(auth.uid(), 'admin'::app_role));

create or replace function public.mood_summary()
returns table(mood smallint, count bigint)
language sql
stable
security definer
set search_path = public
as $$
  select mood, count(*)::bigint from public.mood_checks group by mood order by mood;
$$;
grant execute on function public.mood_summary() to anon, authenticated;