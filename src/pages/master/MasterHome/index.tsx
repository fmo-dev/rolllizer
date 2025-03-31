import React from "react";

import "./styles.scss";
import { Page } from "../../../shared/components/Page";
import { useGroups } from "../../../providers/groups/hooks";
import { InfoText } from "../../../shared/components/InfoText";
import { CreateGroupButton } from "./CreateGroupButton";
import { Group } from "./Group";
import { cn } from "../../../shared/utils";

export const MasterHome: React.FC = () => {
  const { groups } = useGroups();

  const createGroupButtonRender = (
    <div className={cn("button-container", { "no-group": !groups.asOwner?.length })}>
      {!groups.asOwner?.length && (
        <InfoText className="no-groups-text">
          Vous n'avez pas encore créé de groupe. Appuyez sur le bouton ci-dessous pour en créer un.
        </InfoText>
      )}
      <CreateGroupButton />
    </div>
  )

  return (
    <Page cantGoBack id="master-home-page" title='Tableau de bord du MJ'>
      <div className="group-list">
        {groups.asOwner?.map((group) => <Group key={group.id} group={group} />)}
      </div>
      {createGroupButtonRender}
    </Page>
  );
}