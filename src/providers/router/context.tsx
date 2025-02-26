import { createContext } from "react";
import { ROUTES } from "./constants";

interface RouterContextState {
  navigate(path: keyof typeof ROUTES): void;
}

export const RouterContext = createContext({} as RouterContextState);

