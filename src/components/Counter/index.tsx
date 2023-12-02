import React, { useState } from "react";
import { clsxm } from "@/utils/clsxm";
import { Button } from "@/components/Button";

interface Props {
  onChange?: (value: number) => void;
  minAmount?: number;
  maxAmount?: number;
  minimize?: boolean;
  small?: boolean;
}

export const Counter: React.FC<Props> = ({
  onChange = () => undefined,
  minAmount = 0,
  maxAmount = 50,
  minimize = false,
  small = false,
}) => {
  const [counter, setCounter] = useState(0);
  const isDecrementDisabled = counter <= minAmount;
  const isIncrementDisabled = counter >= maxAmount;
  const hide = counter === 0 && minimize;

  const increment = () => {
    if (isIncrementDisabled) return;
    setCounter((prev) => handleChange(prev + 1));
  };

  const decrement = () => {
    if (isDecrementDisabled) return;
    setCounter((prev) => handleChange(prev - 1));
  };

  const handleChange = (value: number) => {
    onChange(value);
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
