import { AppBar } from "@mui/material";
import "./styles.scss";

export const Header: React.FC = () => {
  return (
    <AppBar className="header">
      <h1>Rollizer</h1>
    </AppBar>
  )
}