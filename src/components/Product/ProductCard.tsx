import Image from "next/image";
import React from "react";
import { Card } from "../Card";

interface Props {
  image: string;
  title: string;
  details: string;
  onClick?: () => void;
  buttonLabel?: string;
}

export const ProductCard: React.FC<Props> = ({
  title,
  details,
  image,
  onClick = () => undefined,
}) => {
  return (
    <Card onClick={onClick} className="flex flex-col overflow-hidden">
      <div className="relative aspect-square w-full object-cover">
        <Image src={image} alt={title} fill />
      </div>
      <div className="flex w-full flex-col p-4 text-left">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-bold">{details}</p>
      </div>
    </Card>
  );
};
