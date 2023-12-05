import React, { useState } from "react";
import {
  CounterResponse,
  GroupFieldProps,
  MultipleCounterResponse,
} from "@/types";
import { Accordion } from "@/components/Accordion";
import { CounterField } from "@/components/Field/CounterField";

export const CounterGroupField: React.FC<
  GroupFieldProps<CounterResponse[]>
> = ({ options, name, onChange, required }) => {
  const [, setForm] = useState<MultipleCounterResponse>([]);

  const handleChange = (data: CounterResponse) => {
    setForm((prev) => updateData(prev, data));
  };

  const updateData = (prev: MultipleCounterResponse, data: CounterResponse) => {
    const { quantity, value } = data;
    const newData = [...prev].map((item) =>
      item.value === value ? { ...item, quantity } : item
    );
    const exists = newData.some((item) => item.value === value);

    if (!exists) newData.push(data);

    const response = newData.filter(({ quantity }) => quantity !== 0);
    onChange(response);
    return response;
  };

  return (
    <Accordion title={name} isOpen>
      <fieldset className="flex flex-col gap-4 p-4">
        {options.map(({ id, name, description }) => (
          <CounterField
            key={id}
            label={name}
            description={description}
            onChange={(quantity) =>
              handleChange({ quantity, value: id.toString() })
            }
            maxAmount={20}
            required={required}
          />
        ))}
      </fieldset>
    </Accordion>
  );
};
