import { ImgHTMLAttributes } from "react";
import { cn } from "../../utils";
import './styles.scss';
import { Box, SxProps } from "@mui/material";

export const AppImage: React.FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return (
    <Box sx={styles.box}>
      <img {...props} className={cn("app-image", props.className)} />
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
