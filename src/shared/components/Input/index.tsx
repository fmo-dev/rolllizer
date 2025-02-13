import { FC, InputHTMLAttributes } from "react";
import './styles.scss'

export const AppInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input className={`app-input ${props.className}`} {...props} />
);