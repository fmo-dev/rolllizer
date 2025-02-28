import React from "react";

import "./styles.scss";
import { Page } from "../../../shared/components/Page";
import { AppButton } from "../../../shared/components/Button";
import { useRouter } from "../../../providers/router/hooks";
import { useGroups } from "../../../providers/groups/hooks";
import { InfoText } from "../../../shared/components/InfoText";
import { CreateGroupButton } from "./CreateGroupButton";

export const MasterHome: React.FC = () => {
  const { navigate } = useRouter();
  const { groups } = useGroups();

  const noGroupRender = (
    <div className="no-group">
      <InfoText>
        Vous n'avez pas encore créé de groupe. Appuyez sur le bouton ci-dessus pour en créer un.
      </InfoText>
      <CreateGroupButton />
    </div>
  )

  return (
    <Page id="master-home-page" title='Tableau de bord du MJ'>
      {noGroupRender}
    </Page>
  );
}