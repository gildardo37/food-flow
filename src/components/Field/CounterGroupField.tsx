import React from "react";
import { OptionsData } from "@/types";
import { Accordion } from "@/components/Accordion";
import { CounterField } from "@/components/Field/CounterField";

interface Props {
  data: OptionsData[];
}

export const CounterGroupField: React.FC<Props> = ({ data }) => {
  return (
    <Accordion title="Input counter" isOpen>
      <fieldset className="flex flex-col gap-4 p-4">
        {data.map(({ id, name, description }) => (
          <CounterField
            key={id}
            label={name}
            description={description}
            onChange={(e) => console.log(e)}
            maxAmount={2}
          />
        ))}
      </fieldset>
    </Accordion>
  );
};
