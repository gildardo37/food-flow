import { clsxm } from "@/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<Props> = ({
  onClick = () => undefined,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsxm("w-full rounded-md bg-slate-100 p-4", className)}
    >
      {children}
    </button>
  );
};
