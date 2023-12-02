import React from "react";
import { clsxm } from "@/utils/clsxm";
import { Counter } from "@/components/Counter";

interface Props {
  label: string;
  onChange: (data: number) => void;
  className?: string;
  maxAmount?: number;
  description?: string;
}

export const CounterField: React.FC<Props> = ({
  label,
  onChange,
  className = "",
  maxAmount,
  description,
}) => {
  return (
    <div
      className={clsxm("flex items-center justify-between gap-4", className)}
    >
      <div className="grow">
        <p className="font-semibold">{label}</p>
        {description ? (
          <p className="text-xs text-gray-400">{description}</p>
        ) : null}
      </div>
      <Counter
        onChange={(value) => onChange(value)}
        minimize
        maxAmount={maxAmount}
        small
      />
    </div>
  );
};