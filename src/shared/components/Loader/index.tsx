import { CircularProgress } from "@mui/material";
import "./styles.scss";

export const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <CircularProgress className="loader" size={52} color="primary" />
    </div>
  );
};