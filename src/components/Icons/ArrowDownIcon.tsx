import React from "react";
import { clsxm } from "@/utils";

interface Props {
  color?: string;
  rotate?: boolean;
}

export const ArrowDownIcon: React.FC<Props> = ({ color = "black", rotate }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill={color}
      className={clsxm("transition-all duration-200", {
        "rotate-180": rotate,
      })}
    >
      <path d="M480-373.539q-7.231 0-13.461-2.308-6.231-2.308-11.846-7.923L274.924-563.539q-8.308-8.307-8.5-20.884-.193-12.577 8.5-21.269 8.692-8.692 21.076-8.692t21.076 8.692L480-442.768l162.924-162.924q8.307-8.307 20.884-8.5 12.576-.192 21.268 8.5 8.693 8.692 8.693 21.077 0 12.384-8.693 21.076L505.307-383.77q-5.615 5.615-11.846 7.923-6.23 2.308-13.461 2.308Z" />
    </svg>
  );
};
