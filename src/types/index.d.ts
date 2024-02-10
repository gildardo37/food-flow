import { FormikProps } from "formik";
import { Product } from ".";

export * from "./ApiResponse";

export type AlertOptionType = "error" | "success" | "warning";

export interface AlertOptions {
  message: string;
  type?: AlertOptionType;
  triggerClose?: boolean;
  triggerOpen?: boolean;
}

export interface DisplayAlertProps {
  message: string;
  duration?: number;
  type?: AlertOptionType;
  onClose?: () => void;
}

export type AlertColors = Record<
  AlertOptionType,
  {
    backgroundColor: string;
    textColor: string;
    icon: ReactNode;
  }
>;

export interface DropdownOptions<T = string> {
  name: string;
  value: T;
}

export type StepComponents = Record<Steps, React.ReactNode>;

export interface OrderDetails {
  tableId?: number;
  products?: AddProductOptions[];
}

export interface ProductDetails {
  id: string;
  quantity: number;
  notes: string;
}

export interface StepOptions {
  label: string;
  isDisabled: boolean;
}

export interface CheckboxData {
  value: string;
  checked: boolean;
}

export interface CounterResponse {
  id: number;
  quantity: number;
}

export type InputRadioResponse = string;
export type CheckboxResponse = CheckboxData["value"][];
export type MultipleCounterResponse = CounterResponse[];

export type FieldOptionType = "radio" | "checkbox" | "counter" | "text";

export type FieldOptionData =
  | InputRadioResponse
  | CheckboxResponse
  | MultipleCounterResponse
  | number[];

export interface FieldOptions {
  id: string;
  type: FieldOptionType;
  data: FieldOptionData;
}
export interface AddProductOptions {
  productId: Product["id"];
  quantity: number;
  options: FieldOptions[];
  notes: string;
}

export interface DynamicField {
  id: number;
  options?: OptionsData[];
  name: string;
  type: FieldOptionType;
  required?: boolean;
}
export interface OptionsData {
  id: number;
  name: string;
  description?: string;
  required?: boolean;
}

export interface GroupFieldProps {
  options: OptionsData[];
  name: string;
  index: number;
  required?: boolean;
}

export type ProductFormData = Omit<AddProductOptions, "productId">;

export type ProductFormProps = FormikProps<ProductFormData>;

export interface GetValueProps {
  elem: FieldOptions;
  options?: OptionsData[];
}
