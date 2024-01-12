import React from "react";
import Image from "next/image";
import { Counter } from "@/components/Field/Counter";
import { Product } from "@/types";

interface Props {
  product: Product;
}

export const ProductOptionsHeader: React.FC<Props> = ({
  product: {
    image,
    name,
    description,
    price,
    categories: { name: category },
  },
}) => {
  return (
    <div className="grid place-items-center gap-4 md:grid-cols-[160px_1fr_120px]">
      <div className="relative aspect-square h-40 object-cover md:h-auto md:w-full">
        <Image
          src={image ?? "/hamburger.jpg"}
          alt={name}
          fill
          className="rounded-md"
          objectFit="cover"
        />
      </div>
      <div className="flex w-full flex-col text-center md:text-left">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-md text-gray-500">{description}</p>
        <p className="text-md text-gray-500">{category}</p>
        <p className="font-bold">${price}</p>
      </div>
      <fieldset>
        <Counter name="quantity" required />
      </fieldset>
    </div>
  );
};
