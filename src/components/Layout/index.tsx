import React from "react";
import { Header } from "@/components/Header";

interface Props {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100dvh-56px)] w-full bg-white p-4 md:p-8">
        <div className="mx-auto max-w-lg md:max-w-7xl">{children}</div>
      </main>
    </>
  );
};
