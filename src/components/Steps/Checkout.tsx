import React from "react";
import { useAtom } from "jotai";
import { orderAtom } from "@/atoms/order";
import { CartItems } from "@/components/ShoppingCart/CartItems";

export const Checkout = () => {
  const [order] = useAtom(orderAtom);

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Checkout</h3>
        <p className="font-semibold">Table {order.tableId}</p>
      </div>
      <CartItems />
    </>
  );
};
