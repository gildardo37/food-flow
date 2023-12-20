import React from "react";
import { clsxm } from "@/utils";
import { Checkbox } from "@/components/Field/Checkbox";

interface Props {
  label: string;
  value: string | number;
  name: string;
  className?: string;
  description?: string;
}

export const CheckboxField: React.FC<Props> = ({
  label,
  name,
  value,
  description,
  className = "",
}) => {
  return (
    <label
      className={clsxm(
        "justify-between-4 flex cursor-pointer items-center gap-4",
        className
      )}
    >
      <div className="grow">
        <p className="font-semibold">{label}</p>
        {description ? (
          <p className="text-xs text-gray-400">{description}</p>
        ) : null}
      </div>
      <Checkbox name={name} value={value.toString()} />
    </label>
  );
};
