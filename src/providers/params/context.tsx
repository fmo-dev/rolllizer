import { createContext } from "react";

type AppParamsContextState = string[]

export const AppParamsContext = createContext({} as AppParamsContextState);

