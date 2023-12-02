import React from "react";
import { OptionsData } from "@/types";
import { Accordion } from "@/components/Accordion";
import { RadioField } from "@/components/Field/RadioField";

interface Props {
  data: OptionsData[];
}

export const RadioGroupField: React.FC<Props> = ({ data }) => {
  return (
    <Accordion title="Input radio" isOpen>
      <fieldset className="flex flex-col gap-4 p-4">
        <span className="text-sm font-semibold">Select 1 option.</span>
        {data.map(({ id, name, description }) => (
          <RadioField
            key={id}
            value={id.toString()}
            label={name}
            description={description}
            name="radio"
            onChange={(value) => console.log(value)}
          />
        ))}
      </fieldset>
    </Accordion>
  );
};
