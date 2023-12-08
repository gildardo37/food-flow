import React from "react";
import { clsxm } from "@/utils";
import { Loading } from "@/components/Loading";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  buttonType?: "primary" | "secondary";
  className?: string;
  isLoading?: boolean;
  rounded?: boolean;
  small?: boolean;
  fit?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  icon,
  onClick,
  type = "button",
  disabled,
  buttonType = "primary",
  className = "",
  isLoading,
  rounded = false,
  small = false,
  fit = false,
}) => {
  return (
    <button
      className={clsxm([
        "button flex h-[42px] w-full items-center justify-center gap-1 rounded-xl px-4 py-2 uppercase transition-all disabled:cursor-not-allowed disabled:opacity-70",
        className,
        {
          "bg-black text-white": buttonType === "primary",
          "border border-black text-black": buttonType === "secondary",
          "aspect-square w-[42px] rounded-full p-1": rounded,
          "h-9 w-9": small,
          "w-fit": fit,
        },
      ])}
      onClick={onClick && (!disabled || isLoading) ? onClick : undefined}
      type={type}
      disabled={disabled}
    >
      {isLoading ? (
        <Loading small />
      ) : (
        <>
          {icon ? icon : null}
          <span className="text-sm">{children}</span>
        </>
      )}
    </button>
  );
};
