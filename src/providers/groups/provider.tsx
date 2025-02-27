import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Group } from "./types";
import { useAPI } from "../api/hooks";
import { GroupContext } from "./context";
import { useUser } from "../user/hooks";

export const GroupContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const api = useAPI();
  const { user } = useUser();
  const [groups, setGroups] = useState<Group[]>([]);

  const getGroups = useCallback(async () => {
    if (user) {
      const res = await api.from('group').select(`*, player(group_id) p`).or(`"owner_id".eq.${user.id}, "user_id".eq.${user.id}`)
      console.log(res)
    }
  }, [user, api])

  useEffect(() => { getGroups() }, [getGroups])

  return (
    <GroupContext.Provider value={{ groups }}>
      {children}
    </GroupContext.Provider>
  );
}
