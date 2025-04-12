import { createContext } from "react";

interface HeaderContextState {
  setTitle(title: string): void;
}

export const HeaderContext = createContext({} as HeaderContextState);

