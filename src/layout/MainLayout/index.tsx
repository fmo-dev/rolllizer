import React, { PropsWithChildren } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import PersonIcon from '@mui/icons-material/Person';
import "./styles.scss";
import { useAuthentication } from "../../providers/authentication/hooks";
import { Loader } from "../../shared/components/Loader";

export const MainLayout: React.FC<PropsWithChildren> = () => {
  const { isAuthLoading } = useAuthentication();
  const location = useLocation();

  console.log(location)
  return (
    <div className="main-layout">
      <div className="main-layout-body">
        <div className="main-layout-body-content">
          {isAuthLoading && <Loader />}
          {!isAuthLoading && <Outlet />}
        </div>
      </div>
      <Paper className="main-layout-footer" elevation={3}>
        <BottomNavigation >
          <BottomNavigationAction label="Recents" icon={<CasinoIcon />} />
          <BottomNavigationAction label="Favorites" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </div>
  )
}
