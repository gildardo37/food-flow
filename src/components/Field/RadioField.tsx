import React from "react";
import { InputRadio } from "@/components/Field/InputRadio";
import { clsxm } from "@/utils";

interface Props {
  label: string;
  value: string | number;
  name: string;
  description?: string;
  className?: string;
}

export const RadioField: React.FC<Props> = ({
  value,
  label,
  name,
  description,
  className = "",
}) => {
  return (
    <label
      className={clsxm(
        "flex cursor-pointer items-center justify-between gap-4",
        className
      )}
    >
      <div className="grow">
        <p className="font-semibold">{label}</p>
        {description ? (
          <p className="text-xs text-gray-400">{description}</p>
        ) : null}
      </div>
      <InputRadio name={name} value={value.toString()} />
    </label>
  );
};
