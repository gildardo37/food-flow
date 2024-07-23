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

export interface Order {
  id: string;
  createdAt: Date;
  status: boolean;
  notes: string;
  total: number;
  user: User;
  table: Table;
}

export interface OrderProducts {
  id: string;
  created_at: Date;
  product_fk: string;
  order_fk: number;
  notes: string;
  quantity: number;
  sub_total: number;
}

export interface User {
  id: string;
  createdAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  roleFk: number;
}

export type AddOrderProducts = Omit<OrderProducts, "id" | "created_at">;

export type ProductPrices = Pick<Product, "id" | "price">[];
