// Supabase removed — empty type stub kept for import compatibility.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = Record<string, unknown>;
