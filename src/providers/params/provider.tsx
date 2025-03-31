import { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { AppParamsContext } from "./context";

export const AppParamsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const params = useParams<{ [key: string]: string }>();
  console.log(params)
  return (
    <AppParamsContext.Provider value={Object.values(params) as string[]}>
      {children}
    </AppParamsContext.Provider>
  );
}