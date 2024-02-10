import React, { Fragment } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { orderAtom } from "@/atoms/order";
import { formatPrice } from "@/utils";
import { useGetAllProductOptions, useGetProducts } from "@/hooks/useApi";
import { useParseCartProducts } from "@/hooks/useParseCartProducts";
import { CartCounter } from "@/components/ShoppingCart/CartCounter";

export const CartItems = () => {
  const [order] = useAtom(orderAtom);
  const { data: products } = useGetProducts();
  const { data: productOptions } = useGetAllProductOptions();
  const { parseOptions } = useParseCartProducts();

  const getProducts = () => {
    const prodData = products?.data;
    const optionsData = productOptions?.data;

    if (order?.products?.length && optionsData?.length && prodData?.length) {
      return order.products.map((item) => ({
        ...item,
        product: prodData.find(({ id }) => id === item.productId),
        options: parseOptions(item, optionsData),
      }));
    }

    return [];
  };

  const totalAmount = getProducts().reduce((acc, { quantity, product }) => {
    return acc + quantity * (product?.price ?? 0);
  }, 0);

  return (
    <div className="flex flex-col">
      {getProducts().map(
        ({ quantity, notes, product, options, productId }, index) => (
          <div
            key={index}
            className="grid grid-cols-[64px_1fr_120px] gap-4 border-t-2 p-4"
          >
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
              {options.map(({ description, name }, index) => (
                <Fragment key={index}>
                  {description ? (
                    <p className="text-xs">
                      <span className="font-semibold">{name}: </span>
                      {description}
                    </p>
                  ) : null}
                </Fragment>
              ))}
              {notes ? (
                <p className="text-xs font-semibold">Notes: {notes}</p>
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
      <div className="border-t-2 py-4 text-right font-semibold">
        Total: {formatPrice(totalAmount)}
      </div>
    </div>
  );
};
