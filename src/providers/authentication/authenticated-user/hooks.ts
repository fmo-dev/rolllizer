import { useContext } from "react";
import { AuthenticatedUserContext } from "./context";

export const useAuthenticatedUser = () => useContext(AuthenticatedUserContext);