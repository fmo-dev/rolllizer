import { useContext } from "react";
import { ToastContext } from "./context";

export const useToastContext = () => useContext(ToastContext);