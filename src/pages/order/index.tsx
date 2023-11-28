import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Button } from "@/components/Button";
import { Stepper } from "@/components/Stepper";
import { SelectTable } from "@/components/Steps/SelectTable";
import { SelectOrder } from "@/components/Steps/SelectOrder";
import { useStepper } from "@/hooks/useStepper";
import { StepButtons } from "@/components/Stepper/StepButtons";
import { useAtom } from "jotai";
import { orderAtom } from "@/atoms/order";

const Order: NextPage = () => {
  const {
    activeStep,
    isFirstStep,
    isLastStep,
    handleBack,
    handleNext,
    handleFinish,
    stepOptions,
    setActiveStep,
  } = useStepper({ steps: ["Table", "Order", "Review", "Checkout"] });
  const [isNextDisabled, setNextDisabled] = useState(true);
  const [order] = useAtom(orderAtom);

  const componentes: React.ReactNode[] = [
    <SelectTable key="0" onSubmit={() => setNextDisabled(false)} />,
    <SelectOrder key="1" />,
    <Button key="2">Checkout</Button>,
    <Button key="3">Review</Button>,
  ];

  const progressWidth: number[] = [1, 33.33, 64, 100];

  const onSubmit = () => {
    handleFinish();
  };

  const onNextStep = () => {
    handleNext();
    setNextDisabled(true);
  };

  useEffect(() => {
    if (!order.tableId || activeStep !== 0) return;
    setNextDisabled(false);
    //eslint-disable-next-line
  }, [activeStep]);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Progress</h2>
        <Stepper
          options={stepOptions}
          progress={progressWidth[activeStep]}
          activeStep={activeStep}
          onChange={(value) => setActiveStep(value)}
        />
        {componentes[activeStep]}
        <StepButtons
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isNextDisabled={isNextDisabled}
          onBackStep={handleBack}
          onNextStep={onNextStep}
          onFinalStep={onSubmit}
        />
      </div>
    </section>
  );
};

export default Order;
