import React from "react";
import { Field } from "formik";
import { clsxm } from "@/utils";

interface Props {
  label: string;
  name: string;
  className?: string;
}

export const TextField: React.FC<Props> = ({ label, name, className = "" }) => {
  return (
    <fieldset className="flex flex-col gap-2">
      {label ? (
        <label
          className={clsxm(
            "justify-between-4 flex cursor-pointer items-center gap-4",
            className
          )}
        >
          {label}
        </label>
      ) : null}
      <Field
        type="text"
        name={name}
        className="focus: h-10 rounded-md border px-2 py-1 text-sm outline-none transition-all focus:border-blue-300"
      />
    </fieldset>
  );
};
