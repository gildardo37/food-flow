import {
  AddProductOptions,
  DynamicField,
  FieldOptionType,
  GetValueProps,
  MultipleCounterResponse,
} from "@/types";

export const useParseCartProducts = () => {
  const parseOptions = (item: AddProductOptions, optData: DynamicField[]) => {
    return item.options.map((elem) => {
      const data = optData.find(({ id }) => id === Number(elem.id));
      const valueProps: GetValueProps = { elem, options: data?.options };

      const types: Record<FieldOptionType, () => string> = {
        checkbox: () => getCheckboxValue(valueProps),
        counter: () => getCounterValue(valueProps),
        radio: () => getRadioValue(valueProps),
        text: () => elem.data as string,
      };

      return { ...elem, description: types[elem.type](), name: data?.name };
    });
  };

  const getCheckboxValue = ({ elem, options }: GetValueProps) => {
    const value = options
      ?.filter(({ id }) => (elem.data as string[]).includes(id.toString()))
      .map(({ name }) => name)
      .join(", ");
    const textValue = value ? `${value}.` : value;
    return textValue ?? "";
  };

  const getCounterValue = ({ elem, options }: GetValueProps) => {
    const cartOptions = elem.data as MultipleCounterResponse;
    const value = options
      ?.reduce((acc, { name, id: idx }) => {
        const match = cartOptions.find(({ id }) => id === idx);
        if (match?.quantity) {
          acc.push(`${match.quantity} ${name}`);
        }
        return acc;
      }, [] as string[])
      .join(", ");
    const textValue = value ? `${value}.` : value;
    return textValue ?? "";
  };

  const getRadioValue = ({ elem, options }: GetValueProps) => {
    const item = options?.find(({ id }) => id === Number(elem.data));
    return item?.name + "." ?? "";
  };

  return {
    getCheckboxValue,
    getCounterValue,
    getRadioValue,
    parseOptions,
  };
};
