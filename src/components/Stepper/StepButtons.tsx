import React from "react";
import { Button } from "../Button";
import { useAtom } from "jotai";
import { orderAtom } from "@/atoms/order";
import { useRouter } from "next/router";
import { ordersPage } from "@/utils/consts";

interface Props {
  isFirstStep: boolean;
  isLastStep: boolean;
  isNextDisabled: boolean;
  isLastDisabled: boolean;
  onBackStep: () => void;
  onNextStep: () => void;
  onFinalStep: () => void;
}

export const StepButtons: React.FC<Props> = ({
  isFirstStep,
  isLastStep,
  isNextDisabled,
  isLastDisabled,
  onBackStep,
  onNextStep,
  onFinalStep,
}) => {
  const router = useRouter();
  const [, setOrder] = useAtom(orderAtom);

  const cancel = () => {
    setOrder({});
    router.replace(ordersPage);
  };

  return (
    <div className="grid grid-cols-2">
      <div className="col-start-1 flex gap-4 place-self-start">
        {!isFirstStep ? (
          <Button onClick={onBackStep} className="w-24">
            Back
          </Button>
        ) : null}
        <Button onClick={cancel} className="w-24">
          Cancel
        </Button>
      </div>
      <Button
        onClick={isLastStep ? onFinalStep : onNextStep}
        className="col-start-2 w-24 place-self-end"
        disabled={isLastStep ? isLastDisabled : isNextDisabled}
        isLoading={isLastDisabled}
      >
        {isLastStep ? "Finish" : "Next"}
      </Button>
    </div>
  );
};
