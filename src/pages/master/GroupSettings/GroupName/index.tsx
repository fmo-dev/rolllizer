import { useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { OutlinedInput } from "@mui/material";
import "./styles.scss";

interface GroupNameProps {
  groupName: string;
  onChange(name: string): void;
}

export const GroupName: React.FC<GroupNameProps> = ({
  groupName,
  onChange
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const nameRender = useMemo(() => {
    if (isEditing) {
      return (
        <div className="group-name-editing">
          <OutlinedInput
            value={groupName}
            autoFocus
            size="small"
            onChange={({ target }) => onChange(target.value)}
            endAdornment={<CheckCircleIcon onClick={() => setIsEditing(false)} />}
          />
        </div>
      )
    }
    return (
      <div className="group-name">
        <span>{groupName}</span>
        <EditIcon onClick={() => setIsEditing(true)} />
      </div>
    )
  }, [isEditing, groupName, onChange]);

  return (
    <div className="group-name-container">
      {nameRender}
    </div>
  )
}
