import { CircularProgress, CircularProgressProps } from "@mui/material";
import "./styles.scss";

interface LoaderProps {
  size?: CircularProgressProps["size"];
  color?: CircularProgressProps["color"];
}

export const Loader: React.FC<LoaderProps> = ({
  size = 52,
  color = "primary"
}) => {
  return (
    <div className="loader-container">
      <CircularProgress className="loader" size={size} color={color} />
    </div>
  );
};