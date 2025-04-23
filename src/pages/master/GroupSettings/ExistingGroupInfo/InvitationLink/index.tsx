import { InputLabel } from "@mui/material";
import { GroupType } from "../../../../../providers/groups/types";
import "./styles.scss";
import { useEffect, useState } from "react";
import { AppButton } from "../../../../../shared/components/Button";
import { useAPI } from "../../../../../providers/api/hooks";
import { generateCode } from "./utils";

interface InvitationLinkProps {
  group: GroupType;
}

export const InvitationLink: React.FC<InvitationLinkProps> = ({ group }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [invitationCode, setInvitationCode] = useState<string | null>(group.invitation_code);
  const api = useAPI();

  const onCreateLink = async () => {
    setIsLoading(true);
    try {
      const code = generateCode(group.id);
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 2);
      await api.from('group').update({ invitation_code: code, invitation_code_expiration_date: expirationDate }).eq('id', group.id);
      setInvitationCode(code);
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="invitation-link">
      {!group.invitation_code && (
        <AppButton variant="contained" size="small" onClick={onCreateLink} loading={isLoading}>
          Créer un lien d'invitation
        </AppButton>
      )}
      {/* {group.invitation_code && (
          
        )} */}
    </div>
  );
}
