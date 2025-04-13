import { PropsWithChildren, useCallback } from "react";
import { ROUTES } from "./constants";
import { RouterContext } from "./context";
import { useNavigate } from "react-router-dom";
import { NavigateFn } from "./types";
import { UserProfile } from "../user/types";

export const RouterContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const _navigate = useNavigate();

  const navigate: NavigateFn = useCallback((pathName, ...params) => {
    let path: string = ROUTES[pathName].path;
    params?.forEach((param) => path = path.replace(/:[0-9]/, `${param}`));
    _navigate(path);
  }, [_navigate]);
  const goBack = useCallback(() => _navigate(-1), [_navigate]);
  const goHome = useCallback((profile?: UserProfile) => {
    switch (profile) {
      case 'master':
        return navigate('masterHome');
      case 'player':
        return navigate('playerHome');
      default:
        navigate('selectRole');
    }
  }, [navigate])

  return (
    <RouterContext.Provider value={{ navigate, goBack, goHome }}>
      {children}
    </RouterContext.Provider>
  );
}