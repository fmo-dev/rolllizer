import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import "./styles.scss";
import { useAuthentication } from "../../providers/authentication/hooks";
import { Loader } from "../../shared/components/Loader";
import { Footer } from "../Footer";
import { cn } from "../../shared/utils";
import { HeaderContextProvider } from "../../providers/header/provider";

export const MainLayout: React.FC<PropsWithChildren> = () => {
  const { isAuthLoading, user } = useAuthentication();

  return (
    <div className="main-layout">
      <HeaderContextProvider>
        <div className={cn("main-layout-body", { "with-footer": !!user })}>
          <div className="main-layout-body-content">
            {isAuthLoading && <Loader />}
            {!isAuthLoading && <Outlet />}
          </div>
        </div>
        {user && <Footer />}
      </HeaderContextProvider >
    </div >
  )
}
