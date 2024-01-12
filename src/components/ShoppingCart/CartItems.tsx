import React from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { orderAtom } from "@/atoms/order";
import { formatPrice } from "@/utils";
import { useGetProducts } from "@/hooks/useApi";
import { CartCounter } from "./CartCounter";

export const CartItems = () => {
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
  console.log(order);

  return (
    <div className="flex flex-col gap-4">
      {getProducts().map(
        ({ quantity, notes, product, options, productId }, index) => (
          <div key={index} className="grid grid-cols-[64px_1fr_120px] gap-4">
            <div className="relative aspect-square w-full">
              <Image
                src={product?.image ?? "/hamburger.jpg"}
                fill
                alt={product?.name ?? ""}
                className="rounded"
              />
            </div>
            <div>
              <p className="font-semibold">{product?.name}</p>
              <div className="text-xs">
                {options.map(({ id, data }, index) => (
                  <p key={index}>
                    {id} {JSON.stringify(data)}
                  </p>
                ))}
              </div>
              {notes ? (
                <p className="text-sm text-gray-500">
                  <b className="font-semibold">Notes:</b> {notes}
                </p>
              ) : null}
              <p className="font-semibold">
                {formatPrice((product?.price ?? 0) * quantity)}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <CartCounter quantity={quantity} id={productId} index={index} />
            </div>
          </div>
        )
      )}
    </div>
  );
};
