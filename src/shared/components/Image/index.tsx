import { ImgHTMLAttributes, useState } from "react";
import { cn } from "../../utils";
import './styles.scss';
import { Box, SxProps } from "@mui/material";
import { Loader } from "../Loader";

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  path?: string;
}

export const AppImage: React.FC<AppImageProps> = ({
  path,
  src,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const getFullImageURL = () => (
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${path}?nocache`
  )

  return (
    <Box sx={styles.box}>
      <img
        {...props}
        src={src || getFullImageURL()}
        onLoad={() => setIsLoading(false)}
        className={cn("app-image", props.className, { isLoading })} />
      {isLoading && <div className="app-image-loader"><Loader size={36} /></div>}
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
