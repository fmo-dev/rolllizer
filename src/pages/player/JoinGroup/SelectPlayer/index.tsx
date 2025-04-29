import { InputLabel } from "@mui/material";
import { GroupToJoin } from "../types";

import "./styles.scss";
import { cn } from "../../../../shared/utils";
import { useState } from "react";

interface SelectPlayerProps {
  groupToJoin: GroupToJoin;
  onChange(id: number): void;
}

export const SelectPlayer: React.FC<SelectPlayerProps> = ({
  groupToJoin,
  onChange
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  const onPlayerSelect = (id: number) => {
    onChange(id);
    setSelectedPlayer(id);
  }


  return (
    <div className="select-player">
      <h1>Rejoindre <br />{groupToJoin.group.name}</h1>
      <InputLabel>Qui êtes-vous ?</InputLabel>
      <div className="players-list">
        {groupToJoin.players.map(({ id, player_name, user_id }) => (
          <div
            key={id}
            className={cn("player-item", !!user_id && 'disabled', selectedPlayer === id && 'selected')}
            onClick={() => onPlayerSelect(id)}
          >
            {player_name}
          </div>
        ))}
      </div>
    </div>
  );
}