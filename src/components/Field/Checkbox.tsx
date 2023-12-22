import React from "react";
import { Field, useFormikContext } from "formik";
import { clsxm } from "@/utils";
import { CheckboxResponse } from "@/types";

interface Props {
  name: string;
  value: string;
  className?: string;
}

export const Checkbox: React.FC<Props> = ({ className, name, value }) => {
  const { getFieldProps } = useFormikContext();
  const values: CheckboxResponse = getFieldProps(name).value;
  const checked = values.includes(value);

  return (
    <Field
      type="checkbox"
      className={clsxm(
        "h-4 w-4 cursor-pointer border-black checked:accent-black",
        className
      )}
      name={name}
      value={value}
      checked={checked}
    />
  );
};
