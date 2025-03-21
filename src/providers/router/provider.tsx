import { PropsWithChildren, useCallback } from "react";
import { ROUTES } from "./constants";
import { RouterContext } from "./context";
import { useNavigate } from "react-router-dom";

export const RouterContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const _navigate = useNavigate();

  const navigate = useCallback((path: keyof typeof ROUTES) => _navigate(ROUTES[path].path), [_navigate]);

  const goBack = useCallback(() => _navigate(-1), [_navigate]);

  return (
    <RouterContext.Provider value={{ navigate, goBack }}>
      {children}
    </RouterContext.Provider>
  );
}