import React from "react";
import { CheckboxData } from "@/types";
import { clsxm } from "@/utils/clsxm";
import { Checkbox } from "@/components/Field/Checkbox";

interface Props {
  label: string;
  value: string;
  name: string;
  onChange: (data: CheckboxData) => void;
  className?: string;
  description?: string;
}

export const CheckboxField: React.FC<Props> = ({
  label,
  name,
  description,
  onChange,
  className = "",
  value,
}) => {
  const id = `${name}_${value}`;
  return (
    <label
      htmlFor={id}
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
      <Checkbox
        name={name}
        id={id}
        required
        onChange={({ target: { checked, value } }) =>
          onChange({ checked, value })
        }
        value={value}
      />
    </label>
  );
};
