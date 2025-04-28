import React, { useState } from "react";

import "./styles.scss";
import Check from '@mui/icons-material/Check';
import { Page } from "../../../shared/components/Page";
import { Content } from "../../../shared/components/Content";
import "./styles.scss"
import { Paper } from "@mui/material";
import { useAPI } from "../../../providers/api/hooks";
import { useToastContext } from "../../../providers/toast/hooks";
import { Player } from "../../master/GroupSettings/PlayerInputs/types";
import { InvitationCodeInput } from "./InvitationCodeInput";
import { GroupType } from "../../../providers/groups/types";
export const JoinGroup: React.FC = () => {
  const api = useAPI();
  const [code, setCode] = React.useState('');
  const { addToast } = useToastContext();
  const [isLoading, setIsLoading] = useState(false);
  const [group, setGroup] = useState<Partial<GroupType>>();
  const [players, setPlayers] = useState<Partial<Player>[]>();
  const [isFocused, setIsFocused] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      const { data: group } = await api.from('group').select('id, name').eq('invitation_code', code).single();
      if (!group?.id) {
        return addToast("Ce code d'invitation ne correspond à aucun groupe");
      }
      const { data: players } = await api.from('player').select('id, name, user_id').eq('group_id', group?.id);
      if (!players?.length) {
        throw new Error("Aucun joueur trouvé pour ce groupe");
      } else {
        setGroup(group);
        setPlayers(players);
      }
    } catch (error) {
      addToast("Une erreur est survenue lors de la récupération du groupe");
      console.error("Erreur lors de la récupération du groupe : ", error);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <Page
      id="join-group-page"
      title='Rejoindre un groupe'
      footerAction={{
        icon: <Check />,
        onClick,
        disabled: code.length !== 6,
        loading: isLoading,
      }}
    >
      <Content>
        <Paper className="join-group-paper">
          <InvitationCodeInput value={code} onChange={setCode} />
        </Paper>
      </Content>
    </Page>
  );
}
