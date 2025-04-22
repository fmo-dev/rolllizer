import { createContext } from "react";
import { FooterAction } from "./type";

interface FooterContextState {
  footerAction?: FooterAction;
  setFooterAction: React.Dispatch<React.SetStateAction<FooterAction | undefined>>;
}

export const FooterContext = createContext({} as FooterContextState);

