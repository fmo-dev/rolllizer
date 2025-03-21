import React from "react";

import "./styles.scss";
import { Page } from "../../../shared/components/Page";
import { useGroups } from "../../../providers/groups/hooks";
import { InfoText } from "../../../shared/components/InfoText";
import { CreateGroupButton } from "./CreateGroupButton";

export const MasterHome: React.FC = () => {
  const { groups } = useGroups();

  const createGroupButtonRender = (
    <div className="no-group">
      {!groups.asOwner?.length && (
        <InfoText>
          Vous n'avez pas encore créé de groupe. Appuyez sur le bouton ci-dessous pour en créer un.
        </InfoText>
      )}
      <CreateGroupButton />
    </div>
  )

  return (
    <Page cantGoBack id="master-home-page" title='Tableau de bord du MJ'>
      {createGroupButtonRender}
    </Page>
  );
}