import { useUser } from "../../../providers/user/hooks"
import { MasterHome } from "../../master/MasterHome";
import { PlayerHome } from "../../player/PlayerHome";
import { SelectRole } from "../SelectRole";

export const Home: React.FC = () => {
  const { user } = useUser();

  switch (user?.profile) {
    case 'master':
      return <MasterHome />;
    case 'player':
      return <PlayerHome />;
    default:
      return <SelectRole />;
  }
}