import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllProductOptions,
  getProductOptions,
  getProducts,
  getTables,
  setUserSession,
  signIn,
  signOut,
  signUp,
} from "@/services/api";

const tablesKey = "tables";
const productsKey = "products";
const allProductOptionsKey = "productsOptions";
const productOptionsKey = (id: string) => `productOptions_${id}`;

export const useLogin = () => useMutation({ mutationFn: signIn });

export const useLogout = () => useMutation({ mutationFn: signOut });

export const useSignUp = () => useMutation({ mutationFn: signUp });

export const useSetSession = () => {
  return useMutation({ mutationFn: setUserSession });
};

export const useGetTables = () => {
  return useQuery({ queryKey: [tablesKey], queryFn: getTables });
};

export const useGetProducts = () => {
  return useQuery({ queryKey: [productsKey], queryFn: getProducts });
};

export const useGetAllProductOptions = () => {
  return useQuery({
    queryKey: [allProductOptionsKey],
    queryFn: getAllProductOptions,
  });
};

export const useGetProductOptions = (productId: string) => {
  return useQuery({
    queryKey: [productOptionsKey(productId)],
    queryFn: () => getProductOptions(productId),
  });
};
