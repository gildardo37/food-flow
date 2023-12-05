import { clsxm } from "@/utils";
import React from "react";

interface Props {
  onChange: () => void;
  activeStep: number;
  index: number;
  label: string;
  disabled: boolean;
}
export const Step: React.FC<Props> = ({
  activeStep,
  index,
  label,
  disabled,
  onChange,
}) => {
  return (
    <button
      className={clsxm(
        "select-none rounded-md px-4 py-2 font-semibold hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40",
        { "bg-slate-100": index === activeStep }
      )}
      onClick={onChange}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
