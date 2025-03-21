import { useEffect, useState } from "react";
import { Group } from "../../../providers/groups/types";
import { Page } from "../../../shared/components/Page";
import { useParams } from "react-router-dom";
import { useGroups } from "../../../providers/groups/hooks";
import { useRouter } from "../../../providers/router/hooks";
import { Loader } from "../../../shared/components/Loader";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField, Typography } from "@mui/material";

import "./styles.scss";
import { ImageInput } from "../../../shared/components/Input/ImageInput";
import { AppButton } from "../../../shared/components/Button";
import { useAPI } from "../../../providers/api/hooks";
import { useUser } from "../../../providers/user/hooks";
import { PlayerInputs } from "./PlayerInputs";

export const GroupSettings: React.FC = () => {
  const api = useAPI();
  const { user } = useUser();
  const { navigate } = useRouter();
  const { groupId } = useParams<{ groupId?: string }>();
  const { groups } = useGroups();
  const [group, setGroup] = useState<Partial<Group> | null>(null);
  const [name, setName] = useState<string>('');
  const [players, setPlayers] = useState<string[]>([]);
  const [hasNameBeenBlurred, setHasNameBeenBlurred] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isWarningModalOpened, setIWarningModalOpened] = useState(false);

  useEffect(() => {
    if (groupId) {
      const currentGroup = groups.asOwner.find(({ id }) => id.toString() === groupId);
      if (!currentGroup) {
        navigate('home');
      } else {
        setGroup(currentGroup);
        setName(currentGroup.name);
      }
    }
  }, [groupId, groups.asOwner, navigate]);

  const isLoading = !!groupId && !group

  const onSubmit = async (validateWithoutPlayer?: boolean) => {
    if (!players.length && !validateWithoutPlayer) {
      setIWarningModalOpened(true);
      return;
    }
    const groupData = {
      ...(groupId ? { id: groupId } : {}),
      owner_id: user.id,
      name
    }
    const { data } = await api.from('group').upsert(groupData).select('id');
    const id = data?.[0].id;
    if (id && image) {
      const { data } = await api.storage.from('images').upload(`group-${id}`, image, { upsert: true });
      if (data?.fullPath) {
        await api.from('group').update({ image_url: data.fullPath }).eq('id', id);
      }
    }
  }

  const isFormDisabled = name.length === 0 || isLoading;

  if (isLoading) {
    return <Loader />
  }
  return (
    <Page id="group-settings-page" title={group ? "Gérer un groupe" : "Créer un groupe"}>
      <form className='form' onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}>
        <div className="form-content">
          <TextField
            label="Nom du groupe"
            required
            className="name-field"
            value={name}
            onChange={({ target }) => setName(target.value)}
            onBlur={() => setHasNameBeenBlurred(true)}
            error={hasNameBeenBlurred && name.length === 0}
            helperText={hasNameBeenBlurred && name.length === 0 ? 'Le nom du groupe est requis' : ''}
          />
          <div className="image-field">
            <InputLabel>Image du groupe</InputLabel>
            <ImageInput value={image} onChange={setImage} />
          </div>
          <PlayerInputs value={players} onChange={setPlayers} />
        </div>
        <AppButton className="submit-button" variant="contained" type="submit" disabled={isFormDisabled}>
          Valider
        </AppButton>
      </form>
      <Dialog
        open={isWarningModalOpened}
        onClose={() => setIWarningModalOpened(false)}
      >
        <DialogTitle style={{ fontSize: 16 }} >
          Ce groupe ne contient aucun joueur
        </DialogTitle>
        <DialogContent style={{ fontSize: 15 }} >
          Désirez-vous l'enregistrer quand même ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIWarningModalOpened(false)}>Non</Button>
          <Button onClick={() => {
            setIWarningModalOpened(false);
            onSubmit(true);
          }}
          >
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  )
}