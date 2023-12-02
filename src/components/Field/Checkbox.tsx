import React, { InputHTMLAttributes } from "react";
import { clsxm } from "@/utils/clsxm";

export const Checkbox: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      type="checkbox"
      className={clsxm(
        "relative aspect-square h-4 w-4 cursor-pointer appearance-none rounded-full border border-black checked:after:absolute checked:after:inset-1/2 checked:after:aspect-square checked:after:w-[10px] checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:rounded-full checked:after:bg-black checked:after:content-['']",
        className
      )}
      {...props}
    />
  );
};
