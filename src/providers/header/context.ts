import { createContext } from "react";

interface HeaderContextState {
  canGoBack: boolean;
  setCanGoBack(value: boolean): void;
  title: string | undefined;
  setTitle(value?: string): void;
}

export const HeaderContext = createContext({} as HeaderContextState);

