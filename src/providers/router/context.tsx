import { createContext } from "react";
import { ROUTES } from "./constants";

interface RouterContextState {
  navigate(path: keyof typeof ROUTES): Promise<void> | void;
  goBack(): Promise<void> | void;
}

export const RouterContext = createContext({} as RouterContextState);

