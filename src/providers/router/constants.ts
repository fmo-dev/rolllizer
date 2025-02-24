import Login from "../../pages/common/Login";
import { SelectRole } from "../../pages/common/SelectRole";

export const ROUTES = {
  login: {
    path: '/login',
    Component: Login
  },
  SelectRole: {
    path: '/select-profile',
    Component: SelectRole
  },
  home: {
    path: '/',
    Component: Login
  }
}