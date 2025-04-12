import { PropsWithChildren } from "react";
import "./styles.scss";
interface ContentProps extends PropsWithChildren {
  height?: number;
  title?: string;
}

export const Content: React.FC<ContentProps> = ({
  height,
  title,
  children
}) => {
  return (
    <div className="content" style={{ height: height ? `${height}px` : '100%' }}>
      {title && <h1>{title}</h1>}
      {children}
    </div >
  )
}
