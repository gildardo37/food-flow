import { ProductOptionsResponse } from "@/types";

export const productOptions: ProductOptionsResponse[] = [
  {
    id: 1111,
    name: "Category 1",
    type: "radio",
    required: true,
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
    id: 2222,
    name: "Category 2",
    type: "checkbox",
    required: false,
    options: [
      { id: 1, name: "Checkbox 1" },
      {
        id: 2,
        name: "Checkbox 2",
        description: "Includes sause.",
      },
      { id: 3, name: "Checkbox 3" },
      { id: 4, name: "Checkbox 4" },
    ],
  },
  {
    id: 3333,
    name: "Category 3",
    type: "counter",
    required: true,
    options: [
      { id: 1, name: "Counter 1", description: "$5.00" },
      { id: 2, name: "Counter 2" },
      { id: 3, name: "Counter 3" },
      { id: 4, name: "Counter 4" },
    ],
  },
  {
    id: 4444,
    name: "Category 4",
    type: "radio",
    required: true,
    options: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3", description: "$5.00" },
      { id: 4, name: "Item 4" },
    ],
  },
  {
    id: 5555,
    name: "Category 5",
    type: "counter",
    required: false,
    options: [
      { id: 11, name: "Item 1", required: true },
      { id: 22, name: "Item 2" },
      { id: 33, name: "Item 3", description: "$5.00" },
      { id: 44, name: "Item 4" },
    ],
  },
];
