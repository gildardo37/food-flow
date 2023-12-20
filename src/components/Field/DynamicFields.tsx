import React from "react";
import { Field } from "formik";
import { DynamicField } from "@/types";
import { getFieldName } from "@/utils";
import { RadioGroupField } from "@/components/Field/RadioGroupField";
import { CheckboxGroupField } from "@/components/Field/CheckboxGroupField";
import { CounterGroupField } from "@/components/Field/CounterGroupField";

type DataProps = Omit<DynamicField, "id">;

interface Props {
  index: number;
  data: DataProps;
}

export const DynamicFields: React.FC<Props> = ({
  data: { name, options, type, required },
  index,
}) => {
  const fieldName = getFieldName(index);
  const props = { name, options, required, index };

  return type === "radio" ? (
    <RadioGroupField {...props} />
  ) : type === "checkbox" ? (
    <CheckboxGroupField {...props} />
  ) : type === "counter" ? (
    <CounterGroupField {...props} />
  ) : (
    <Field type="text" name={fieldName} required />
  );
};
