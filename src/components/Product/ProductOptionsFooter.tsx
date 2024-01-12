import React from "react";
import { Button } from "@/components/Button";

interface Props {
  subtotal: number;
  onCancel: () => void;
}

export const ProductOptionsFooter: React.FC<Props> = ({
  subtotal,
  onCancel,
}) => {
  return (
    <div className="z-20 -m-6 flex items-center justify-between rounded-[0_0_8px_8px] border-t bg-white p-4">
      <p>
        <b>Subtotal:</b> ${subtotal}
      </p>
      <div className="flex gap-4">
        <Button fit type="button" buttonType="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button fit type="submit">
          submit
        </Button>
      </div>
    </div>
  );
};
