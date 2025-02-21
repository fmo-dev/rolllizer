import { HTMLAttributes } from "react";

import './styles.scss';

export const Title: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ children, ...props }) => {
  return (
    <h1 {...props} className={[props.className, 'title'].join(' ')}>{children}</h1>
  )
}