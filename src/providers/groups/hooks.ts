import { useContext } from "react";
import { GroupContext } from "./context";

export const useGroup = () => useContext(GroupContext);