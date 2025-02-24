import { HTMLAttributes } from "react";

import './styles.scss';
import { cn } from "../../utils";


export const Page: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => (
  <div {...props} className={cn(props.className, 'page')} />
);