import { createContext } from "react";
import { User } from "./types";

interface AuthenticatedUserContextState {
  user: User;
}

export const AuthenticatedUserContext = createContext({} as AuthenticatedUserContextState);

