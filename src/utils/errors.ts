import { DisplayAlertProps } from "@/types";
import { AxiosError } from "axios";

export const errorMessages = {
  requestFailed: "Something failed while making this request.",
};

export const formErrorMessages = {
  checkbox: "At least one checkbox must be selected in this field",
  radio: "One option must be selected in this field",
  counter: "All inputs are required",
  required: "This field is required",
};

export const handleErrors = (
  e: unknown,
  displayAlert: (props: DisplayAlertProps) => void
) => {
  console.error(e);
  const message =
    e instanceof AxiosError
      ? `${e.message} - ${e.response?.data.message}`
      : (e as Error).message;

  displayAlert({
    message: message ?? errorMessages.requestFailed,
    type: "error",
  });
};
