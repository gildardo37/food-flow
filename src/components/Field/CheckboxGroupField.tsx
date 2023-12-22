import React from "react";
import { GroupFieldProps } from "@/types";
import { getFieldName } from "@/utils";
import { CheckboxField } from "@/components/Field/CheckboxField";
import { DynamicFieldGroup } from "@/components/Field/DynamicFieldGroup";

export const CheckboxGroupField: React.FC<GroupFieldProps> = ({
  options,
  name,
  index,
  required,
}) => {
  const fieldName = getFieldName(index);

  return (
    <DynamicFieldGroup
      name={name}
      message="Select 1 or more options."
      fieldName={fieldName}
      required={required}
    >
      {options.map(({ id, name, description }) => (
        <CheckboxField
          key={id}
          value={id}
          label={name}
          description={description}
          name={fieldName}
        />
      ))}
    </DynamicFieldGroup>
  );
};
