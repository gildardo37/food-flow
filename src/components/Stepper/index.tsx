import React from "react";
import { StepOptions } from "@/types";
import { Step } from "./Step";

interface Props {
  options: StepOptions[];
  activeStep: number;
  progress: number;
  onChange: (step: number) => void;
}

export const Stepper: React.FC<Props> = ({
  options,
  progress,
  activeStep,
  onChange,
}) => {
  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="rounded-full bg-slate-200">
        <div
          className="progress-bar h-2 w-1/2 rounded-full bg-black"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex w-full justify-between">
        {options.map(({ label, isDisabled }, index) => (
          <Step
            key={index}
            activeStep={activeStep}
            index={index}
            label={label}
            onChange={() => onChange(index)}
            disabled={isDisabled}
          />
        ))}
      </div>
    </div>
  );
};
