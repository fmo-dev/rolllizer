import { Home } from "../../pages/common/Home";
import Login from "../../pages/common/Login";
import { SelectRole } from "../../pages/common/SelectRole";
import { CreateGroup } from "../../pages/master/MasterHome/CreateGroup";

export const ROUTES = {
  login: {
    path: '/login',
    Component: Login
  },
  selectRole: {
    path: '/select-profile',
    Component: SelectRole
  },
  home: {
    path: '/',
    Component: Home
  },
  createGroup: {
    path: 'master/create-group',
    Component: CreateGroup
  }
}
