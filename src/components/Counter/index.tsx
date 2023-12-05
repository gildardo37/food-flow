import React, { useState } from "react";
import { clsxm } from "@/utils";
import { Button } from "@/components/Button";
import { debounce } from "@/utils";

interface Props {
  onChange?: (value: number) => void;
  minAmount?: number;
  maxAmount?: number;
  minimize?: boolean;
  small?: boolean;
  initialValue?: number;
}

export const Counter: React.FC<Props> = ({
  onChange = () => undefined,
  minAmount = 0,
  maxAmount = 50,
  minimize = false,
  small = false,
  initialValue = 0,
}) => {
  const [counter, setCounter] = useState(initialValue);
  const isDecrementDisabled = counter <= minAmount;
  const isIncrementDisabled = counter >= maxAmount;
  const hide = counter === 0 && minimize;

  const debouncedOnChange = debounce((value: number) => {
    console.log(value);
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
        hide ? "w-fit" : "min-w-[120px]"
      )}
    >
      {!hide ? (
        <>
          <Button
            className="w-10"
            onClick={decrement}
            disabled={isDecrementDisabled}
            type="button"
            rounded
            small={small}
          >
            -
          </Button>
          <span className="grow text-center font-semibold">{counter}</span>
        </>
      ) : null}
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
