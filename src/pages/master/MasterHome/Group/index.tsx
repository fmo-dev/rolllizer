import { Paper } from "@mui/material";
import { GroupType } from "../../../../providers/groups/types";
import { useRouter } from "../../../../providers/router/hooks";
import { AppButton } from "../../../../shared/components/Button";
import { AppImage } from "../../../../shared/components/Image";
import './styles.scss'

interface GroupProps {
  group: GroupType;
}

export const Group: React.FC<GroupProps> = ({ group }) => {
  const { navigate } = useRouter();

  const handleClick = () => {
    navigate('editGroup', group.id);
  }

  return (
    <Paper className="group" variant="outlined" onClick={handleClick}>
      <h2 className="group-name">{group.name}</h2>
      {group.image_url && <AppImage path={group.image_url} alt={group.name} />}
      <AppButton variant="contained">Gérer le groupe</AppButton>
    </Paper>
  )
} 