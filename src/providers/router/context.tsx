import { createContext } from "react";
import { NavigateFn } from "./types";

interface RouterContextState {
  navigate: NavigateFn;
  goBack(): Promise<void> | void;
}

export const RouterContext = createContext({} as RouterContextState);

