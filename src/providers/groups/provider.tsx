import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Group, UserGroups } from "./types";
import { useAPI } from "../api/hooks";
import { GroupContext } from "./context";
import { useUser } from "../user/hooks";

export const GroupContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const api = useAPI();
  const { user } = useUser();
  const [groups, setGroups] = useState<UserGroups>({
    asOwner: [],
    asPlayer: []
  });

  const getGroups = useCallback(async () => {
    if (user) {
      const res = await Promise.all([
        api.from('group').select('*, player(*)').eq('owner_id', user.id),
        api.from('group').select('*, player(*)').eq('player.user_id', user.id)
      ])
      const error = res.find(r => r.error)?.error
      if (error) {
        throw new Error(error.message)
      }
      setGroups({
        asOwner: res[0].data as Group[],
        asPlayer: res[1].data as Group[]
      });
    }
  }, [user, api])

  useEffect(() => { getGroups() }, [getGroups])

  return (
    <GroupContext.Provider value={{ groups }}>
      {children}
    </GroupContext.Provider>
  );
}
