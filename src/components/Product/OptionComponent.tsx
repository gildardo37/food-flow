import { FieldOptionType, OptionsData } from "@/types";
import React from "react";
import { RadioGroupField } from "@/components/Field/RadioGroupField";
import { CheckboxGroupField } from "@/components/Field/CheckboxGroupField";
import { CounterGroupField } from "@/components/Field/CounterGroupField";

interface Props {
  data: OptionsData[];
  type: FieldOptionType;
}

export const OptionComponent: React.FC<Props> = ({ data, type }) => {
  const components: Record<FieldOptionType, React.ReactNode> = {
    radio: <RadioGroupField data={data} />,
    checkbox: <CheckboxGroupField data={data} />,
    counter: <CounterGroupField data={data} />,
  };

  return components[type] ?? components.radio;
};
