import React from "react";
import { Accordion } from "@/components/Accordion";
import { FormError } from "@/components/Message/FormError";

interface Props {
  children: React.ReactNode;
  name: string;
  fieldName: string;
  message?: string;
}

export const DynamicFieldGroup: React.FC<Props> = ({
  children,
  fieldName,
  name,
  message,
}) => {
  return (
    <Accordion title={name} isOpen>
      <fieldset className="flex flex-col gap-4 p-4">
        {message ? (
          <span className="text-sm font-semibold">{message}</span>
        ) : null}
        {children}
        <FormError name={fieldName} />
      </fieldset>
    </Accordion>
  );
};
