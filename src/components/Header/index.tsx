// components/FixedHeader.tsx
import { clsxm } from "@/utils/clsxm";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header
      className={clsxm(
        "sticky z-20 w-full bg-black p-4 text-white transition-all duration-300"
      )}
    >
      <h1>Food Flow</h1>
    </header>
  );
};
