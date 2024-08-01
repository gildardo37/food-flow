import { PostgrestSingleResponse } from "@supabase/supabase-js";

type SupabaseRequest<T> = Promise<PostgrestSingleResponse<T>>;

export interface Login {
  email: string;
  password: string;
}

export interface Table {
  id: number;
  createdAt: Date;
  name: string;
  capacity: number;
}

export interface Product {
  id: string;
  createdAt: Date;
  name: string;
  description: string;
  image: string;
  price: number;
  categoryFk: number;
  categories: Category;
}

export interface Category {
  id: number;
  createdAt: Date;
  name: string;
}

export type ProductCardData = Omit<
  Product,
  "id" | "createdAt" | "categoryFk" | "categories"
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
  createdAt: Date;
  productFk: string;
  orderFk: number;
  notes: string;
  quantity: number;
  subTotal: number;
}

export interface User {
  id: string;
  createdAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  roleFk: number;
}

export type ProductPrices = Pick<Product, "id" | "price">[];
