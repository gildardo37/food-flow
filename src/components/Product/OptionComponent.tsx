import { FieldOptionData, FieldOptionType, OptionsData } from "@/types";
import React from "react";
import { RadioGroupField } from "@/components/Field/RadioGroupField";
import { CheckboxGroupField } from "@/components/Field/CheckboxGroupField";
import { CounterGroupField } from "@/components/Field/CounterGroupField";

interface Props {
  data: OptionsData[];
  type: FieldOptionType;
  name: string;
  onChange: (value: FieldOptionData) => void;
}

export const OptionComponent: React.FC<Props> = ({
  data,
  name,
  type,
  onChange,
}) => {
  const handleChange = (value: FieldOptionData) => onChange(value);

  const props = { options: data, onChange: handleChange, name };

  const components: Record<FieldOptionType, React.ReactNode> = {
    radio: <RadioGroupField {...props} />,
    checkbox: <CheckboxGroupField {...props} />,
    counter: <CounterGroupField {...props} />,
  };

  return components[type] ?? components.radio;
};
