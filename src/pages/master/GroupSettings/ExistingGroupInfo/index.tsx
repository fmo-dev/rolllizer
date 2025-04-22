import { GroupType } from "../../../../providers/groups/types";
import { AppButton } from "../../../../shared/components/Button";

interface ExistingGroupInfoProps {
  group: GroupType;
}

export const ExistingGroupInfo: React.FC<ExistingGroupInfoProps> = () => {
  return (
    <div>
      <AppButton variant="contained" color="error" onClick={() => { }}>
        Supprimer le groupe
      </AppButton>
    </div>
  );
}