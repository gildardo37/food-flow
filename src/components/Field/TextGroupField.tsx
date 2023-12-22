import React from "react";
import { Field } from "formik";
import { GroupFieldProps } from "@/types";
import { getFieldName } from "@/utils";
import { DynamicFieldGroup } from "@/components/Field/DynamicFieldGroup";

export const TextGroupField: React.FC<GroupFieldProps> = ({
  name,
  index,
  required,
}) => {
  const fieldName = getFieldName(index);

  return (
    <DynamicFieldGroup name={name} fieldName={fieldName} required={required}>
      <Field
        type="text"
        name={fieldName}
        required={required}
        className="focus: h-10 rounded-md border px-2 py-1 text-sm outline-none transition-all focus:border-blue-300"
      />
    </DynamicFieldGroup>
  );
};
