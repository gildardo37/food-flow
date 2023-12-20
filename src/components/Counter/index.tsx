import React from "react";
import { Field, useFormikContext } from "formik";
import { clsxm } from "@/utils";
import { Button } from "@/components/Button";

interface Props {
  name: string;
  minimize?: boolean;
  small?: boolean;
  required?: boolean;
}

export const Counter: React.FC<Props> = ({
  name,
  required = false,
  minimize = false,
  small = false,
}) => {
  const { setFieldValue, getFieldProps } = useFormikContext();

  const value = getFieldProps(name).value;

  const hide = value === 0 && minimize && !required;

  const updateInput = (decrement = false) => {
    if (decrement && value <= 1) return;
    const operation = decrement ? value - 1 : value + 1;
    setFieldValue(name, operation);
  };

  return (
    <div
      className={clsxm(
        "flex h-fit select-none items-center",
        hide ? "w-fit" : "w-[120px]"
      )}
    >
      <Button
        className={clsxm("w-10", hide && "hidden")}
        onClick={() => updateInput(true)}
        type="button"
        rounded
        small={small}
      >
        -
      </Button>
      <Field
        type="number"
        className={clsxm(
          "pointer-events-none w-full text-center font-semibold outline-none",
          hide && "hidden"
        )}
        name={name}
        pattern="[1-9]\d*"
        readOnly
      />
      <Button
        className="w-10 text-2xl"
        onClick={() => updateInput()}
        type="button"
        rounded
        small={small}
      >
        +
      </Button>
    </div>
  );
};
