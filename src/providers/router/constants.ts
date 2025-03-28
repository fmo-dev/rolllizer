import { Home } from "../../pages/common/Home";
import Login from "../../pages/common/Login";
import { SelectRole } from "../../pages/common/SelectRole";
import { GroupSettings } from "../../pages/master/GroupSettings";

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
    Component: GroupSettings
  },
  editGroup: {
    path: `master/edit-group/:1`,
    Component: GroupSettings
  }
} as const
