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

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <article className="flex w-full flex-col rounded-md border transition-all">
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
