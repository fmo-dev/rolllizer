import { HTMLAttributes } from "react";

import './styles.scss';
import { cn } from "../../utils";
import { Title } from "../Title";


export const Page: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, title, ...props }) => (
  <div {...props} className={cn(props.className, 'page')}>
    {title && <Title>{title}</Title>}
    {children}
  </div>
);