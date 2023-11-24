import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getTables,
  setUserSession,
  signIn,
  signOut,
  signUp,
} from "@/services/api";

const tablesKey = "tables";

export const useLogin = () => useMutation({ mutationFn: signIn });

export const useLogout = () => useMutation({ mutationFn: signOut });

export const useSignUp = () => useMutation({ mutationFn: signUp });

export const useSetSession = () => {
  return useMutation({ mutationFn: setUserSession });
};

export const useGetTables = () => {
  return useQuery({ queryKey: [tablesKey], queryFn: getTables });
};
