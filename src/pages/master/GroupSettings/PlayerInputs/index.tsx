import DeleteIcon from "@mui/icons-material/Delete"
import { Button, IconButton, InputLabel } from "@mui/material";
import { useState } from "react";
import "./styles.scss";
import { AppInput } from "../../../../shared/components/Input";

export const PlayerInputs = () => {
  const [players, setPlayers] = useState([{ id: 0, name: '' }]);

  const addPlayer = () => {
    setPlayers([...players, { id: Date.now(), name: '' }]);
  };

  const removePlayer = (id: number) => {
    if (players.length > 1) {
      setPlayers(players.filter((player) => player.id !== id));
    } else {
      setPlayers([{ id: 0, name: '' }]);
    }
  };

  const updatePlayer = (id: number, value: string) => {
    setPlayers((previousValue) =>
      previousValue.map((player) =>
        player.id === id ? { ...player, name: value } : player
      )
    );
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
            onChange={({ target }) => updatePlayer(player.id, target.value)}
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