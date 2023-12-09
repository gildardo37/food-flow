import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import { Button } from "./Button";
import { productOptions } from "@/services/mockData";
import { AddProductOptions, FieldOptionData, FieldOptions } from "@/types";

type FormData = Omit<AddProductOptions, "productId">;

export const FormTest = () => {
  const initialValues: FormData = {
    quantity: 0,
    options: productOptions.map(({ type, id }) => ({
      id: id.toString(),
      type,
      data: type === "checkbox" || type === "counter" ? [] : "",
    })),
  };

  const handleSubmit = (data: FormData) => {
    console.log(data);
    const result = parseResponse(data);
    console.log(result);
  };

  const parseResponse = ({
    options,
    quantity,
  }: FormData): AddProductOptions => {
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

  // console.log(validationSchema);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="grid grid-cols-3 gap-8">
          <fieldset>
            <Field type="number" name="quantity" />
          </fieldset>
          <FieldArray name="options">
            {() =>
              productOptions.map((category, catIndex) => (
                <fieldset key={category.id} className="flex flex-col gap-2">
                  <h3>{category.name}</h3>
                  {category.options.map((option, index) => (
                    <label key={option.id}>
                      {option.name}:
                      {category.type === "radio" ? (
                        <Field
                          type="radio"
                          name={`options.[${catIndex}].data`}
                          value={option.id}
                        />
                      ) : category.type === "checkbox" ? (
                        <Field
                          type="checkbox"
                          name={`options.[${catIndex}].data`}
                          value={option.id}
                        />
                      ) : category.type === "counter" ? (
                        <Field
                          type="number"
                          name={`options.[${catIndex}].data.[${index}]`}
                        />
                      ) : (
                        <Field
                          type="text"
                          name={`options.[${catIndex}].data`}
                        />
                      )}
                      <ErrorMessage
                        name={`${category.id}-${option.id}`}
                        component="div"
                      />
                    </label>
                  ))}
                </fieldset>
              ))
            }
          </FieldArray>
          <Button type="submit" fit>
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};
