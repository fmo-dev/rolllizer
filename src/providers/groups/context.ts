import { createContext } from "react";
import { Group } from "./types";

interface GroupContextState {
  groups: Group[];
}

export const GroupContext = createContext({} as GroupContextState);

