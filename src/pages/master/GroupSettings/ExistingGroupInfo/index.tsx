import { GroupType } from "../../../../providers/groups/types";
import { AppButton } from "../../../../shared/components/Button";
import { GameDates } from "./GameDates";

interface ExistingGroupInfoProps {
  group: GroupType;
}

export const ExistingGroupInfo: React.FC<ExistingGroupInfoProps> = ({
  group
}) => {


  return (
    <>
      <GameDates group={group} />
      <AppButton variant="contained" color="error" onClick={() => { }}>
        Supprimer le groupe
      </AppButton>
    </>
  );
}