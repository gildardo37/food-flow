import React, { useState } from "react";
import { StepOptions } from "@/types";

interface Props {
  steps: string[];
}

export const useStepper = ({ steps }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const isDisabled = (id: number) => Boolean(!completed[id]);

  const [stepOptions, setStepOptions] = useState<StepOptions[]>(
    steps.map((label, index) => ({
      label: label,
      isDisabled: index === 0 ? false : isDisabled(index),
    }))
  );

  const totalSteps = steps.length;
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === totalSteps - 1;
  const completedSteps = Object.keys(completed).length;
  const allStepsCompleted = completedSteps === totalSteps;

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleNextStep = () => {
    const newActiveStep =
      isLastStep && !allStepsCompleted
        ? steps.findIndex((_, i) => !(i in completed))
        : activeStep + 1;
    setStepOptions((prev) => {
      const newData = [...prev];
      newData[activeStep + 1].isDisabled = false;
      return newData;
    });
    setActiveStep(newActiveStep);
  };

  const setStepCompleted = () => {
    setCompleted((prev) => {
      const newData = { ...prev };
      newData[activeStep] = true;
      return newData;
    });
  };

  const handleNext = () => {
    setStepCompleted();
    handleNextStep();
  };

  return {
    isFirstStep,
    isLastStep,
    handleBack,
    handleFinish: setStepCompleted,
    handleNext,
    activeStep,
    setActiveStep,
    stepOptions,
  };
};
