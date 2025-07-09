import React, { useCallback, useEffect, useState } from "react";

import "./styles.scss";
import Check from '@mui/icons-material/Check';
import { Page } from "../../../shared/components/Page";
import { Content } from "../../../shared/components/Content";
import "./styles.scss"
import { Paper } from "@mui/material";
import { useToastContext } from "../../../providers/toast/hooks";
import { InvitationCodeInput } from "./InvitationCodeInput";
import { GroupToJoin } from "./types";
import { SelectPlayer } from "./SelectPlayer";
import { useRouter } from "../../../providers/router/hooks";
import { useAuthentication } from "../../../providers/authentication/hooks";
import { useGroups } from "../../../providers/groups/hooks";
import { useRouteParams } from "../../../providers/route-params/hooks";
import { api } from "../../../providers/api/constants";

export const JoinGroup: React.FC = () => {
  const [groupCode] = useRouteParams();
  const [code, setCode] = React.useState(groupCode || '');
  const { addToast } = useToastContext();
  const { refetchGroups, groups } = useGroups();
  const { user } = useAuthentication()
  const { goHome } = useRouter();
  const [isLoading, setIsLoading] = useState(!!groupCode);
  const [groupToJoin, setGroupToJoin] = useState<GroupToJoin | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  const onValidateCode = useCallback(async (code: string) => {
    setIsLoading(true);
    try {
      const { data: group } = await api.from('group').select('id, name, image_url').eq('invitation_code', code).single();
      if (!group?.id) {
        return addToast("Ce code d'invitation ne correspond à aucun groupe");
      }
      const existingPlayerGroupIds = groups.asPlayer.map(g => g.id);
      if (existingPlayerGroupIds.includes(group.id)) {
        return addToast("Vous faites déjà partie de ce groupe !");
      }
      const { data: players } = await api.from('player').select('id, player_name, user_id').eq('group_id', group?.id);
      if (!players?.length) {
        throw new Error("Aucun joueur trouvé pour ce groupe");
      } else {
        setGroupToJoin({ group, players });
      }
    } catch (error) {
      addToast("Une erreur est survenue lors de la récupération du groupe");
      console.error("Erreur lors de la récupération du groupe : ", error);
    }
    finally {
      setIsLoading(false);
    }
  }, [api, addToast]);

  useEffect(() => {
    if (groupCode) {
      onValidateCode(groupCode);
    }
  }, [groupCode, onValidateCode]);

  const onSelectPlayer = async (playerId: number) => {
    setIsLoading(true);
    try {
      const { error } = await api.from('player').update({ user_id: user?.id }).eq('id', playerId);
      if (error) {
        throw new Error('Une erreur est survenue')
      }
      await refetchGroups();
      addToast(`Vous avez rejoint ${groupToJoin?.group.name} !`);
      goHome(user!.profile);
    } catch (error) {
      addToast("Une erreur est survenue");
      console.error("Erreur lors de l'ajout du joueur au groupe : ", error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const onClick = async () => {
    if (!groupToJoin) {
      return onValidateCode(code);
    } else if (selectedPlayer !== null) {
      onSelectPlayer(selectedPlayer);
    }
  }
  return (
    <Page
      id="join-group-page"
      title='Rejoindre un groupe'
      footerAction={{
        icon: <Check />,
        onClick,
        disabled: groupToJoin ? !selectedPlayer : code.length !== 6,
        loading: isLoading,
      }}
    >
      <Content>
        <Paper className="join-group-paper">
          {!groupToJoin && <InvitationCodeInput value={code} onChange={setCode} disabled={isLoading} />}
          {groupToJoin && <SelectPlayer groupToJoin={groupToJoin} onChange={setSelectedPlayer} />}
        </Paper>
      </Content>
    </Page>
  );
}

// http://localhost:3000/player/join-group/DF3252