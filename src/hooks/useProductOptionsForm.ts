import {
  AddProductOptions,
  DynamicField,
  FieldOptionData,
  FieldOptionType,
  FieldOptions,
  ProductFormData,
} from "@/types";
import { formErrorMessages } from "@/utils";

interface Props {
  productOptions: DynamicField[];
}

type DefaultValues = Omit<DynamicField, "id" | "name">;

type DefaultValuesTypes = Record<FieldOptionType, FieldOptionData>;

export const useProductOptionsForm = ({ productOptions }: Props) => {
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

  const scrollIntoError = () => {
    const form = document.querySelector("form div.form-no-scroll");
    const elements = form?.querySelectorAll(".accordion-error");

    if (elements?.length) {
      elements[0]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const validate = (values: ProductFormData) => {
    const errors: Record<string, string> = {};
    const messages = formErrorMessages;

    setTimeout(scrollIntoError, 500);

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

  const parseResponse = (
    id: string,
    { options, quantity, notes }: ProductFormData
  ): AddProductOptions => {
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

  return {
    validate,
    getDefaultValues,
    initialValues,
    parseResponse,
  };
};
