import { useContext } from "react";
import { AppParamsContext } from "./context";

export const useAppParams = () => useContext(AppParamsContext);