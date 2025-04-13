import { createContext } from "react";

interface HeaderContextState {
  canGoBack: boolean;
  setCanGoBack(value: boolean): void;
}

export const HeaderContext = createContext({} as HeaderContextState);

