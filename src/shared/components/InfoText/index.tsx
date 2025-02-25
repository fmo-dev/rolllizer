import { HTMLAttributes } from "react";

import "./styles.scss";

interface InfoTextProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  variant?: 'info' | 'warning' | 'error';
}

export const InfoText = ({ title, variant = 'info', children, ...props }: InfoTextProps) => (
  <div {...props} className={`info-text ${variant}`}>
    {title && <h3>{title}</h3>}
    {children}
  </div>
)