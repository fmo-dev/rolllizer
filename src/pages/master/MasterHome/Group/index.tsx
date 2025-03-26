import { GroupType } from "../../../../providers/groups/types";
import { useRouter } from "../../../../providers/router/hooks";

interface GroupProps {
  group: GroupType;
}

export const Group: React.FC<GroupProps> = ({ group }) => {
  const { navigate } = useRouter();

  const handleClick = () => {
    navigate(`/group/${group.id}`);
  }

  return group.name
} 