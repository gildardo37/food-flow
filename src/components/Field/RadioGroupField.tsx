import React from "react";
import { GroupFieldProps } from "@/types";
import { getFieldName } from "@/utils";
import { RadioField } from "@/components/Field/RadioField";
import { DynamicFieldGroup } from "@/components/Field/DynamicFieldGroup";

export const RadioGroupField: React.FC<GroupFieldProps> = ({
  options,
  name,
  index,
  required,
}) => {
  const fieldName = getFieldName(index);

  return (
    <DynamicFieldGroup
      name={name}
      message="Select 1 option."
      fieldName={fieldName}
      required={required}
    >
      {options.map(({ id, name, description }) => (
        <RadioField
          key={id}
          name={fieldName}
          value={id}
          label={name}
          description={description}
        />
      ))}
    </DynamicFieldGroup>
  );
};
