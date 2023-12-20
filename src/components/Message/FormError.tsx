import React from "react";
import { FormikErrors, useFormikContext } from "formik";

interface Props {
  name: string;
}

export const FormError: React.FC<Props> = ({ name }) => {
  const form = useFormikContext();
  const errors: FormikErrors<Record<string, string>> = form.errors;
  const { touched } = form.getFieldMeta(name);

  return touched && errors[name] ? (
    <div key={name} className="text-sm text-red-500">
      {errors[name]}
    </div>
  ) : null;
};
