import React from "react";
import { GroupFieldProps } from "@/types";
import { Accordion } from "@/components/Accordion";
import { RadioField } from "@/components/Field/RadioField";

export const RadioGroupField: React.FC<GroupFieldProps<string>> = ({
  options,
  name,
  onChange,
}) => {
  return (
    <Accordion title={name} isOpen>
      <fieldset className="flex flex-col gap-4 p-4">
        <span className="text-sm font-semibold">Select 1 option.</span>
        {options.map(({ id, name, description }) => (
          <RadioField
            key={id}
            value={id.toString()}
            label={name}
            description={description}
            name="radio"
            onChange={(value) => onChange(value)}
          />
        ))}
      </fieldset>
    </Accordion>
  );
};
