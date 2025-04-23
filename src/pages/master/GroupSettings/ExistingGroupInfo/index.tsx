import { GroupType } from "../../../../providers/groups/types";
import { AppButton } from "../../../../shared/components/Button";
import { InvitationLink } from "./InvitationLink";

interface ExistingGroupInfoProps {
  group: GroupType;
}

export const ExistingGroupInfo: React.FC<ExistingGroupInfoProps> = ({
  group
}) => {
  return (
    <>
      <InvitationLink group={group} />
      <AppButton variant="contained" color="error" onClick={() => { }}>
        Supprimer le groupe
      </AppButton>
    </>
  );
}