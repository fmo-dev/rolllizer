import { Input } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import "./styles.scss";
import { useId } from "react";
import { AppImage } from "../../Image";

interface ImageInputProps {
  onChange(file: File | null): void;
  value: File | string | null;
}

export const ImageInput: React.FC<ImageInputProps> = ({ onChange, value }) => {
  const id = useId();

  return (
    <div className="image-input-container">
      <label className="image-input-button" htmlFor={id}>
        {value && (
          <>
            <CloseIcon
              className="remove-image-button"
              color="error"
              onClick={(e) => {
                onChange(null);
                e.preventDefault();
              }}
            />
            <AppImage
              src={typeof value === 'string' ? undefined : URL.createObjectURL(value)}
              path={typeof value === 'string' ? value : undefined}
            />
          </>
        )}
        <span className="image-input-button-text">{value ? "Changer l'image" : "Choisir une image"}</span>
      </label>
      <Input
        id={id}
        className="image-input"
        type="file"
        value={""}
        onChange={({ target }) => {
          const file = (target as HTMLInputElement).files?.[0];
          if (file) {
            onChange(file);
          }
        }}
      />
    </div>
  );
};