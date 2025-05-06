import { Paper } from "@mui/material";
import './styles.scss'
import { useRouter } from "../../../providers/router/hooks";
import { GroupType } from "../../../providers/groups/types";
import { AppImage } from "../Image";
import { AppButton } from "../Button";

interface GroupProps {
  group: GroupType;
  asOwner?: boolean;
}

export const Group: React.FC<GroupProps> = ({ group, asOwner }) => {
  const { navigate } = useRouter();

  const handleClick = () => {
    if (asOwner) {
      navigate('editGroup', group.id);
    }
  }

  return (
    <Paper className="group" variant="outlined" onClick={handleClick}>
      <h2 className="group-name">{group.name}</h2>
      {group.image_url && <AppImage path={group.image_url} alt={group.name} />}
      <AppButton variant="contained">
        {asOwner && "Gérer le groupe"}
        {!asOwner && "Voir le groupe"}
      </AppButton>
    </Paper>
  )
} 