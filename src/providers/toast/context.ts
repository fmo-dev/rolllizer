import { createContext } from "react";

interface ToastContextState {
  addToast(message: string): void;
}

export const ToastContext = createContext({} as ToastContextState);

