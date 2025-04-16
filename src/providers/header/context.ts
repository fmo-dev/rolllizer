import { createContext, ReactNode } from "react";

interface HeaderContextState {
  canGoBack: boolean;
  setCanGoBack(value: boolean): void;
  title: ReactNode | undefined;
  setTitle(value?: ReactNode): void;
}

export const HeaderContext = createContext({} as HeaderContextState);

