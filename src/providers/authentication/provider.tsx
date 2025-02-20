import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AuthenticationContext } from "./context";
import { useAPI } from "../api/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../router/constants";
import { User } from "./types";


export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const api = useAPI();
  const [user, setUser] = useState<User | null>(null);

  const onLogin = useCallback(async (phone: string) => {
    const authenticatedUser = await api.from('user').select('*').eq('phone', phone).single<User>();
    console.log(authenticatedUser);
    setUser(authenticatedUser.data);
    if (pathname === ROUTES.login.path) {
      navigate(ROUTES.home.path);
    }
  }, [api, navigate, pathname]);

  const checkSession = useCallback(async () => {
    const { data } = await api.auth.getSession();
    if (!data.session) {
      return navigate(ROUTES.login.path);
    }
    const phone = data.session.user.phone;
    if (!phone) {
      api.auth.signOut()
      return navigate(ROUTES.login.path);
    }
    await api.auth.refreshSession();
    onLogin(phone);
  }, [api, onLogin, navigate])

  useEffect(() => { checkSession() }, [checkSession])

  const auth = useCallback(async (phone: string) => {
    await api.auth.signInWithOtp({
      phone: phone
    });
  }, [api]);

  const sendOTP = useCallback(async (phone: string, otp: string) => {
    const { data } = await api.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms'
    });
    if (data.user) {
      await api.from('user').insert({ phone });
      onLogin(phone);
    }
  }, [api, onLogin]);

  return (
    <AuthenticationContext.Provider value={{ auth, sendOTP, user }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
