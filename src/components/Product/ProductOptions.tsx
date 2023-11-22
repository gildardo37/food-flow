import Image from "next/image";
import React from "react";

interface Props {
  data: {
    id: number;
    image: string;
    title: string;
    details: string;
    buttonLabel: string;
  };
}

export const ProductOptions: React.FC<Props> = ({
  data: { details, id, image, title },
}) => {
  return (
    <div>
      <div className="relative aspect-square w-80 object-cover">
        <Image src={image} alt={title} fill />
      </div>
      <div className="flex w-full flex-col p-4 text-left">
        <p className="font-semibold">Product id {id}</p>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-bold">{details}</p>
      </div>
    </div>
  );
};
