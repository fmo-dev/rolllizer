import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AUTH_STORAGE_KEY } from "./constants";
import { AuthenticationContext } from "./context";
import { useAPI } from "../api/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../router/constants";


export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const api = useAPI();

  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTES.login.path)
    }
  }, [pathname, isAuth, navigate])

  const auth = useCallback(async () => {
    await api.auth.signInWithOtp({
      phone: '+33633083852'
    });
  }, [api]);

  return (
    <AuthenticationContext.Provider value={{ isAuth, auth, phoneNumber }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
