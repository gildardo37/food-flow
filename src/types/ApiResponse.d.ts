import { PostgrestSingleResponse } from "@supabase/supabase-js";

type SupabaseRequest<T> = Promise<PostgrestSingleResponse<T>>;

export interface Login {
  email: string;
  password: string;
}

export interface Table {
  id: number;
  created_at: Date;
  name: string;
  capacity: number;
}
