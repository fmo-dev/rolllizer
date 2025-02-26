import React from "react";

import "./styles.scss";
import { Page } from "../../../shared/components/Page";
import { AppButton } from "../../../shared/components/Button";
import { useRouter } from "../../../providers/router/hooks";

export const MasterHome: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <Page id="master-home-page" title='Tableau de bord du MJ'>
      <AppButton
        id="create-group-button"
        variant="outlined"
        onClick={() => navigate('createGroup')}
      >
        Créer un groupe
      </AppButton>
    </Page>
  );
}