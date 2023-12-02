import React, { FormEvent } from "react";
import Image from "next/image";
import { ProductOptionsResponse, Product } from "@/types";
import { Counter } from "@/components/Counter";
import { Button } from "@/components/Button";
import { OptionComponent } from "@/components/Product/OptionComponent";

interface Props {
  data: Product;
}

const productOptions: ProductOptionsResponse[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
    name: "Category 4",
    type: "radio",
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
    categories: { name: category },
    description,
    image,
    name,
    price,
  },
}) => {
  // const productOptionsResponse: AddProductOptions = {
  //   productId: "",
  //   options: [
  //     {
  //       type: "radio",
  //       data: "" as InputRadioResponse,
  //     },
  //     {
  //       type: "checkbox",
  //       data: ["1", "2"] as CheckboxResponse,
  //       // data: ["1", "2"],
  //     },
  //     {
  //       type: "counter",
  //       data: [] as MultipleCounterResponse,
  //       // data: [{ value: "option 1", quantity: 3 }],
  //     },
  //   ],
  // };

  // const [form, setForm] = useState(productOptions);

  // const handleForm = (value: string, checked: boolean) => {
  //   setForm((prev) => {
  //     if (checked) {
  //       return [...prev, value];
  //     } else if (prev.includes(value)) {
  //       return [...prev].filter((i) => i !== value);
  //     } else return prev;
  //   });
  // };

  const onSubmit = (e: FormEvent) => {
    console.log(e.preventDefault());
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
        <Counter onChange={(value) => console.log(value)} />
      </div>
      <div className="grid gap-4">
        {productOptions.map((item) => (
          <OptionComponent key={item.id} data={item.options} type={item.type} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p>
          <b>Subtotal:</b> $35.00
        </p>
        <Button className="w-fit" type="submit">
          Add product
        </Button>
      </div>
    </form>
  );
};
