import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AUTH_STORAGE_KEY } from "./constants";
import { AuthenticationContext } from "./context";
import { useAPI } from "../api/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../router/constants";


export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const api = useAPI();

  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTES.login.path)
    }
  }, [pathname, isAuth, navigate])

  const auth = useCallback(async (phone: string) => {
    await api.auth.signInWithOtp({
      phone: phone
    });
  }, [api]);

  const sendOTP = useCallback(async (phone: string, otp: string) => {
    const result = await api.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms'
    });
    if ('access_token' in result.data) {
      localStorage.setItem(AUTH_STORAGE_KEY, result.data.access_token as string);
      setIsAuth(true);
    }
  }, [api]);

  return (
    <AuthenticationContext.Provider value={{ isAuth, auth, sendOTP }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
