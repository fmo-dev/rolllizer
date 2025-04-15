import { PropsWithChildren } from "react";
import "./styles.scss";
interface ContentProps extends PropsWithChildren {
  height?: number;
}

export const Content: React.FC<ContentProps> = ({
  height,
  children
}) => {
  return (
    <div className="content" style={{ height: height ? `${height}px` : '100%' }}>
      {children}
    </div >
  )
}
