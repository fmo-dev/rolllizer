import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AuthenticationContext } from "./context";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../router/constants";
import { User } from "./types";
import { UserProvider } from "../user/provider";
import { useRouter } from "../router/hooks";
import { useToastContext } from "../toast/hooks";
import { api } from "../api/constants";


export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation();
  const { navigate, goHome, setHomePath } = useRouter();
  const { addToast } = useToastContext();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const onLogin = useCallback(async () => {
    const authenticatedUser = await api.from('user').select('*').single<User>();
    setUser(authenticatedUser.data);
    const profile = authenticatedUser.data?.profile;
    setHomePath(profile || null);
    if (!profile) {
      navigate('selectRole');
    }
    else if (['/', `/${ROUTES.login.path}`].includes(pathname)) {
      goHome(profile);
    }
    setIsAuthLoading(false);
  }, [api, navigate, pathname, goHome, setHomePath]);

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
    try {
      const res = await api.auth.signInWithOtp({
        phone: phone
      });
      if (res.error) {
        throw new Error('Invalid phone number');
      }
    } catch (_error) {
      addToast('Une erreur est survenue, vérifier votre numéro de téléphone et réessayez.');
      throw _error;
    }
    return;
  }, [api, addToast]);

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

  const logout = useCallback(async () => {
    await api.auth.signOut();
    setUser(null);
    setIsAuthLoading(true);
    navigate('login');
  }, [api, navigate]);

  useEffect(() => { checkSession() }, [checkSession])

  return (
    <AuthenticationContext.Provider value={{ auth, sendOTP, user, isAuthLoading, logout }}>
      {user && (
        <UserProvider user={user}>
          {children}
        </UserProvider>
      )}
      {!user && children}
    </AuthenticationContext.Provider>
  );
}
