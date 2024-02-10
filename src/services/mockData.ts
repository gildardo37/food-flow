import { DynamicField } from "@/types";

export const productOptions: DynamicField[] = [
  {
    id: 4444,
    name: "Meat",
    type: "radio",
    required: true,
    options: [
      { id: 1, name: "One" },
      { id: 2, name: "Double" },
      { id: 3, name: "1/4 Pound", description: "$5.00" },
      { id: 4, name: "Double 1/4 Pound" },
    ],
  },
  {
    id: 1111,
    name: "Meat sauce",
    type: "radio",
    required: true,
    options: [
      {
        id: 1,
        name: "Spicy Chipotle",
        description: "Testing a big and large description",
      },
      { id: 2, name: "Chipotle" },
      { id: 3, name: "Ranch" },
      { id: 4, name: "Buffalo", description: "$3.00" },
    ],
  },
  {
    id: 2222,
    name: "Vegetables",
    type: "checkbox",
    required: false,
    options: [
      { id: 1, name: "Lettuce" },
      {
        id: 2,
        name: "Onions",
        description: "Includes sause.",
      },
      { id: 3, name: "Tomato" },
      { id: 4, name: "Fried onions" },
      { id: 5, name: "Pickels" },
    ],
  },
  {
    id: 3333,
    name: "Extras",
    type: "counter",
    required: false,
    options: [
      { id: 1, name: "Ketchup", description: "$5.00" },
      { id: 2, name: "Muztard" },
      { id: 3, name: "Mayonnaise" },
      { id: 4, name: "Cheese" },
      { id: 5, name: "Bacon" },
      {
        id: 6,
        name: "Spicy Chipotle",
        description: "Testing a big and large description",
      },
      { id: 7, name: "Chipotle" },
      { id: 8, name: "Ranch" },
      { id: 9, name: "Buffalo", description: "$3.00" },
      { id: 10, name: "Guacamole", description: "$3.00" },
      { id: 11, name: "Jalapeños", description: "$3.00" },
    ],
  },
];
