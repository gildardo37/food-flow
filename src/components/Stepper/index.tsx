import React from "react";
import { StepOptions } from "@/types";
import { Step } from "@/components/Stepper/Step";
import { ProgressBar } from "@/components/ProgressBar";

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
  return (
    <div className="flex flex-col gap-2 p-2">
      <ProgressBar progress={progress} />
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
