import Login from "../../pages/common/Login";
import { SelectProfile } from "../../pages/common/SelectProfile";

export const ROUTES = {
  login: {
    path: '/login',
    Component: Login
  },
  selectProfile: {
    path: '/select-profile',
    Component: SelectProfile
  },
  home: {
    path: '/',
    Component: Login
  }
}