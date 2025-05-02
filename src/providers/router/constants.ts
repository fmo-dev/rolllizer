import Login from "../../pages/common/Login";
import { Profile } from "../../pages/common/Profile";
import { SelectRole } from "../../pages/common/SelectRole";
import { GroupSettings } from "../../pages/master/GroupSettings";
import { MasterHome } from "../../pages/master/MasterHome";
import { JoinGroup } from "../../pages/player/JoinGroup";
import { PlayerHome } from "../../pages/player/PlayerHome";

export const ROUTES = {
  login: {
    path: 'login',
    Component: Login
  },
  selectRole: {
    path: 'select-profile',
    Component: SelectRole
  },
  masterHome: {
    path: 'master',
    Component: MasterHome
  },
  createGroup: {
    path: 'master/create-group',
    Component: GroupSettings
  },
  editGroup: {
    path: `master/edit-group/:1`,
    Component: GroupSettings
  },
  playerHome: {
    path: 'player',
    Component: PlayerHome
  },
  joinGroup: {
    path: 'player/join-group',
    Component: JoinGroup
  },
  joinSpecificGroup: {
    path: 'player/join-group/:1',
    Component: JoinGroup
  },
  profile: {
    path: 'profile',
    Component: Profile
  },
} as const
