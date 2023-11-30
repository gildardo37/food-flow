import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Counter } from "../Counter";
import { Accordion } from "../Accordion";

interface Props {
  data: Product;
}

export const ProductOptions: React.FC<Props> = ({
  data: {
    categories: { name: category },
    description,
    image,
    name,
    price,
  },
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[160px_1fr_120px] items-center gap-4">
        <div className="relative aspect-square object-cover">
          <Image
            src={image ?? "/hamburger.jpg"}
            alt={name}
            fill
            className="rounded-md"
          />
        </div>
        <div className="flex w-full flex-col text-left">
          <p className="text-xl font-semibold">{name}</p>
          <p className="text-md text-gray-500">{description}</p>
          <p className="text-md text-gray-500">{category}</p>
          <p className="font-bold">${price}</p>
        </div>
        <Counter onChange={(value) => console.log(value)} />
      </div>
      <div className="grid gap-4">
        <Accordion title="Accordion 1" isOpen>
          <div>More content here</div>
          <div>More content here</div>
          <div>More content here</div>
          <div>More content here</div>
          <div>More content here</div>
          <div>More content here</div>
          <div>More content here</div>
        </Accordion>
      </div>
    </div>
  );
};
