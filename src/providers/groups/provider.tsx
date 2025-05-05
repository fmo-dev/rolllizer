import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { GroupType, UserGroups } from "./types";
import { useAPI } from "../api/hooks";
import { GroupContext } from "./context";
import { useUser } from "../user/hooks";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export const GroupContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const api = useAPI();
  const { user } = useUser();
  const [areGroupInitialized, setAreGroupInitialized] = useState(false);
  const [groups, setGroups] = useState<UserGroups>({
    asOwner: [],
    asPlayer: []
  });

  const getGroupQuery = useCallback(() => (
    api.from('group').select('*, player(*)').order('created_at', {
      referencedTable: 'player'
    })
  ), [api]);

  const getGroupAsPlayer = useCallback(async () => {
    if (user) {
      const res = await api.from('player').select('group_id').eq('user_id', user.id);
      const error = res.error
      if (error) {
        throw new Error(error.message)
      }
      const groupIds = res.data.map(({ group_id }) => group_id);
      return getGroupQuery().in('id', groupIds);
    }
    return { data: [] } as unknown as PostgrestSingleResponse<GroupType>;
  }, [user, api, getGroupQuery]);

  const fetchGroups = useCallback(async () => {
    if (user) {
      const res = await Promise.all([
        getGroupQuery().eq('owner_id', user.id),
        getGroupAsPlayer()
      ])
      const error = res.find(r => r.error)?.error
      if (error) {
        throw new Error(error.message)
      }
      setAreGroupInitialized(true);
      setGroups({
        asOwner: res[0].data as GroupType[],
        asPlayer: res[1].data as GroupType[]
      });
    }
  }, [user, getGroupAsPlayer, getGroupQuery]);


  useEffect(() => { fetchGroups() }, [fetchGroups])


  return (
    <GroupContext.Provider value={{ groups, refetchGroups: fetchGroups, areGroupInitialized }}>
      {children}
    </GroupContext.Provider>
  );
}
