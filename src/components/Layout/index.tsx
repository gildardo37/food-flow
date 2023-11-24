import React from "react";
import { Header } from "@/components/Header";
import { Loading } from "../Loading";
import { clsxm } from "@/utils/clsxm";
import { useValidateSession } from "@/hooks/useValidateSession";

interface Props {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  const { loading, session, router } = useValidateSession();

  if (loading) {
    return (
      <main className="grid min-h-screen w-full bg-white ">
        <Loading />
      </main>
    );
  }

  return (
    <>
      {session && <Header />}
      <main
        className={clsxm(
          "grid w-full bg-white p-4 md:p-8",
          session ? "min-h-[calc(100dvh-56px)]" : "min-h-screen"
        )}
      >
        <div className="mx-auto grid w-full max-w-lg md:max-w-7xl">
          {(router.asPath === "/" && !session) ||
          (router.asPath !== "/" && session) ? (
            children
          ) : (
            <p>Please log in to access this page.</p>
          )}
        </div>
      </main>
    </>
  );
};
