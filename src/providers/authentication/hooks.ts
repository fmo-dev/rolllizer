import { useContext } from "react";
import { AuthenticationContext } from "./context";

export const useAuthentication = () => useContext(AuthenticationContext);