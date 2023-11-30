import React, { useState } from "react";
import { Button } from "@/components/Button";

interface Props {
  onChange?: (value: number) => void;
  minAmount?: number;
  maxAmount?: number;
}

export const Counter: React.FC<Props> = ({
  onChange = () => undefined,
  minAmount = 0,
  maxAmount = 50,
}) => {
  const [counter, setCounter] = useState(0);
  const isDecrementDisabled = counter <= minAmount;
  const isIncrementDisabled = counter >= maxAmount;

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
    <div className="flex h-fit items-center">
      <Button
        className="w-10"
        onClick={decrement}
        disabled={isDecrementDisabled}
      >
        -
      </Button>
      <span className="grow text-center font-semibold">{counter}</span>
      <Button
        className="w-10 text-2xl"
        onClick={increment}
        disabled={isIncrementDisabled}
      >
        +
      </Button>
    </div>
  );
};
