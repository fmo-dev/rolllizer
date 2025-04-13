import { createContext } from "react";
import { FooterAction } from "./type";

interface FooterContextState {
  footerAction?: FooterAction;
  setFooterAction(footerAction?: FooterAction): void;
}

export const FooterContext = createContext({} as FooterContextState);

