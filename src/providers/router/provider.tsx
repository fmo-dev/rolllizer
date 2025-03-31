import { PropsWithChildren, useCallback } from "react";
import { ROUTES } from "./constants";
import { RouterContext } from "./context";
import { useNavigate } from "react-router-dom";
import { NavigateFn } from "./types";
import { AppParamsContextProvider } from "../params/provider";

export const RouterContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const _navigate = useNavigate();

  const navigate: NavigateFn = useCallback((pathName, ...params) => {
    let path: string = ROUTES[pathName].path;
    params?.forEach((param) => path = path.replace(/:[0-9]/, `${param}`));
    _navigate(path);
  }, [_navigate]);

  const goBack = useCallback(() => _navigate(-1), [_navigate]);

  return (
    <RouterContext.Provider value={{ navigate, goBack }}>
      <AppParamsContextProvider>
        {children}
      </AppParamsContextProvider>
    </RouterContext.Provider>
  );
}