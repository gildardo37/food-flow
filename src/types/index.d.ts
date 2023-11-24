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
