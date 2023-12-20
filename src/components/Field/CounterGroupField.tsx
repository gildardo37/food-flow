import React from "react";
import { GroupFieldProps } from "@/types";
import { getFieldName } from "@/utils";
import { CounterField } from "@/components/Field/CounterField";
import { FormError } from "@/components/Message/FormError";
import { DynamicFieldGroup } from "@/components/Field/DynamicFieldGroup";

export const CounterGroupField: React.FC<GroupFieldProps> = ({
  options,
  name,
  index,
  required,
}) => {
  const fieldName = getFieldName(index);

  return (
    <DynamicFieldGroup name={name} fieldName={fieldName}>
      {options.map(({ id, name, description, required: isRequired }, idx) => (
        <React.Fragment key={id}>
          <CounterField
            key={id}
            label={name}
            required={required || isRequired}
            description={description}
            name={getFieldName(index, idx)}
          />
          <FormError name={getFieldName(index, idx)} />
        </React.Fragment>
      ))}
    </DynamicFieldGroup>
  );
};
