import React, { FormEvent, useState } from "react";
import Image from "next/image";
import {
  ProductOptionsResponse,
  Product,
  FieldOptionData,
  AddProductOptions,
} from "@/types";
import { Counter } from "@/components/Counter";
import { Button } from "@/components/Button";
import { OptionComponent } from "@/components/Product/OptionComponent";

interface Props {
  data: Product;
}

type ChangeProps = Omit<ProductOptionsResponse, "options"> & {
  value: FieldOptionData;
};

const productOptions: ProductOptionsResponse[] = [
  {
    id: 453454441,
    name: "Category 1",
    type: "radio",
    options: [
      {
        id: 1,
        name: "Radio 1",
        description: "Testing a big and large description",
      },
      { id: 2, name: "Radio 2" },
      { id: 3, name: "Radio 3" },
      { id: 4, name: "Radio 4", description: "$3.00" },
    ],
  },
  {
    id: 272544,
    name: "Category 2",
    type: "checkbox",
    options: [
      { id: 1, name: "Checkbox 1" },
      { id: 2, name: "Checkbox 2", description: "Includes sause." },
      { id: 3, name: "Checkbox 3" },
      { id: 4, name: "Checkbox 4" },
    ],
  },
  {
    id: 784366,
    name: "Category 3",
    type: "counter",
    options: [
      { id: 1, name: "Counter 1", description: "$5.00" },
      { id: 2, name: "Counter 2" },
      { id: 3, name: "Counter 3" },
      { id: 4, name: "Counter 4" },
    ],
  },
  {
    id: 2345768,
    name: "Category 4",
    type: "radio",
    options: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3", description: "$5.00" },
      { id: 4, name: "Item 4" },
    ],
  },
  {
    id: 1342345,
    name: "Category 5",
    type: "counter",
    options: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3", description: "$5.00" },
      { id: 4, name: "Item 4" },
    ],
  },
];

export const ProductOptions: React.FC<Props> = ({
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
        <Counter onChange={handleCounterChange} />
      </div>
      <div className="grid gap-4">
        {productOptions.map(({ id, name, options, type }) => (
          <OptionComponent
            key={id}
            data={options}
            name={name}
            type={type}
            onChange={(value) => handleChange({ value, id, name, type })}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p>
          <b>Subtotal:</b> $35.00
        </p>
        <Button
          className="w-fit"
          type="submit"
          disabled={Boolean(!form.quantity)}
        >
          Add product
        </Button>
      </div>
    </form>
  );
};
