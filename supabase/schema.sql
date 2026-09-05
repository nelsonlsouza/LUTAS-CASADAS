-- Execute este arquivo no SQL Editor de um projeto Supabase novo.
create extension if not exists pgcrypto;

create table if not exists public.athletes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 1),
  age integer not null check (age between 4 and 100),
  weight numeric(6,2) not null check (weight > 0),
  belt text not null check (belt in ('Branca','Cinza','Amarela','Laranja','Verde','Azul','Roxa','Marrom','Preta')),
  category text not null check (category in ('Infantil','Juvenil','Adulto','Master')),
  gender text not null check (gender in ('Masculino','Feminino','Outro')),
  academy text,
  gi boolean not null default false,
  nogi boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint athletes_has_modality check (gi or nogi)
);

create table if not exists public.fights (
  id uuid primary key default gen_random_uuid(),
  athlete_a_id uuid not null references public.athletes(id) on delete restrict,
  athlete_b_id uuid not null references public.athletes(id) on delete restrict,
  modality text not null check (modality in ('gi','nogi')),
  fight_style text not null check (char_length(trim(fight_style)) > 0),
  status text not null default 'scheduled' check (status in ('scheduled','finished')),
  winner_id uuid references public.athletes(id) on delete restrict,
  victory_method text,
  submission text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint fights_different_athletes check (athlete_a_id <> athlete_b_id),
  constraint fights_valid_winner check (winner_id is null or winner_id in (athlete_a_id, athlete_b_id)),
  constraint fights_finished_result check (status = 'scheduled' or victory_method is not null)
);

create index if not exists fights_athlete_a_idx on public.fights(athlete_a_id);
create index if not exists fights_athlete_b_idx on public.fights(athlete_b_id);

alter table public.athletes enable row level security;
alter table public.fights enable row level security;

drop policy if exists "authenticated athletes select" on public.athletes;
drop policy if exists "authenticated athletes insert" on public.athletes;
drop policy if exists "authenticated athletes update" on public.athletes;
drop policy if exists "authenticated athletes delete" on public.athletes;
create policy "authenticated athletes select" on public.athletes for select to authenticated using (auth.role() = 'authenticated');
create policy "authenticated athletes insert" on public.athletes for insert to authenticated with check (auth.role() = 'authenticated');
create policy "authenticated athletes update" on public.athletes for update to authenticated using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated athletes delete" on public.athletes for delete to authenticated using (auth.role() = 'authenticated');

drop policy if exists "authenticated fights select" on public.fights;
drop policy if exists "authenticated fights insert" on public.fights;
drop policy if exists "authenticated fights update" on public.fights;
drop policy if exists "authenticated fights delete" on public.fights;
create policy "authenticated fights select" on public.fights for select to authenticated using (auth.role() = 'authenticated');
create policy "authenticated fights insert" on public.fights for insert to authenticated with check (auth.role() = 'authenticated');
create policy "authenticated fights update" on public.fights for update to authenticated using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated fights delete" on public.fights for delete to authenticated using (auth.role() = 'authenticated');

-- DADOS OPCIONAIS PARA TESTE. Remova o comentário deste bloco após criar e entrar
-- com o administrador. Os inserts respeitam as constraints da tabela.
/*
insert into public.athletes (name,age,weight,belt,category,gender,academy,gi,nogi,notes) values
('João Silva',18,72.00,'Azul','Adulto','Masculino','Alliance Manaus',true,true,null),
('Pedro Souza',19,73.00,'Azul','Adulto','Masculino','Checkmat Norte',true,true,null),
('Carlos Lima',22,76.50,'Roxa','Adulto','Masculino','Nova União',true,false,'Prefere luta por pontos'),
('Lucas Alves',24,69.80,'Azul','Adulto','Masculino','Atos',false,true,null),
('Mariana Costa',26,61.50,'Roxa','Adulto','Feminino','Gracie Barra',false,true,null),
('Ana Ribeiro',25,60.00,'Roxa','Adulto','Feminino','Atos',true,true,null),
('Rafael Santos',36,82.00,'Marrom','Master','Masculino','GFTeam',true,false,null),
('Bruno Nunes',34,80.50,'Marrom','Master','Masculino','Soul Fighters',true,true,null);
*/
