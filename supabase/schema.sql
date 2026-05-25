create extension if not exists "pgcrypto";

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text,
  instagram_username text,
  source text,
  channel text,
  persona text,
  keyword text,
  interest text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  referrer text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create table if not exists waitlists (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  type text not null check (type in ('app', 'course', 'mock', 'api', 'crypto', 'premium')),
  selected_options text[] default '{}',
  persona text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create table if not exists mock_trades (
  id uuid primary key default gen_random_uuid(),
  email text,
  symbol text not null,
  trade_date date,
  direction text check (direction in ('long', 'short', 'watch')),
  condition_name text,
  entry_reason text,
  stop_rule text,
  target_rule text,
  result text,
  review text,
  emotion text,
  persona text,
  source text,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create table if not exists partner_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  company text,
  category text,
  message text not null,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  email text,
  product_slug text not null,
  creem_checkout_id text,
  creem_customer_id text,
  creem_subscription_id text,
  status text not null default 'pending',
  amount integer,
  currency text default 'KRW',
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  anonymous_id text,
  email text,
  path text,
  source text,
  persona text,
  properties jsonb default '{}',
  created_at timestamptz default now()
);

alter table leads enable row level security;
alter table waitlists enable row level security;
alter table mock_trades enable row level security;
alter table partner_inquiries enable row level security;
alter table orders enable row level security;
alter table events enable row level security;

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists waitlists_type_created_at_idx on waitlists (type, created_at desc);
create index if not exists mock_trades_created_at_idx on mock_trades (created_at desc);
create index if not exists orders_checkout_id_idx on orders (creem_checkout_id);
create index if not exists events_name_created_at_idx on events (event_name, created_at desc);
