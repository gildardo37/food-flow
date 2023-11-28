import React from "react";
import Image from "next/image";
import { useGetProducts } from "@/hooks/useApi";
import { Card } from "../Card";

export const SelectOrder: React.FC = () => {
  const { data, isLoading, error } = useGetProducts();

  return isLoading ? (
    <p>Loading</p>
  ) : error ? (
    <p>{error.message}</p>
  ) : data?.data?.length ? (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {data.data.map(({ id, name, description, price }) => (
        <Card key={id} className="flex flex-col gap-2 text-left">
          <div className="relative aspect-square w-full shrink-0">
            <Image src="/hamburger.jpg" fill alt={name} className="rounded" />
          </div>
          <div className="flex h-full w-full flex-col gap-1">
            <p className="font-semibold">{name}</p>
            <p className="grow text-sm text-gray-500">{description}</p>
            <p className="font-semibold">${price}</p>
          </div>
        </Card>
      ))}
    </div>
  ) : (
    <p>Something failed</p>
  );
};
