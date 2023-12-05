import React, { useEffect, useState } from "react";
import { clsxm } from "@/utils";
import { CloseIcon } from "@/components/Icons/CloseIcon";

interface Props {
  modalOpen?: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  full?: boolean;
}

export const Modal: React.FC<Props> = ({
  modalOpen = false,
  children,
  onClose,
  title,
  full,
}: Props) => {
  const [triggerClose, setTriggerClose] = useState(false);

  const closeModal = () => {
    setTriggerClose(true);
    setTimeout(() => {
      setTriggerClose(false);
      onClose();
    }, 200);
  };

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;
    html.style.overflow = modalOpen ? "hidden" : "auto";
    html.style.height = modalOpen ? "100dvh" : "auto";
  }, [modalOpen]);

  return modalOpen ? (
    <div
      className={clsxm(
        "animate__animated animate__fadeIn fixed inset-0 z-20 flex w-full items-center justify-center md:bg-black/50 md:p-4",
        { animate__fadeOut: triggerClose }
      )}
    >
      <section
        className={clsxm(
          "animate__animated animate__zoomIn flex h-full max-h-screen w-full max-w-screen-md flex-col gap-4 overflow-y-auto bg-white p-4 md:h-auto md:max-h-[80vh] md:max-w-screen-md md:rounded-lg md:p-6",
          { "md:h-full": full }
        )}
      >
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={closeModal}>
            <CloseIcon height="32" width="32" />
          </button>
        </header>
        <div>{children}</div>
      </section>
    </div>
  ) : null;
};
