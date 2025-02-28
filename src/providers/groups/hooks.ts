import { useContext } from "react";
import { GroupContext } from "./context";

export const useGroups = () => useContext(GroupContext);