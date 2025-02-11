import { createContext } from "react";

interface AuthenticationContextState {
  isAuth: boolean;
  auth(input: string): Promise<void>;
  phoneNumber: string;
}

export const AuthenticationContext = createContext({} as AuthenticationContextState);