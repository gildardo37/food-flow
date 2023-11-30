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

export interface Product {
  id: string;
  created_at: Date;
  name: string;
  description: string;
  image: string;
  price: number;
  category_fk: number;
  categories: Category;
}

export interface Category {
  id: number;
  created_at: Date;
  name: string;
}

export type ProductCardData = Omit<
  Product,
  "id" | "created_at" | "category_fk" | "categories"
>;
