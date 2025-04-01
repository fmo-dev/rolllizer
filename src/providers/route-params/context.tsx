import { createContext } from "react";

type RouteParamsContextState = string[]

export const RouteParamsContext = createContext({} as RouteParamsContextState);

