import { createContext } from "react";
import { User } from "./types";

interface AuthenticationContextState {
  auth(phone: string): Promise<void>;
  sendOTP(phone: string, otp: string): Promise<void>;
  user: User | null;
}

export const AuthenticationContext = createContext({} as AuthenticationContextState);