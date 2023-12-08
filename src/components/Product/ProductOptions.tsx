import React, { FormEvent, useState } from "react";
import Image from "next/image";
import {
  ProductOptionsResponse,
  Product,
  FieldOptionData,
  AddProductOptions,
} from "@/types";
import { productOptions } from "@/services/mockData";
import { Counter } from "@/components/Counter";
import { Button } from "@/components/Button";
import { OptionComponent } from "@/components/Product/OptionComponent";

interface Props {
  data: Product;
  closeModal: () => void;
}

type ChangeProps = Omit<ProductOptionsResponse, "options" | "required"> & {
  value: FieldOptionData;
};

export const ProductOptions: React.FC<Props> = ({
  closeModal,
  data: {
    id,
    categories: { name: category },
    description,
    image,
    name,
    price,
  },
}) => {
  const productOptionsResponse: AddProductOptions = {
    productId: id,
    quantity: 0,
    options: productOptions.map(({ type, id }) => ({
      id: id.toString(),
      type,
      data: null,
    })),
  };

  const [form, setForm] = useState<AddProductOptions>(productOptionsResponse);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit", form);
  };

  const handleChange = ({ id, value, type }: ChangeProps) => {
    setForm((prev) => {
      prev.options.forEach((item) => {
        if (item.id === id.toString() && item.type === type) {
          item.data = value;
        }
      });
      return prev;
    });
  };

  const handleCounterChange = (value: number) => {
    setForm((prev) => ({ ...prev, quantity: value }));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
        <Counter onChange={handleCounterChange} required />
      </div>
      <div className="grid gap-4">
        {productOptions.map(({ id, name, options, type, required }) => (
          <OptionComponent
            key={id}
            data={options}
            name={name}
            type={type}
            onChange={(value) => handleChange({ value, id, name, type })}
            required={required}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p>
          <b>Subtotal:</b> $35.00
        </p>
        <div className="flex gap-4">
          <Button fit type="button" buttonType="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button fit type="submit" disabled={Boolean(!form.quantity)}>
            Add product
          </Button>
        </div>
      </div>
    </form>
  );
};
