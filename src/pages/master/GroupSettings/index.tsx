import { useEffect, useState } from "react";
import { Group } from "../../../providers/groups/types";
import { Page } from "../../../shared/components/Page";
import { useParams } from "react-router-dom";
import { useGroups } from "../../../providers/groups/hooks";
import { useRouter } from "../../../providers/router/hooks";
import { Loader } from "../../../shared/components/Loader";
import { InputLabel, TextField } from "@mui/material";

import "./styles.scss";
import { ImageInput } from "../../../shared/components/Input/ImageInput";
import { AppButton } from "../../../shared/components/Button";
import { useAPI } from "../../../providers/api/hooks";
import { useUser } from "../../../providers/user/hooks";

export const GroupSettings: React.FC = () => {
  const api = useAPI();
  const { user } = useUser();
  const { navigate } = useRouter();
  const { groupId } = useParams<{ groupId?: string }>();
  const { groups } = useGroups();
  const [group, setGroup] = useState<Partial<Group> | null>(null);
  const [name, setName] = useState<string>('');
  const [hasNameBeenBlurred, setHasNameBeenBlurred] = useState(false);
  const [image, setImage] = useState<File | null>(null);

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

  const isLoading = groupId && !group

  const onSubmit = async () => {
    const groupData = {
      ...(groupId ? { id: groupId } : {}),
      owner_id: user.id,
      name
    }
    const { data } = await api.from('group').upsert(groupData);
    console.log(data)
    // if (image) {
    //   const imageUrl = await api.storage.from('images').upload("dfdf", image);
    //   await api.from('groups').upsert({ id: data.id, image_url: imageUrl });
    // }
  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <Page id="group-settings-page" title={group ? "Gérer un groupe" : "Créer un groupe"}>
      <form className='form' onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}>
        <TextField
          label="Nom du groupe"
          required
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
        <AppButton variant="contained" type="submit">
          Valider
        </AppButton>
      </form>
    </Page>
  )
}