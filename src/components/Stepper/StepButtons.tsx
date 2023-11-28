import React from "react";
import { Button } from "../Button";

interface Props {
  isFirstStep: boolean;
  isLastStep: boolean;
  isNextDisabled: boolean;
  onBackStep: () => void;
  onNextStep: () => void;
  onFinalStep: () => void;
}

export const StepButtons: React.FC<Props> = ({
  isFirstStep,
  isLastStep,
  isNextDisabled,
  onBackStep,
  onNextStep,
  onFinalStep,
}) => {
  return (
    <div className="grid grid-cols-2">
      {!isFirstStep ? (
        <Button
          onClick={onBackStep}
          className="col-start-1 w-24 place-self-start"
        >
          Back
        </Button>
      ) : null}
      <Button
        onClick={isLastStep ? onFinalStep : onNextStep}
        className="col-start-2 w-24 place-self-end"
        disabled={isNextDisabled}
      >
        {isLastStep ? "Finish" : "Next"}
      </Button>
    </div>
  );
};
