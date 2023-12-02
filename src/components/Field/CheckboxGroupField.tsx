import React from "react";
import { OptionsData } from "@/types";
import { Accordion } from "@/components/Accordion";
import { CheckboxField } from "@/components/Field/CheckboxField";

interface Props {
  data: OptionsData[];
}

export const CheckboxGroupField: React.FC<Props> = ({ data }) => {
  return (
    <Accordion title="Input checkbox" isOpen>
      <fieldset className="flex flex-col gap-4 p-4">
        <span className="text-sm font-semibold">Select 1 or more options.</span>
        {data.map(({ id, name, description }) => (
          <CheckboxField
            key={id}
            value={id.toString()}
            label={name}
            description={description}
            name="checkbox"
            onChange={({ checked, value }) => console.log({ value, checked })}
          />
        ))}
      </fieldset>
    </Accordion>
  );
};
