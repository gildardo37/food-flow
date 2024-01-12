import React from "react";
import { FieldArray, Form, Formik } from "formik";
import { useAtom } from "jotai";
import { orderAtom } from "@/atoms/order";
import { Product, ProductFormData } from "@/types";
import { productOptions } from "@/services/mockData";
import { useProductOptionsForm } from "@/hooks/useProductOptionsForm";
import { DynamicFields } from "@/components/Field/DynamicFields";
import { TextField } from "@/components/Field/TextField";
import { ProductOptionsFooter } from "@/components/Product/ProductOptionsFooter";
import { ProductOptionsHeader } from "@/components/Product/ProductOptionsHeader";

interface Props {
  product: Product;
  closeModal: () => void;
  enableNextButton: () => void;
}

export const ProductOptions: React.FC<Props> = ({
  product,
  closeModal,
  enableNextButton,
}) => {
  const [order, setOrder] = useAtom(orderAtom);
  const { validate, initialValues, parseResponse } = useProductOptionsForm({
    productOptions,
  });

  const handleSubmit = (data: ProductFormData) => {
    const result = parseResponse(product.id, data);
    setOrder((prev) => {
      if (prev.products?.length) {
        return { ...prev, products: [...prev.products, result] };
      }
      return { ...prev, products: [result] };
    });
    closeModal();
    enableNextButton();
  };

  console.log(order);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
      validateOnMount={true}
    >
      {({ values }) => (
        <Form className="flex h-full grow flex-col gap-4">
          <div className="hide-scroll flex grow flex-col gap-4 overflow-y-scroll pb-6">
            <ProductOptionsHeader product={product} />
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
          <ProductOptionsFooter
            subtotal={values.quantity * product.price}
            onCancel={closeModal}
          />
        </Form>
      )}
    </Formik>
  );
};
