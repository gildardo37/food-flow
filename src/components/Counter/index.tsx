import React, { useEffect, useId, useState } from "react";
import { clsxm } from "@/utils";
import { Button } from "@/components/Button";
import { debounce } from "@/utils";

interface Props {
  id?: string;
  onChange?: (value: number) => void;
  minAmount?: number;
  maxAmount?: number;
  minimize?: boolean;
  small?: boolean;
  initialValue?: number;
  required?: boolean;
}

export const Counter: React.FC<Props> = ({
  id,
  onChange = () => undefined,
  minAmount = 0,
  maxAmount = 50,
  minimize = false,
  small = false,
  initialValue = 0,
  required = false,
}) => {
  const [counter, setCounter] = useState(required ? 1 : initialValue);
  const idValue = useId();
  const defaultId = id ?? idValue;

  const isDecrementDisabled = counter <= (required ? 1 : minAmount);
  const isIncrementDisabled = counter >= maxAmount;
  const hide = counter === 0 && minimize;

  useEffect(() => {
    if (required) {
      setTimeout(() => onChange(1), 1000);
    }
    //eslint-disable-next-line
  }, []);

  const debouncedOnChange = debounce((value: number) => {
    onChange(value);
  }, 300);

  const increment = () => {
    if (isIncrementDisabled) return;
    setCounter((prev) => handleChange(prev + 1));
  };

  const decrement = () => {
    if (isDecrementDisabled) return;
    setCounter((prev) => handleChange(prev - 1));
  };

  const handleChange = (value: number) => {
    debouncedOnChange(value);
    return value;
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
        onClick={decrement}
        disabled={isDecrementDisabled}
        type="button"
        rounded
        small={small}
      >
        -
      </Button>
      <input
        type="text"
        className={clsxm(
          "pointer-events-none w-full text-center font-semibold outline-none",
          hide && "hidden"
        )}
        value={counter}
        onChange={() => undefined}
        required={required}
        name={defaultId}
        id={defaultId}
        pattern="[1-9]\d*"
        readOnly
      />
      <Button
        className="w-10 text-2xl"
        onClick={increment}
        disabled={isIncrementDisabled}
        type="button"
        rounded
        small={small}
      >
        +
      </Button>
    </div>
  );
};
