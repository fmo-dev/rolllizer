import DeleteIcon from "@mui/icons-material/Delete"
import { Button, IconButton, InputLabel } from "@mui/material";
import { useState } from "react";
import "./styles.scss";
import { AppInput } from "../../../../shared/components/Input";
import { Player } from "./types";

interface PlayerInputsProps {
  onChange(players: string[]): void;
  value: string[];
}

export const PlayerInputs: React.FC<PlayerInputsProps> = ({
  value,
  onChange
}) => {
  const [players, setPlayers] = useState<Player[]>(!value.length ? (
    [{ id: 0, name: '' }]
  ) : value.map((name, id) => ({ id, name })));

  const updatePlayers = (newValue: Player[]) => {
    setPlayers(newValue);
    onChange(newValue.map(({ name }) => name || null).filter(Boolean) as string[]);
  }

  const addPlayer = () => {
    updatePlayers([...players, { id: Date.now(), name: '' }]);
  };

  const removePlayer = (id: number) => {
    if (players.length > 1) {
      updatePlayers(players.filter((player) => player.id !== id));
    } else {
      updatePlayers([{ id: 0, name: '' }]);
    }
  };

  const updatePlayerName = (id: number, value: string) => {
    updatePlayers(players.map((player) =>
      player.id === id ? { ...player, name: value } : player
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
            value={player.name}
            onChange={({ target }) => updatePlayerName(player.id, target.value)}
          />
          {(players.length > 1 || players[0]?.name != '') && (
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