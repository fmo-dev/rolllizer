import React, { PropsWithChildren } from "react";
import { User } from "./types";
import { AuthenticatedUserContext } from "./context";

interface AuthenticatedUserProviderProps extends PropsWithChildren {
  user: User;
}

export const AuthenticatedUserProvider: React.FC<AuthenticatedUserProviderProps> = ({ children, user }) => {
  return (
    <AuthenticatedUserContext.Provider value={{ user }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
