import Image from "next/image";
import React from "react";
import { Card } from "../Card";
import { ProductCardData } from "@/types";

interface Props {
  data: ProductCardData;
  onClick?: () => void;
}

export const ProductCard: React.FC<Props> = ({
  data: { name, description, image, price },
  onClick = () => undefined,
}) => {
  return (
    <Card className="flex flex-col gap-2 text-left" onClick={onClick}>
      <div className="relative aspect-square w-full shrink-0">
        <Image
          src={image ?? "/hamburger.jpg"}
          fill
          alt={name}
          className="rounded"
        />
      </div>
      <div className="flex h-full w-full flex-col gap-1">
        <p className="font-semibold">{name}</p>
        <p className="grow text-sm text-gray-500">{description}</p>
        <p className="font-semibold">${price}</p>
      </div>
    </Card>
  );
};
