import {
  AddOrderProducts,
  DynamicField,
  Login,
  Order,
  OrderDetails,
  Product,
  ProductPrices,
  SupabaseRequest,
  Table,
} from "@/types";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/services/database";
import { productOptions } from "@/services/mockData";

export const wait = (ms: number) => new Promise((fn) => setTimeout(fn, ms));

export const handleRequest = <T>(fn: () => void) => {
  return fn() as unknown as SupabaseRequest<T>;
};

export const validateSession = async () => {
  await wait(1000);
  return await supabase.auth.getSession();
};

export const signIn = async ({ email, password }: Login) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => await supabase.auth.signOut();

export const signUp = async ({ email, password }: Login) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const setUserSession = async ({
  access_token,
  refresh_token,
}: Session) => {
  await wait(2000);
  return await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
};

export const getTables = async () => {
  return supabase
    .from("tables")
    .select("*")
    .order("id", { ascending: true })
    .returns<Table[]>();
};

export const getProducts = async () => {
  return supabase
    .from("products")
    .select("*, categories(*)")
    .order("id", { ascending: true })
    .returns<Product[]>();
};

export const getProductPrices = async () => {
  return supabase.from("products").select("id, price").returns<ProductPrices>();
};

export const getProductOptions = async (productId: string) => {
  console.log(productId);
  return handleRequest<DynamicField[]>(() => ({
    data: productOptions,
    error: null,
  }));
};

export const getAllProductOptions = async () => {
  return handleRequest<DynamicField[]>(() => ({
    data: productOptions,
    error: null,
  }));
};

export const getOrders = async () => {
  return supabase
    .from("orders")
    .select("*")
    .eq("status", true)
    .returns<Order[]>();
};

export const getOrderById = async (orderId: string) => {
  return handleRequest<Order>(() =>
    supabase.from("orders").select("*").eq("id", orderId).limit(1).single()
  );
};

export const postOrder = async ({ tableId, products }: OrderDetails) => {
  try {
    if (!products) {
      throw new Error("No products added.");
    }
    const { data } = await supabase.auth.getSession();
    const productList = await getProductPrices();

    if (productList.error) {
      throw productList.error;
    }

    const getProductPrice = (productId: string) => {
      return productList.data.find(({ id }) => productId === id);
    };

    const newProducts: AddOrderProducts[] = products.map(
      ({ productId, quantity, notes }) => ({
        product_fk: productId,
        order_fk: 1,
        notes,
        quantity,
        sub_total: quantity * (getProductPrice(productId)?.price ?? 0),
      })
    );

    const total = newProducts?.reduce((acc, { sub_total }) => {
      return acc + sub_total;
    }, 0);

    const addOrder = await supabase
      .from("orders")
      .insert({
        table_fk: tableId,
        user_fk: data.session?.user.id,
        notes: null,
        total,
      })
      .select();

    if (addOrder.error) {
      throw addOrder.error;
    }

    const orderId = addOrder.data?.[0].id;

    console.log(newProducts);

    const insertProducts = newProducts.map((data) => ({
      ...data,
      order_fk: orderId,
    }));

    return await supabase.from("order_products").insert(insertProducts);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
