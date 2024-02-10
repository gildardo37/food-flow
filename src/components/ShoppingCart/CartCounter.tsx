import React from "react";
import { useAtom } from "jotai";
import { orderAtom } from "@/atoms/order";
import { clsxm } from "@/utils";
import { DeleteIcon } from "@/components/Icons/DeleteIcon";
import { AddIcon } from "@/components/Icons/AddIcon";
import { RemoveIcon } from "@/components/Icons/RemoveIcon";

interface Props {
  id: string;
  index: number;
  quantity: number;
}

export const CartCounter: React.FC<Props> = ({ quantity, id, index }) => {
  const [, setOrder] = useAtom(orderAtom);

  const updateInput = (decrement = false) => {
    setOrder((prev) => {
      if (!prev.products) return prev;

      const data = prev.products.map((elem, idx) => {
        if (elem.productId === id && idx === index) {
          if (!decrement && elem.quantity >= 0) {
            elem.quantity = elem.quantity + 1;
          } else if (decrement && elem.quantity >= 1) {
            elem.quantity = elem.quantity - 1;
          }
        }
        return elem;
      });
      const filteredData = data.filter(({ quantity }) => quantity > 0);
      return { ...prev, products: filteredData };
    });
  };

  return (
    <div className={clsxm("flex h-fit w-[120px] select-none items-center")}>
      <button onClick={() => updateInput(true)} type="button">
        {quantity === 1 ? <DeleteIcon /> : <RemoveIcon />}
      </button>
      <input
        type="number"
        className={clsxm(
          "pointer-events-none w-full text-center font-semibold outline-none"
        )}
        pattern="[1-9]\d*"
        readOnly
        value={quantity}
      />
      <button onClick={() => updateInput()} type="button">
        <AddIcon />
      </button>
    </div>
  );
};
