import {
  AddProductOptions,
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

export interface AddOrderProducts {
  product_fk: string;
  order_fk: number;
  notes: string;
  quantity: number;
  sub_total: number;
}

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
    .select(
      `id, notes, status, total, createdAt: created_at,
      table: tables(*),
      user: users(id, firstName: first_name, lastName: last_name)`
    )
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
    if (!tableId) {
      throw new Error("No table selected.");
    }

    if (!products || !products?.length) {
      throw new Error("No products added.");
    }

    const { data } = await supabase.auth.getSession();
    const productList = await getProductPrices();

    if (productList.error) {
      throw productList.error;
    }

    const newProducts = modifyProducts(products, productList.data);
    const total = getTotalPrice(newProducts);
    const addOrder = await addOrderQuery({
      tableId,
      total,
      userId: data.session?.user.id ?? "",
    });

    if (addOrder.error) {
      throw addOrder.error;
    }

    const orderId = Number(addOrder.data?.[0].id);
    const insertProducts = addOrderId(newProducts, orderId);
    return await addOrderProductsQuery(insertProducts);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const modifyProducts = (
  products: AddProductOptions[],
  productList: ProductPrices
): AddOrderProducts[] => {
  const getProductPrice = (productId: string) => {
    return productList.find(({ id }) => productId === id)?.price ?? 0;
  };

  const newProducts = products.map(({ productId, quantity, notes }) => {
    return {
      product_fk: productId,
      order_fk: 1,
      notes,
      quantity,
      sub_total: quantity * getProductPrice(productId),
    };
  });

  return newProducts;
};

const getTotalPrice = (products: AddOrderProducts[]) => {
  return products?.reduce((acc, { sub_total }) => {
    return acc + sub_total;
  }, 0);
};

const addOrderId = (
  products: AddOrderProducts[],
  orderId: number
): AddOrderProducts[] => {
  return products.map((data) => ({
    ...data,
    order_fk: orderId,
  }));
};

const addOrderQuery = async ({
  tableId,
  userId,
  total,
}: {
  tableId: number;
  userId: string;
  total: number;
}) => {
  return await supabase
    .from("orders")
    .insert({
      table_fk: tableId,
      user_fk: userId,
      notes: null,
      total,
    })
    .select()
    .returns<Order[]>();
};

const addOrderProductsQuery = async (products: AddOrderProducts[]) => {
  return await supabase.from("order_products").insert(products);
};
