import React from "react";
import { clsxm } from "@/utils";
import { Counter } from "@/components/Field/Counter";

interface Props {
  name: string;
  label: string;
  className?: string;
  description?: string;
  required?: boolean;
}

export const CounterField: React.FC<Props> = ({
  name,
  label,
  className = "",
  description,
  required = false,
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
      <Counter minimize small required={required} name={name} />
    </div>
  );
};
