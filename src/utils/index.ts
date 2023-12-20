export * from "./clsxm";
export * from "./errors";
export * from "./numbers";
export * from "./forms";

export const debounce = <T>(fn: (...args: T[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: T[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
