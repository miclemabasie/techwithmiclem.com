-- TechWithMiclem — Supabase schema
-- Run this in the Supabase SQL editor, then run seed.sql.

create extension if not exists "pgcrypto";

-- ───────────── Journal ─────────────
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  slug        text not null unique,
  sort_order  int  not null default 0
);

create table if not exists posts (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  excerpt       text not null default '',
  content       text not null default '',          -- markdown-ish plain text; paragraphs split on blank lines
  cover_url     text,
  category_id   uuid references categories(id) on delete set null,
  read_minutes  int  not null default 5,
  tags          text[] not null default '{}',
  published     boolean not null default false,
  published_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);
create index if not exists posts_published_idx on posts (published, published_at desc);
create index if not exists posts_category_idx  on posts (category_id);

create table if not exists topics (               -- "Popular topics" chips in the sidebar
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  sort_order  int  not null default 0
);

-- Post counts per category (only published posts) + a synthetic "All Posts" is built client-side
create or replace view category_counts
with (security_invoker = true) as
select c.id, c.name, c.slug, c.sort_order,
       count(p.id) filter (where p.published) as post_count
from categories c
left join posts p on p.category_id = c.id
group by c.id;

-- ───────────── Home page content ─────────────
create table if not exists focus_items (          -- "What I'm working on right now"
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  detail      text,
  sort_order  int not null default 0
);

create table if not exists skills (               -- "Technical depth" cards
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  icon        text not null default 'cpu',        -- lucide icon key, see src/lib/icons.js
  items       text[] not null default '{}',
  sort_order  int not null default 0
);

create table if not exists tech_proof (           -- "Tech proof" bars
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  icon        text not null default 'cpu',
  status      text not null check (status in ('BUILT','EXPLORING','STUDIED')),
  progress    int  not null default 50 check (progress between 0 and 100),
  sort_order  int not null default 0
);

create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text not null default '',
  image_url   text,
  tags        text[] not null default '{}',
  link        text,
  featured    boolean not null default false,
  sort_order  int not null default 0
);

create table if not exists roadmap (              -- "The road ahead"
  id          uuid primary key default gen_random_uuid(),
  period      text not null,
  title       text not null,
  sort_order  int not null default 0
);

-- ───────────── Inbound (public can insert only) ─────────────
create table if not exists subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  created_at  timestamptz not null default now()
);

create table if not exists messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 120),
  email       text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message     text not null check (char_length(message) between 1 and 5000),
  created_at  timestamptz not null default now()
);

-- ───────────── Row level security ─────────────
alter table categories   enable row level security;
alter table posts        enable row level security;
alter table topics       enable row level security;
alter table focus_items  enable row level security;
alter table skills       enable row level security;
alter table tech_proof   enable row level security;
alter table projects     enable row level security;
alter table roadmap      enable row level security;
alter table subscribers  enable row level security;
alter table messages     enable row level security;

-- Public read of site content
create policy "public read categories"  on categories  for select using (true);
create policy "public read topics"      on topics      for select using (true);
create policy "public read focus"       on focus_items for select using (true);
create policy "public read skills"      on skills      for select using (true);
create policy "public read proof"       on tech_proof  for select using (true);
create policy "public read projects"    on projects    for select using (true);
create policy "public read roadmap"     on roadmap     for select using (true);
create policy "public read published posts" on posts   for select using (published = true);

-- Signed-in owner (you) can do everything. Create your user in Authentication → Users.
create policy "owner all posts"       on posts       for all to authenticated using (true) with check (true);
create policy "owner all categories"  on categories  for all to authenticated using (true) with check (true);
create policy "owner all topics"      on topics      for all to authenticated using (true) with check (true);
create policy "owner all focus"       on focus_items for all to authenticated using (true) with check (true);
create policy "owner all skills"      on skills      for all to authenticated using (true) with check (true);
create policy "owner all proof"       on tech_proof  for all to authenticated using (true) with check (true);
create policy "owner all projects"    on projects    for all to authenticated using (true) with check (true);
create policy "owner all roadmap"     on roadmap     for all to authenticated using (true) with check (true);

-- Visitors may submit the forms, but never read them back
create policy "anyone can subscribe"    on subscribers for insert to anon, authenticated with check (true);
create policy "owner reads subscribers" on subscribers for select to authenticated using (true);
create policy "anyone can message"      on messages    for insert to anon, authenticated with check (true);
create policy "owner reads messages"    on messages    for select to authenticated using (true);

-- Grants (Supabase usually sets these by default; explicit for safety)
grant select on category_counts to anon, authenticated;
grant insert on subscribers, messages to anon, authenticated;
