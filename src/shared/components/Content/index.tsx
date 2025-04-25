import { cn } from "../../utils";
import "./styles.scss";
interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number;
}

export const Content: React.FC<ContentProps> = ({
  height,
  ...divProps
}) => {
  return (
    <div
      {...divProps}
      className={cn("content", divProps.className)}
      style={{ height: height ? `${height}px` : '100%' }}
    />
  )
}
