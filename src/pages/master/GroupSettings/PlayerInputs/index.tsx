import DeleteIcon from "@mui/icons-material/Delete"
import { Button, IconButton, InputLabel } from "@mui/material";
import { useState } from "react";
import "./styles.scss";
import { AppInput } from "../../../../shared/components/Input";
import { GroupPlayer } from "../../../../providers/groups/types";
import { getDefaultPlayer } from "./utils";

interface PlayerInputsProps {
  onChange(players: GroupPlayer[]): void;
  value: GroupPlayer[];
}

export const PlayerInputs: React.FC<PlayerInputsProps> = ({
  value,
  onChange
}) => {
  const [players, setPlayers] = useState(!value.length ? [getDefaultPlayer()] : value);

  const updatePlayers = (newValue: GroupPlayer[]) => {
    setPlayers(newValue);
    onChange(newValue.filter((player) => player.player_name));
  }

  const addPlayer = () => {
    updatePlayers([...players, getDefaultPlayer()]);
    setTimeout(() => {
      const inputs = document.querySelectorAll('.player-inputs .player input') as NodeListOf<HTMLInputElement>;
      inputs[inputs.length - 1]?.focus();
    })
  };

  const removePlayer = (id: number) => {
    if (players.length > 1) {
      updatePlayers(players.filter((player) => player.id !== id));
    } else {
      updatePlayers([getDefaultPlayer()]);
    }
  };

  const updatePlayerName = (id: number, value: string) => {
    updatePlayers(players.map((player) =>
      player.id === id ? { ...player, player_name: value } : player
    ));
  };

  return (
    <div className="player-inputs">
      <InputLabel>Joueurs</InputLabel>
      {players.map((player) => (
        <div key={player.id} className="player">
          <AppInput
            size="small"
            placeholder="Nom du joueur"
            value={player.player_name}
            onChange={({ target }) => updatePlayerName(player.id, target.value)}
          />
          {(players.length > 1 || players[0]?.player_name != '') && (
            <IconButton className="delete-player-button" onClick={() => removePlayer(player.id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ))}
      <Button onClick={addPlayer}>Ajouter un joueur</Button>
    </div>
  );
};