import { PropsWithChildren, useCallback } from "react";
import { ROUTES } from "./constants";
import { RouterContext } from "./context";
import { useNavigate } from "react-router-dom";
import { NavigateFn } from "./types";

export const RouterContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const _navigate = useNavigate();

  const navigate: NavigateFn = useCallback((pathName, ...params) => {
    const path = ROUTES[pathName].path;
    if (path instanceof Function) {
      _navigate(path(...params as Parameters<typeof path>));
    } else {
      _navigate(path);
    }
  }, [_navigate]);

  const goBack = useCallback(() => _navigate(-1), [_navigate]);

  return (
    <RouterContext.Provider value={{ navigate, goBack }}>
      {children}
    </RouterContext.Provider>
  );
}