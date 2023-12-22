import React, { useState } from "react";
import { clsxm } from "@/utils";
import { ArrowDownIcon } from "@/components/Icons/ArrowDownIcon";

interface Props {
  children: React.ReactNode;
  title: React.ReactNode | string;
  isOpen?: boolean;
  className?: string;
}

export const Accordion: React.FC<Props> = ({
  title,
  children,
  isOpen = false,
  className,
}) => {
  const [open, setOpen] = useState(isOpen);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <article
      className={clsxm(
        "flex w-full flex-col rounded-md border transition-all",
        className
      )}
    >
      <div
        className="flex cursor-pointer justify-between p-3 font-semibold"
        onClick={handleOpen}
      >
        <span className="grow">{title}</span>
        <ArrowDownIcon rotate={open} />
      </div>
      <div
        className={clsxm(
          "accordion-transition overflow-hidden",
          open ? "max-h-screen border-t" : "max-h-0"
        )}
      >
        {children}
      </div>
    </article>
  );
};
