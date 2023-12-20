import React from "react";
import { Field, useFormikContext } from "formik";
import { clsxm } from "@/utils";

interface Props {
  name: string;
  value: string;
  className?: string;
}

export const InputRadio: React.FC<Props> = ({ className, name, value }) => {
  const { getFieldProps } = useFormikContext();
  const fieldValue: string = getFieldProps(name).value;
  const checked = fieldValue === value;

  return (
    <Field
      type="radio"
      className={clsxm(
        "relative aspect-square h-4 w-4 cursor-pointer appearance-none rounded-full border border-black checked:after:absolute checked:after:inset-1/2 checked:after:aspect-square checked:after:w-[10px] checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:rounded-full checked:after:bg-black checked:after:content-['']",
        className
      )}
      name={name}
      value={value}
      checked={checked}
    />
  );
};
