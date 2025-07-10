import { ForceAddDate } from "./ForceAddDate";
import { GroupType } from "../../../../../providers/groups/types";
import "./styles.scss";
import { InputLabel } from "@mui/material";
import { api } from "../../../../../providers/api/constants";

interface GameDatesProps {
  group: GroupType;
}

export const GameDates: React.FC<GameDatesProps> = ({ group }) => {
  const onAddDate = async (date: Date) => {
    const res = await api.from('game_date').insert({
      group_id: group.id,
      date: date.toISOString()
    });
    const error = res.error;
    if (error) {
      throw new Error(error.message);
    }
  }

  return (
    <div className="game-dates">
      <InputLabel className="invitation-link-label">Prochaines parties</InputLabel>
      <ForceAddDate onChange={onAddDate} group={group} />
    </div>
  );
}
