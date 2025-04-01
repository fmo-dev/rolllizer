import { useContext } from "react";
import { RouteParamsContext } from "./context";

export const useRouteParams = () => useContext(RouteParamsContext);