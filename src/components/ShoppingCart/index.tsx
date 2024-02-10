import React from "react";
import { useAtom } from "jotai";
import { orderAtom } from "@/atoms/order";
import { useModal } from "@/hooks/useModal";
import { CartIcon } from "@/components/Icons/CartIcon";
import { Modal } from "@/components/Modal";
import { CartItems } from "@/components/ShoppingCart/CartItems";

export const ShoppingCart = () => {
  const [order] = useAtom(orderAtom);
  const { isOpen, openModal, closeModal } = useModal();

  const items = order.products?.length;

  return (
    <>
      <button
        className="relative p-2 disabled:pointer-events-none disabled:opacity-50"
        disabled={!items}
        onClick={openModal}
      >
        {items ? (
          <span className="absolute left-0 top-0 grid h-5 w-5 items-center rounded-full bg-red-400 text-[10px] text-white">
            {items}
          </span>
        ) : null}
        <CartIcon />
      </button>
      <Modal modalOpen={isOpen} onClose={closeModal} title="Cart">
        {items ? (
          <CartItems />
        ) : (
          <p className="text-gray-500">No products added to the cart.</p>
        )}
      </Modal>
    </>
  );
};
