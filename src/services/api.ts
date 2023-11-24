import { Login } from "@/types";
import { supabase } from "./database";
import { PostgrestSingleResponse, Session } from "@supabase/supabase-js";

type SupabaseRequest<T> = Promise<PostgrestSingleResponse<T>>;

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
