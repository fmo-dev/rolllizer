import { AuthResponse } from "@supabase/supabase-js";
import { createContext } from "react";

interface AuthenticationContextState {
  auth(phone: string): Promise<void>;
  sendOTP(phone: string, otp: string): Promise<AuthResponse>;
}

export const AuthenticationContext = createContext({} as AuthenticationContextState);