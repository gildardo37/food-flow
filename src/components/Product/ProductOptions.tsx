import React from "react";
import Image from "next/image";
import { FieldArray, Form, Formik } from "formik";
import {
  AddProductOptions,
  DynamicField,
  FieldOptionData,
  FieldOptionType,
  FieldOptions,
  Product,
  ProductFormData,
} from "@/types";
import { productOptions } from "@/services/mockData";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Field/Counter";
import { DynamicFields } from "@/components/Field/DynamicFields";
import { useAtom } from "jotai";
import { orderAtom } from "@/atoms/order";
import { TextField } from "@/components/Field/TextField";

type DefaultValues = Omit<DynamicField, "id" | "name">;

type DefaultValuesTypes = Record<FieldOptionType, FieldOptionData>;

interface Props {
  product: Product;
  closeModal: () => void;
}

export const ProductOptions: React.FC<Props> = ({
  product: {
    id,
    categories: { name: category },
    description,
    image,
    name,
    price,
  },
  closeModal,
}) => {
  const [, setOrder] = useAtom(orderAtom);
  const getDefaultValues = ({ options, type, required }: DefaultValues) => {
    const types: DefaultValuesTypes = {
      checkbox: [],
      counter: options?.map((i) =>
        required || i.required ? 1 : 0
      ) as FieldOptionData,
      radio: "",
      text: "",
    };
    return types[type] ?? types.text;
  };

  const initialValues: ProductFormData = {
    quantity: 1,
    notes: "",
    options: productOptions.map(({ type, id, options, required }) => ({
      id: id.toString(),
      type,
      data: getDefaultValues({ type, options, required }),
    })),
  };

  const handleSubmit = (data: ProductFormData) => {
    const result = parseResponse(data);
    setOrder((prev) => {
      if (prev.products?.length) {
        return { ...prev, products: [...prev.products, result] };
      }
      return { ...prev, products: [result] };
    });
    closeModal();
  };

  const parseResponse = ({
    options,
    quantity,
    notes,
  }: ProductFormData): AddProductOptions => {
    return {
      productId: id,
      quantity,
      notes,
      options: options.map((items) => ({
        ...items,
        data: parseOptionData(items),
      })),
    };
  };

  const parseOptionData = ({
    data,
    id,
    type,
  }: FieldOptions): FieldOptionData => {
    if (type !== "counter") {
      return data;
    }

    const element = productOptions.find(
      (item) => item.id.toString() === id && item.type === type
    );

    if (!element) return [];

    return (data as number[]).map((quantity, index) => ({
      quantity,
      id: element.options?.[index].id ?? 1,
    }));
  };

  const validate = (values: ProductFormData) => {
    const errors: Record<string, string> = {};
    const messages = {
      checkbox: "At least one checkbox must be selected in this field",
      radio: "One option must be selected in this field",
      counter: "All inputs are required",
      required: "This field is required",
    };

    values.options.forEach(({ data, type }, index) => {
      const { options, required } = productOptions[index];
      const name = `options[${index}].data`;
      const itemName = (i: number) => `options[${index}].data[${i}]`;
      const hasNegativeNumber = () => (data as number[]).some((e) => e <= 0);

      if (!required && type === "counter") {
        options?.forEach((elem, i) => {
          if ((data[i] as number) <= 0 && elem.required) {
            errors[itemName(i)] = messages.required;
          }
        });
      }

      if (!required) {
        return;
      }

      if (type === "checkbox" && !data.length) {
        errors[name] = messages.checkbox;
      } else if (type === "radio" && !data) {
        errors[name] = messages.radio;
      } else if (type === "counter" && hasNegativeNumber()) {
        errors[name] = messages.counter;
      }
    });

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
      validateOnMount={true}
    >
      {({ isValid, values }) => (
        <Form className="flex h-full grow flex-col gap-4">
          <div className="hide-scroll flex grow flex-col gap-4 overflow-y-scroll pb-6">
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
              <fieldset>
                <Counter name="quantity" required />
              </fieldset>
            </div>
            <FieldArray name="options">
              {() =>
                productOptions.map(
                  ({ id, name, options, type, required }, index) => (
                    <DynamicFields
                      key={id}
                      data={{ name, options, type, required }}
                      index={index}
                    />
                  )
                )
              }
            </FieldArray>
            <TextField label="Notes" name="notes" />
          </div>
          <div className="z-20 -m-6 flex items-center justify-between rounded-[0_0_8px_8px] border-t bg-white p-4">
            <p>
              <b>Subtotal:</b> ${values.quantity * price}
            </p>
            <div className="flex gap-4">
              <Button
                fit
                type="button"
                buttonType="secondary"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button fit type="submit" disabled={!isValid}>
                submit
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
