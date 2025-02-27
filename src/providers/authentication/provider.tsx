import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AuthenticationContext } from "./context";
import { useAPI } from "../api/hooks";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../router/constants";
import { User } from "./types";
import { UserProvider } from "../user/provider";
import { useRouter } from "../router/hooks";


export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const { navigate } = useRouter();
  const api = useAPI();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const onLogin = useCallback(async () => {
    const authenticatedUser = await api.from('user').select('*').single<User>();
    setUser(authenticatedUser.data);
    if (!authenticatedUser.data?.profile) {
      navigate('selectRole');
    }
    if (pathname === ROUTES.login.path) {
      navigate('home');
    }
    setIsAuthLoading(false);
  }, [api, navigate, pathname]);

  const checkSession = useCallback(async () => {
    const { data } = await api.auth.getSession();
    if (!data.session) {
      setIsAuthLoading(false);
      return navigate('login');
    }
    if (!data.session.user.phone) {
      api.auth.signOut()
      setIsAuthLoading(false);
      return navigate('login');
    }
    await api.auth.refreshSession();
    onLogin();
  }, [api, onLogin, navigate])

  const auth = useCallback(async (phone: string) => {
    const res = await api.auth.signInWithOtp({
      phone: phone
    });
    if (res.error) {
      throw new Error('Invalid phone number');
    }
    return;
  }, [api]);

  const sendOTP = useCallback(async (phone: string, otp: string) => {
    const { data } = await api.auth.verifyOtp({
      phone,
      token: otp,
      type: 'sms'
    });
    if (data.user) {
      await api.from('user').insert({ user_id: data.user.id });
      onLogin();
    } else throw new Error('Invalid OTP');
  }, [api, onLogin]);

  useEffect(() => { checkSession() }, [checkSession])

  return (
    <AuthenticationContext.Provider value={{ auth, sendOTP, user, isAuthLoading }}>
      {user && (
        <UserProvider user={user}>
          {children}
        </UserProvider>
      )}
      {!user && children}
    </AuthenticationContext.Provider>
  );
}
