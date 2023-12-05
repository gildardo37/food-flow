import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { sessionAtom, sessionLoadingAtom } from "@/atoms/session";
import { validateSession } from "@/services/api";
import { handleErrors } from "@/utils";
import { useAlert } from "@/hooks/useAlert";

export const useValidateSession = () => {
  const { displayAlert } = useAlert();
  const [loading, setLoading] = useAtom(sessionLoadingAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const router = useRouter();
  const redirectPage = "/order";
  const sessionPages = ["/", "/sign-up"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await validateSession();

        if (error) {
          throw error;
        } else if (data.session) {
          setSession(data.session);
          if (sessionPages.includes(router.asPath)) {
            router.replace(redirectPage);
          }
        } else {
          if (!sessionPages.includes(router.asPath)) {
            router.replace("/");
          }
        }
      } catch (error) {
        handleErrors(error, displayAlert);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, []);
  return {
    loading,
    session,
    router,
  };
};
