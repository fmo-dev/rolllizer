import { createContext } from "react";
import { User } from "./types";

interface UserContextState {
  user: User;
  updateUser: (newUser: Partial<User>) => Promise<void>;
}

export const UserContext = createContext({} as UserContextState);

