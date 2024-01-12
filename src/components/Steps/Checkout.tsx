import React from "react";
import { useAtom } from "jotai";
import { orderAtom } from "@/atoms/order";
import { useGetProducts } from "@/hooks/useApi";
import { CartItems } from "@/components/ShoppingCart/CartItems";
import { formatPrice } from "@/utils";

export const Checkout = () => {
  const [order] = useAtom(orderAtom);
  const { data: products } = useGetProducts();

  const getProducts = () => {
    return order.products?.length
      ? order.products.map((item) => ({
          ...item,
          product: products?.data?.find(({ id }) => id === item.productId),
        }))
      : [];
  };

  const total = getProducts().reduce(
    (acc, elem) => acc + elem.quantity * (elem.product?.price ?? 0),
    0
  );
  console.log(total);

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Checkout</h3>
        <p className="font-semibold">Table {order.tableId}</p>
      </div>
      <CartItems />
      <div className="text-right font-semibold">
        Total: {formatPrice(total)}
      </div>
    </>
  );
};
