import { createContext } from "react";
import { UserGroups } from "./types";

interface GroupContextState {
  groups: UserGroups;
  refetchGroups: () => Promise<void>;
}

export const GroupContext = createContext({} as GroupContextState);

