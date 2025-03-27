import { ImgHTMLAttributes } from "react";
import { cn } from "../../utils";
import './styles.scss';
import { Box, SxProps } from "@mui/material";


interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  path?: string;
}

export const AppImage: React.FC<AppImageProps> = ({
  path,
  src,
  ...props
}) => {
  const getFullImageURL = () => (
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${path}`
  )

  return (
    <Box sx={styles.box}>
      <img
        {...props}
        src={path ? getFullImageURL() : src}
        className={cn("app-image", props.className)} />
    </Box>
  );
};


const styles: Record<string, SxProps> = {
  box: {
    width: 200,
    height: "auto",
    maxHeight: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}
