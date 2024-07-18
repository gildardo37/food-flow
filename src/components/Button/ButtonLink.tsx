import React from "react";
import Link from "next/link";
import { clsxm } from "@/utils";

interface Props {
  href: string;
  children: React.ReactNode;
  type?: "primary" | "secondary";
}

export const ButtonLink: React.FC<Props> = ({
  href,
  children,
  type = "secondary",
}) => {
  return (
    <Link
      href={href}
      className={clsxm(
        "flex h-[42px] items-center justify-center gap-1 rounded-xl border border-black px-4 py-2 text-sm uppercase",
        type === "primary" ? "bg-black text-white" : "text-black"
      )}
    >
      {children}
    </Link>
  );
};
