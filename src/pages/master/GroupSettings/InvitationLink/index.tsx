import { GroupType } from "../../../../providers/groups/types";
import "./styles.scss";
import { useState } from "react";
import { useAPI } from "../../../../providers/api/hooks";
import { generateCode } from "./utils";
import { useToastContext } from "../../../../providers/toast/hooks";
import { InputLabel } from "@mui/material";
import { AppButton } from "../../../../shared/components/Button";

interface InvitationLinkProps {
  group: GroupType;
}

export const InvitationLink: React.FC<InvitationLinkProps> = ({ group }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [seeCode, setSeeCode] = useState(false);
  const [invitationCode, setInvitationCode] = useState<string | null>(group.invitation_code);
  const { addToast } = useToastContext();
  const api = useAPI();

  const onCreateCode = async () => {
    setIsLoading(true);
    try {
      const code = generateCode(group.id);
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 2);
      await api.from('group').update({ invitation_code: code, invitation_code_expiration_date: expirationDate }).eq('id', group.id);
      setInvitationCode(code);
      setSeeCode(true)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  const onCopyLink = () => {
    if (!invitationCode) return;
    navigator.clipboard.writeText(`${window.location.origin}/group/join/${invitationCode}`)
      .then(() => {
        addToast("Lien copié dans le presse-papier.");
      })
      .catch((error) => {
        console.error("Erreur lors de la copie du lien d'invitation : ", error);
      });
  }


  if (!invitationCode || !seeCode) {
    return (
      <>
        {!invitationCode && (
          <AppButton variant="contained" size="small" onClick={onCreateCode} loading={isLoading}>
            Créer un code d'invitation
          </AppButton>
        )}

        {invitationCode && (
          <AppButton variant="contained" size="small" onClick={() => setSeeCode(true)}>
            Voir le code d'invitation
          </AppButton>
        )}
      </>
    )
  }
  return (
    <div className="invitation-link-code">
      <InputLabel className="invitation-link-label">Code d'invitation</InputLabel>
      <div className="invitation-link-code-value">
        {invitationCode.split("").map((char => <span key={char} className="invitation-link-code-value-char">{char}</span>))}
      </div>
      <AppButton variant="text" onClick={onCopyLink} >
        Copier le lien
      </AppButton>
    </div>
  );
}
