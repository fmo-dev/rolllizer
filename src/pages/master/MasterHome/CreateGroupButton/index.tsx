import { useRouter } from "../../../../providers/router/hooks";
import { AppButton, AppButtonProps } from "../../../../shared/components/Button";

export const CreateGroupButton: React.FC<AppButtonProps> = (props) => {
  const { navigate } = useRouter();

  return (
    <AppButton
      id="create-group-button"
      variant="contained"
      onClick={() => navigate('createGroup')}
      {...props}
    >
      Créer un groupe
    </AppButton>
  );
}