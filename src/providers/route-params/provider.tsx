import { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { RouteParamsContext } from "./context";

export const RouteParamsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const params = useParams<{ [key: string]: string }>();

  return (
    <RouteParamsContext.Provider value={Object.values(params) as string[]}>
      {children}
    </RouteParamsContext.Provider>
  );
}