import { ButtonProps, Button } from "@mui/material";
import { cn } from "../../utils";

import './styles.scss';

interface AppButtonProps extends ButtonProps {
  center?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({ center, ...props }) => (
  <Button {...props} className={cn(props.className, 'app-button', { center })} />
)