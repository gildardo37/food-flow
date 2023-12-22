import React from "react";
import { DynamicField } from "@/types";
import { RadioGroupField } from "@/components/Field/RadioGroupField";
import { CheckboxGroupField } from "@/components/Field/CheckboxGroupField";
import { CounterGroupField } from "@/components/Field/CounterGroupField";
import { TextGroupField } from "@/components/Field/TextGroupField";

type DataProps = Omit<DynamicField, "id">;

interface Props {
  index: number;
  data: DataProps;
}

export const DynamicFields: React.FC<Props> = ({
  data: { name, options = [], type, required },
  index,
}) => {
  const props = { name, options: options, required, index };

  return type === "radio" ? (
    <RadioGroupField {...props} />
  ) : type === "checkbox" ? (
    <CheckboxGroupField {...props} />
  ) : type === "counter" ? (
    <CounterGroupField {...props} />
  ) : (
    <TextGroupField {...props} />
  );
};
