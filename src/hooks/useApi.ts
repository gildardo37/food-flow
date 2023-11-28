import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getTables,
  setUserSession,
  signIn,
  signOut,
  signUp,
} from "@/services/api";

const tablesKey = "tables";
const productsKey = "products";

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
