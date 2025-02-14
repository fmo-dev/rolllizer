import { FC } from "react";
import './styles.scss'
import { TextField, TextFieldProps } from "@mui/material";

export const AppInput: FC<TextFieldProps> = (props) => (
  <TextField {...props} variant="outlined" inputMode="numeric" />
);