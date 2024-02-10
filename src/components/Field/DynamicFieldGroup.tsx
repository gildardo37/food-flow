import React from "react";
import { FormikErrors, useFormikContext } from "formik";
import { clsxm } from "@/utils";
import { Accordion } from "@/components/Accordion";
import { FormError } from "@/components/Message/FormError";

interface Props {
  children: React.ReactNode;
  name: string;
  fieldName: string;
  message?: string;
  required?: boolean;
}

export const DynamicFieldGroup: React.FC<Props> = ({
  children,
  fieldName,
  name,
  message,
  required,
}) => {
  const form = useFormikContext();
  const errors: FormikErrors<Record<string, string>> = form.errors;
  const { touched } = form.getFieldMeta(fieldName);
  const hasErrors = Boolean(errors[fieldName] && touched);

  return (
    <Accordion
      title={
        <p title={required ? "This field is required." : undefined}>
          {name} {required ? <span className="text-red-500">*</span> : null}
        </p>
      }
      isOpen
      className={clsxm({ "accordion-error border-red-400": hasErrors })}
    >
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
