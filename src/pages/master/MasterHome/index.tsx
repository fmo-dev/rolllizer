import React from "react";

import "./styles.scss";
import AddIcon from '@mui/icons-material/Add';
import { Page } from "../../../shared/components/Page";
import { useGroups } from "../../../providers/groups/hooks";
import { InfoText } from "../../../shared/components/InfoText";
import { Content } from "../../../shared/components/Content";
import { useRouter } from "../../../providers/router/hooks";
import { Group } from "../../../shared/components/Group";

export const MasterHome: React.FC = () => {
  const { groups } = useGroups();
  const { navigate } = useRouter();

  return (
    <Page
      cantGoBack
      id="master-home-page"
      title='Tableau de bord du MJ'
      footerAction={{
        icon: <AddIcon />,
        onClick: () => navigate('createGroup'),
      }}
    >
      <Content>
        <div className="group-list">
          {groups.asOwner?.map((group) => <Group key={group.id} group={group} asOwner />)}
        </div>
        {!groups.asOwner?.length && (
          <InfoText>
            Vous n'avez pas encore créé de groupe. Appuyez sur le bouton ci-dessous pour en créer un.
          </InfoText>
        )}

      </Content>
    </Page>
  );
}