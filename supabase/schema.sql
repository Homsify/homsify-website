-- ============================================================================
-- HOMSIFY — SUPABASE SCHEMA
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- Safe to run more than once.
-- ============================================================================

create extension if not exists "pgcrypto";

create table if not exists public.quote_requests (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  -- Contact
  name            text not null,
  company         text,
  email           text not null,
  phone           text not null,

  -- Property
  address         text not null,
  property_type   text not null,
  services        text[] not null default '{}',
  budget          text,
  timeline        text not null,
  message         text not null,

  -- Ops pipeline
  status          text not null default 'new'
                  check (status in ('new','contacted','quoted','won','lost')),
  assigned_to     text,
  internal_notes  text,
  quoted_amount   numeric(12,2),

  -- Attribution
  source          text default 'website',
  page_path       text,
  user_agent      text
);

create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index if not exists quote_requests_status_idx     on public.quote_requests (status);
create index if not exists quote_requests_email_idx      on public.quote_requests (email);

-- ─── Row Level Security ─────────────────────────────────────────────────────
-- Deny by default. There is NO anon policy at all: the website never talks to
-- Supabase from the browser. Writes come only from the Cloudflare function,
-- which uses the service-role key and bypasses RLS. Nothing about your lead
-- list is reachable from the public internet.
alter table public.quote_requests enable row level security;

drop policy if exists "anon can submit a quote request" on public.quote_requests;
drop policy if exists "anon insert" on public.quote_requests;

drop policy if exists "staff can read leads" on public.quote_requests;
create policy "staff can read leads"
  on public.quote_requests for select to authenticated using (true);

drop policy if exists "staff can update leads" on public.quote_requests;
create policy "staff can update leads"
  on public.quote_requests for update to authenticated using (true) with check (true);

-- ─── Clean view for the office ──────────────────────────────────────────────
create or replace view public.quote_requests_inbox as
select
  id,
  to_char(created_at at time zone 'America/Toronto', 'YYYY-MM-DD HH24:MI') as received,
  status, name, company, phone, email, address, property_type,
  array_to_string(services, ', ') as services, budget, timeline, message
from public.quote_requests
order by created_at desc;
