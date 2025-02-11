import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../shared/layouts/MainLayout";
import { ROUTES } from "./constants";

export const Router = () => {
  const routes = Object.values(ROUTES).map(({ path, Component }) => (
    <Route key={path} path={`/${path}`} element={<Component />} />
  ));

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routes}
      </Route>
    </Routes>
  );
}