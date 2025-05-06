import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import "./styles.scss";
import { useAuthentication } from "../../providers/authentication/hooks";
import { Loader } from "../../shared/components/Loader";
import { HeaderContextProvider } from "../../providers/header/provider";
import { FooterContextProvider } from "../../providers/footer/provider";
import { useGroups } from "../../providers/groups/hooks";

export const MainLayout: React.FC<PropsWithChildren> = () => {
  const { isAuthLoading, user } = useAuthentication();
  const { areGroupInitialized } = useGroups();

  const isLoading = isAuthLoading || (!!user && !areGroupInitialized);

  return (
    <div className="main-layout">
      <HeaderContextProvider>
        <FooterContextProvider>
          <div className="main-layout-body">
            <div className="main-layout-body-content">
              {isLoading && <Loader />}
              {!isLoading && <Outlet />}
            </div>
          </div>
        </FooterContextProvider>
      </HeaderContextProvider >
    </div >
  )
}
