import React, { PropsWithChildren, useCallback, useEffect } from "react";
import { AuthenticationContext } from "./context";
import { useAPI } from "../api/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../router/constants";


export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const api = useAPI();

  const checkSession = useCallback(async () => {
    const { data } = await api.auth.getSession();
    if (!data.session) {
      return navigate(ROUTES.login.path);
    }
    api.auth.refreshSession();
    if (pathname === ROUTES.login.path) {
      navigate(ROUTES.home.path);
    }
  }, [api, navigate, pathname])

  useEffect(() => { checkSession() }, [checkSession])

  const auth = useCallback(async (phone: string) => {
    await api.auth.signInWithOtp({
      phone: phone
    });
  }, [api]);

  const sendOTP = useCallback((phone: string, otp: string) => (
    api.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms',
      options: {
        redirectTo: ROUTES.home.path
      }
    })
  ), [api]);

  return (
    <AuthenticationContext.Provider value={{ auth, sendOTP }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
