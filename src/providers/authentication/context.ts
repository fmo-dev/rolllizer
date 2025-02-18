import { createContext } from "react";

interface AuthenticationContextState {
  isAuth: boolean;
  auth(phone: string): Promise<void>;
  sendOTP(phone: string, otp: string): Promise<void>;
}

export const AuthenticationContext = createContext({} as AuthenticationContextState);