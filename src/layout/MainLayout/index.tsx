import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

import "./styles.scss";

export const MainLayout: React.FC<PropsWithChildren> = () => {
  console.log('ojojj')
  return (
    <div className="main-layout">
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}
