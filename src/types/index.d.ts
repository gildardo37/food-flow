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
  products?: ProductDetails[];
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
  quantity: number;
  value: string;
}

export type InputRadioResponse = string;
export type CheckboxResponse = CheckboxData["value"][];
export type MultipleCounterResponse = CounterResponse[];

export type FieldOptionType = "radio" | "checkbox" | "counter";

export type FieldOptionData =
  | InputRadioResponse
  | CheckboxResponse
  | MultipleCounterResponse
  | null;

export interface FieldOptions {
  id: string;
  type: FieldOptionType;
  data: FieldOptionData;
}
export interface AddProductOptions {
  productId: Product["id"];
  quantity: number;
  options: FieldOptions[];
}

export interface ProductOptionsResponse {
  id: number;
  name: string;
  type: FieldOptionType;
  options: OptionsData[];
}
export interface OptionsData {
  id: number;
  name: string;
  description?: string;
}

export interface GroupFieldProps<T> {
  options: OptionsData[];
  name: string;
  onChange: (data: T) => void;
}
