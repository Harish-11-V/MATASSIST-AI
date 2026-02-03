-- Database Schema for Material Assistant with RAG Support
-- Run this in Supabase SQL Editor

-- Enable required extensions
create extension if not exists vector;
create extension if not exists pg_trgm;

-- ============================================
-- DOCUMENTS TABLE
-- ============================================
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  filename text not null,
  file_path text,
  file_type text,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'error')),
  extracted_text jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for documents
alter table documents enable row level security;

create policy "Users can view their own documents"
  on documents for select
  using (auth.uid() = user_id);

create policy "Users can insert their own documents"
  on documents for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own documents"
  on documents for update
  using (auth.uid() = user_id);

create policy "Users can delete their own documents"
  on documents for delete
  using (auth.uid() = user_id);

-- ============================================
-- DOCUMENT CHUNKS TABLE (for RAG)
-- ============================================
create table if not exists document_chunks (
  id uuid default gen_random_uuid() primary key,
  document_id uuid references documents(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  content text not null,
  metadata jsonb default '{}'::jsonb,
  embedding vector(1536), -- OpenAI ada-002 dimensions
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for faster similarity searches
create index if not exists document_chunks_embedding_idx 
  on document_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- RLS Policies for document_chunks
alter table document_chunks enable row level security;

create policy "Users can view their own chunks"
  on document_chunks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own chunks"
  on document_chunks for insert
  with check (auth.uid() = user_id);

-- ============================================
-- MATERIALS TABLE
-- ============================================
create table if not exists materials (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  document_id uuid references documents(id) on delete cascade,
  material_family text not null,
  grade text not null,
  properties jsonb not null default '{}'::jsonb,
  application text,
  source text default 'uploaded_pdf' check (source in ('uploaded_pdf', 'web_api', 'manual', 'builtin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster material searches
create index if not exists materials_family_idx on materials(material_family);
create index if not exists materials_grade_idx on materials(grade);
create index if not exists materials_application_idx on materials(application);

-- RLS Policies for materials
alter table materials enable row level security;

create policy "Users can view all materials"
  on materials for select
  using (true); -- Public read access for built-in materials

create policy "Users can insert their own materials"
  on materials for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own materials"
  on materials for update
  using (auth.uid() = user_id);

create policy "Users can delete their own materials"
  on materials for delete
  using (auth.uid() = user_id);

-- ============================================
-- MATERIAL CACHE TABLE (for web suggestions)
-- ============================================
create table if not exists material_cache (
  id uuid default gen_random_uuid() primary key,
  application text not null unique,
  materials jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for material_cache
alter table material_cache enable row level security;

create policy "Anyone can view material cache"
  on material_cache for select
  using (true);

create policy "Service role can manage material cache"
  on material_cache for all
  using (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- ANALYSIS RESULTS TABLE
-- ============================================
create table if not exists analysis_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  application text not null,
  design_requirements jsonb not null,
  mechanical_properties jsonb not null,
  standards jsonb not null,
  ranked_materials jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for analysis_results
alter table analysis_results enable row level security;

create policy "Users can view their own analysis results"
  on analysis_results for select
  using (auth.uid() = user_id);

create policy "Users can insert their own analysis results"
  on analysis_results for insert
  with check (auth.uid() = user_id);

-- ============================================
-- VECTOR SIMILARITY SEARCH FUNCTION
-- ============================================
create or replace function match_documents (
  query_embedding vector(1536),
  match_count int default 5,
  match_threshold float default 0.78,
  filter_user_id uuid default null
)
returns table (
  id uuid,
  document_id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    document_chunks.id,
    document_chunks.document_id,
    document_chunks.content,
    document_chunks.metadata,
    1 - (document_chunks.embedding <=> query_embedding) as similarity
  from document_chunks
  where 
    (filter_user_id is null or document_chunks.user_id = filter_user_id)
    and 1 - (document_chunks.embedding <=> query_embedding) > match_threshold
  order by document_chunks.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- ============================================
-- BUILT-IN MATERIALS (Initial Data)
-- ============================================
-- Insert 4 built-in materials for the system
insert into materials (user_id, material_family, grade, properties, application, source) values
(
  null, -- System materials have no user_id
  'Austenitic Stainless Steel',
  '316L',
  '{"tensileStrength": "485 MPa", "yieldStrength": "170 MPa", "elongation": "40%", "hardness": "217 HB", "corrosionResistance": "Excellent", "temperatureRange": "-196°C to 425°C"}'::jsonb,
  'cryogenic',
  'builtin'
),
(
  null,
  'Nickel Steel',
  '9% Ni Steel',
  '{"tensileStrength": "690 MPa", "yieldStrength": "585 MPa", "elongation": "20%", "hardness": "280 HB", "corrosionResistance": "Good", "temperatureRange": "-196°C to 200°C"}'::jsonb,
  'cryogenic',
  'builtin'
),
(
  null,
  'Nickel-Chromium Alloy',
  'Inconel 625',
  '{"tensileStrength": "827 MPa", "yieldStrength": "414 MPa", "elongation": "30%", "hardness": "240 HB", "corrosionResistance": "Exceptional", "temperatureRange": "-196°C to 1000°C"}'::jsonb,
  'subsea',
  'builtin'
),
(
  null,
  'Duplex Stainless Steel',
  '2205 (UNS S31803)',
  '{"tensileStrength": "620 MPa", "yieldStrength": "450 MPa", "elongation": "25%", "hardness": "290 HB", "corrosionResistance": "Excellent", "temperatureRange": "-50°C to 300°C"}'::jsonb,
  'subsea',
  'builtin'
)
on conflict do nothing;

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger update_documents_updated_at before update on documents
  for each row execute function update_updated_at_column();

create trigger update_materials_updated_at before update on materials
  for each row execute function update_updated_at_column();

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
create index if not exists documents_user_id_idx on documents(user_id);
create index if not exists documents_status_idx on documents(status);
create index if not exists document_chunks_user_id_idx on document_chunks(user_id);
create index if not exists document_chunks_document_id_idx on document_chunks(document_id);
create index if not exists materials_user_id_idx on materials(user_id);
create index if not exists analysis_results_user_id_idx on analysis_results(user_id);

-- ============================================
-- STORAGE BUCKET FOR FILE UPLOADS
-- ============================================
insert into storage.buckets (id, name, public) 
values ('documents', 'documents', false)
on conflict do nothing;

-- Storage policies
create policy "Users can upload their own documents"
  on storage.objects for insert
  with check (
    bucket_id = 'documents' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can view their own documents"
  on storage.objects for select
  using (
    bucket_id = 'documents' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own documents"
  on storage.objects for delete
  using (
    bucket_id = 'documents' and
    auth.uid()::text = (storage.foldername(name))[1]
  );
