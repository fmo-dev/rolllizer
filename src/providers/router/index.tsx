import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../layout/MainLayout";
import { ROUTES } from "./constants";
import { RouteParamsContextProvider } from "../route-params/provider";

export const Router: React.FC = () => {
  const routes = Object.values(ROUTES).map(({ path, Component }) => (
    <Route key={path} path={`/${path}`} element={<Component />} />
  ));

  return (
    <Routes>
      <Route path="/" element={(
        <RouteParamsContextProvider>
          <MainLayout />
        </RouteParamsContextProvider>
      )}>
        {routes}
      </Route>
    </Routes>
  )
}