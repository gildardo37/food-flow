import React, { useId } from "react";
import { InputRadio } from "@/components/Field/InputRadio";
import { clsxm } from "@/utils";

interface Props {
  label: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
  description?: string;
  className?: string;
  required?: boolean;
}

export const RadioField: React.FC<Props> = ({
  value,
  label,
  name,
  description,
  onChange,
  className = "",
  required = false,
}) => {
  const id = name + useId() + value;
  return (
    <label
      htmlFor={id}
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
      <InputRadio
        name={name}
        id={id}
        required={required}
        onChange={() => onChange(value)}
      />
    </label>
  );
};
