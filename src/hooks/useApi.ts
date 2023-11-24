import { useMutation } from "@tanstack/react-query";
import { setUserSession, signIn, signOut, signUp } from "@/services/api";

export const useLogin = () => useMutation({ mutationFn: signIn });

export const useLogout = () => useMutation({ mutationFn: signOut });

export const useSignUp = () => useMutation({ mutationFn: signUp });

export const useSetSession = () => {
  return useMutation({ mutationFn: setUserSession });
};
