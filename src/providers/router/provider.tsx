import { useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../layout/MainLayout";
import { ROUTES } from "./constants";
import { RouterContext } from "./context";
import { useNavigate } from "react-router-dom";

export const RouterContextProvider = () => {
  const _navigate = useNavigate();

  const navigate = useCallback((path: keyof typeof ROUTES) => {
    _navigate(ROUTES[path].path);
  }, [_navigate]);

  const routes = Object.values(ROUTES).map(({ path, Component }) => (
    <Route key={path} path={`/${path}`} element={<Component />} />
  ));


  return (
    <RouterContext.Provider value={{ navigate }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
      </Routes>
    </RouterContext.Provider>
  );
}