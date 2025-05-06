import React from "react";

import "./styles.scss";
import AddIcon from '@mui/icons-material/Add';
import { Page } from "../../../shared/components/Page";
import { useGroups } from "../../../providers/groups/hooks";
import { InfoText } from "../../../shared/components/InfoText";
import { Content } from "../../../shared/components/Content";
import { useRouter } from "../../../providers/router/hooks";
import { Group } from "../../../shared/components/Group";

export const PlayerHome: React.FC = () => {
  const { groups } = useGroups();
  const { navigate } = useRouter();

  return (
    <Page
      cantGoBack
      id="player-home-page"
      title='Tableau de bord du Joueur'
      footerAction={{
        icon: <AddIcon />,
        onClick: () => navigate('joinGroup'),
      }}
    >
      <Content>
        <div className="group-list">
          {groups.asPlayer?.map((group) => <Group key={group.id} group={group} />)}
        </div>
        {!groups.asPlayer?.length && (
          <InfoText>
            Vous n'avez pas encore rejoint de groupe. Appuyez sur le bouton ci-dessous pour en rejoindre un.
          </InfoText>
        )}

      </Content>
    </Page>
  );
}
