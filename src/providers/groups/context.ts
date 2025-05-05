import { createContext } from "react";
import { UserGroups } from "./types";

interface GroupContextState {
  groups: UserGroups;
  refetchGroups: () => Promise<void>;
  areGroupInitialized: boolean;
}

export const GroupContext = createContext({} as GroupContextState);

