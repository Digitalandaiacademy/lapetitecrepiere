-- SQL statements to update Supabase schema for new features

-- Table for storing user favorites
create table if not exists public.favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  product_id uuid references public.products(id),
  created_at timestamp with time zone default now()
);

-- Table for storing site-wide reviews displayed on the homepage
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  user_name varchar not null,
  message text not null,
  created_at timestamp with time zone default now()
);
