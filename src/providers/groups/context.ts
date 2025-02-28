import { createContext } from "react";
import { UserGroups } from "./types";

interface GroupContextState {
  groups: UserGroups;
}

export const GroupContext = createContext({} as GroupContextState);

