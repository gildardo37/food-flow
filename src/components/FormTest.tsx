import React from "react";
import { FieldArray, Form, Formik } from "formik";
import {
  AddProductOptions,
  DynamicField,
  FieldOptionData,
  FieldOptionType,
  FieldOptions,
  ProductFormData,
} from "@/types";
import { productOptions } from "@/services/mockData";
import { Button } from "@/components/Button";
import { CounterField } from "@/components/Field/CounterField";
import { DynamicFields } from "@/components/Field/DynamicFields";

type DefaultValues = Omit<DynamicField, "id" | "name">;

type DefaultValuesTypes = Record<FieldOptionType, FieldOptionData>;

const getDefaultValues = ({ options, type, required }: DefaultValues) => {
  const types: DefaultValuesTypes = {
    checkbox: [],
    counter: options.map((i) => (required || i.required ? 1 : 0)),
    radio: "",
  };
  return types[type] ?? types.radio;
};

export const FormTest = () => {
  const initialValues: ProductFormData = {
    quantity: 1,
    options: productOptions.map(({ type, id, options, required }) => ({
      id: id.toString(),
      type,
      data: getDefaultValues({ type, options, required }),
    })),
  };

  const handleSubmit = (data: ProductFormData) => {
    const result = parseResponse(data);
    console.log(result);
  };

  const parseResponse = ({
    options,
    quantity,
  }: ProductFormData): AddProductOptions => {
    return {
      productId: "12342676537",
      quantity,
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
      id: element.options[index].id ?? 1,
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
        options.forEach((elem, i) => {
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
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {() => (
          <Form className="grid grid-cols-2 gap-8">
            <fieldset>
              <CounterField name="quantity" label="Quantity" />
            </fieldset>
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
            <Button type="submit" fit>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
