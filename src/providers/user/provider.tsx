import React, { PropsWithChildren } from "react";
import { User } from "./types";
import { UserContext } from "./context";
import { useAPI } from "../api/hooks";

interface UserProviderProps extends PropsWithChildren {
  user: User;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, user }) => {
  const api = useAPI();

  const updateUser = async (newUser: Partial<User>) => {
    const res = await api.from('user').update(newUser).eq('id', user.id)
    if (res.error) {
      throw new Error(res.error.message);
    }
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
