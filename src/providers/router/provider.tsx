import { PropsWithChildren, useCallback, useRef } from "react";
import { ROUTES } from "./constants";
import { RouterContext } from "./context";
import { useNavigate } from "react-router-dom";
import { NavigateFn } from "./types";
import { UserProfile } from "../user/types";

export const RouterContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const _navigate = useNavigate();
  const historyRef = useRef<string[]>([]);
  const homePathRef = useRef<keyof typeof ROUTES>("selectRole");

  const navigate: NavigateFn = useCallback((pathName, ...params) => {
    let path: string = ROUTES[pathName].path;
    params?.forEach((param) => path = path.replace(/:[0-9]/, `${param}`));
    historyRef.current.push(path);
    _navigate(path);
  }, [_navigate]);

  const goHome = useCallback(() => {
    navigate(homePathRef.current);
  }, [navigate])

  const goBack = useCallback(() => {
    if (historyRef.current.length === 0) {
      return goHome();
    };
    historyRef.current.pop();
    _navigate(-1)
  }, [_navigate, goHome]);

  const setHomePath = useCallback((profile: UserProfile | null) => {
    switch (profile) {
      case 'master':
        homePathRef.current = 'masterHome';
        break;
      case 'player':
        homePathRef.current = 'playerHome';
        break;
      default:
        homePathRef.current = 'selectRole';
        break;
    }
  }, []);


  return (
    <RouterContext.Provider value={{ navigate, goBack, goHome, setHomePath }}>
      {children}
    </RouterContext.Provider>
  );
}