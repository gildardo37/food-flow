import React, { useState } from "react";
import { clsxm } from "@/utils/clsxm";
import { ArrowDownIcon } from "@/components/Icons/ArrowDownIcon";

interface Props {
  children: React.ReactNode;
  title: string;
  isOpen?: boolean;
}

export const Accordion: React.FC<Props> = ({
  title,
  children,
  isOpen = false,
}) => {
  const [open, setOpen] = useState(isOpen);
  const [isClosed, setIsClosed] = useState(!isOpen);

  const handleOpen = () => {
    if (open) {
      setTimeout(() => setIsClosed(true), 300);
    } else {
      setIsClosed(false);
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full flex-col rounded-md border transition-all">
      <div
        className="flex cursor-pointer justify-between p-3 font-semibold"
        onClick={handleOpen}
      >
        <span className="grow">{title}</span>
        <ArrowDownIcon rotate={open} />
      </div>
      <div
        className={clsxm(
          "accordion-transition overflow-hidden border-t",
          open ? "max-h-screen" : "max-h-0",
          isClosed ? "border-t-0 p-0" : "p-3"
        )}
      >
        {children}
      </div>
    </div>
  );
};
