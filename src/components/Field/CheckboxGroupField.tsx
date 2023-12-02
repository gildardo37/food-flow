import React, { useState } from "react";
import { CheckboxData, CheckboxResponse, GroupFieldProps } from "@/types";
import { Accordion } from "@/components/Accordion";
import { CheckboxField } from "@/components/Field/CheckboxField";

export const CheckboxGroupField: React.FC<
  GroupFieldProps<CheckboxResponse>
> = ({ options, name, onChange }) => {
  const [, setForm] = useState<CheckboxResponse>([]);

  const handleForm = ({ value, checked }: CheckboxData) => {
    setForm((prev) => {
      let newData = [...prev];
      if (checked) {
        newData.push(value);
      } else if (prev.includes(value)) {
        newData = newData.filter((i) => i !== value);
      }
      onChange(newData);
      return newData;
    });
  };

  return (
    <Accordion title={name} isOpen>
      <fieldset className="flex flex-col gap-4 p-4">
        <span className="text-sm font-semibold">Select 1 or more options.</span>
        {options.map(({ id, name, description }) => (
          <CheckboxField
            key={id}
            value={id.toString()}
            label={name}
            description={description}
            name="checkbox"
            onChange={({ checked, value }) => handleForm({ value, checked })}
          />
        ))}
      </fieldset>
    </Accordion>
  );
};
