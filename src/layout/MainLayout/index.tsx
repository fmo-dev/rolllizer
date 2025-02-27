import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

import "./styles.scss";
import { useAuthentication } from "../../providers/authentication/hooks";
import { Loader } from "../../shared/components/Loader";

export const MainLayout: React.FC<PropsWithChildren> = () => {
  const { isAuthLoading } = useAuthentication();
  return (
    <div className="main-layout">
      <div className="container">
        {isAuthLoading && <Loader />}
        {!isAuthLoading && <Outlet />}
      </div>
    </div>
  )
}
