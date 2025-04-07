import { useEffect, useState } from "react";
import { GroupPlayer, GroupType } from "../../../providers/groups/types";
import { Page } from "../../../shared/components/Page";
import { useGroups } from "../../../providers/groups/hooks";
import { useRouter } from "../../../providers/router/hooks";
import { Loader } from "../../../shared/components/Loader";
import { InputLabel, TextField } from "@mui/material";

import _map from "lodash/map";

import "./styles.scss";
import { ImageInput } from "../../../shared/components/Input/ImageInput";
import { useAPI } from "../../../providers/api/hooks";
import { useUser } from "../../../providers/user/hooks";
import { PlayerInputs } from "./PlayerInputs";
import { NoPlayerDialog } from "./NoPlayerDialog";
import { ActionButton } from "../../../shared/components/Button/ActionButton";
import { useRouteParams } from "../../../providers/route-params/hooks";

export const GroupSettings: React.FC = () => {
  const api = useAPI();
  const { user } = useUser();
  const { navigate } = useRouter();
  const [groupId] = useRouteParams();
  const { groups, refetchGroups } = useGroups();
  const [group, setGroup] = useState<Partial<GroupType> | null>(null);
  const [name, setName] = useState<string>('');
  const [players, setPlayers] = useState<GroupPlayer[]>([]);
  const [hasNameBeenBlurred, setHasNameBeenBlurred] = useState(false);
  const [image, setImage] = useState<File | string | null>(null);
  const [isWarningModalOpened, setIWarningModalOpened] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    if (groupId) {
      const currentGroup = groups.asOwner.find(({ id }) => id.toString() === groupId);
      if (!currentGroup) {
        navigate('home');
      } else {
        setGroup(currentGroup);
        setImage(currentGroup.image_url || null);
        setName(currentGroup.name);
        setPlayers(currentGroup.player || [])
      }
    }
  }, [groupId, groups.asOwner, navigate]);

  const isLoading = !!groupId && !group

  const onSubmit = async (validateWithoutPlayer?: boolean) => {
    setIsSubmitLoading(true);
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
    const newGroupId = data?.[0].id;
    if (newGroupId) {
      if (image && image instanceof File) {
        const { data } = await api.storage.from('images').upload(`group-${newGroupId}.${Date.now()}`, image, { upsert: true });
        if (data?.fullPath) {
          await api.from('group').update({ image_url: data.fullPath }).eq('id', newGroupId);
        }
      }
      if (players.length) {
        const playersToInsert = players.filter(({ id }) => !_map(group?.player, 'id').includes(id));
        const playersToDelete = group?.player?.filter(({ id }) => !players.map(player => player.id).includes(id));
        const playersToUpdate = players.filter((player) => group?.player?.some(({ player_name, id }) => player.id === id && player.player_name !== player_name));
        if (playersToDelete?.length) {
          await api.from('player').delete().in('id', playersToDelete.map(({ id }) => id));
        }
        if (playersToInsert?.length) {
          await api.from('player').upsert(playersToInsert.map(({ player_name }) => ({
            group_id: newGroupId,
            player_name
          })));
        }
        if (playersToUpdate?.length) {
          await api.from('player').upsert(playersToUpdate.map(({ player_name, id }) => ({
            id,
            group_id: newGroupId,
            player_name
          })));
        }
      }
      await refetchGroups();
      navigate('home');
    }
    setIsSubmitLoading(false);
  }

  const isFormDisabled = !name.length || isLoading;

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
            error={hasNameBeenBlurred && !name.length}
            helperText={hasNameBeenBlurred && !name.length ? 'Le nom du groupe est requis' : ''}
          />
          <div className="image-field">
            <InputLabel>Image du groupe</InputLabel>
            <ImageInput value={image} onChange={setImage} />
          </div>
          <PlayerInputs value={players} onChange={setPlayers} />
        </div>
        <ActionButton loading={isSubmitLoading} className="submit-button" variant="contained" type="submit" disabled={isFormDisabled}>
          Valider
        </ActionButton>
      </form>
      {isWarningModalOpened && (
        <NoPlayerDialog
          onClose={() => setIWarningModalOpened(false)}
          onConfirm={() => onSubmit(true)}
        />
      )}
    </Page>
  )
}