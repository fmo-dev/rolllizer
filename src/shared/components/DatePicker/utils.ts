import { SxProps } from "@mui/material";
import { DateInfo } from "./types";
import { Theme } from "@emotion/react";

export const getDateInfoStyle = (dateInfo: DateInfo[]): SxProps<Theme> => {
  const styles: SxProps<Theme> = {}
  dateInfo.forEach((info) => {
    const { dates, tooltip, color } = info;
    dates.forEach((date) => {
      const dateTimestamp = new Date(date).getTime();
      // Date without hours minutes seconds and milliseconds
      const roundedDateTimestamp = dateTimestamp - (dateTimestamp % 86400000);
      console.log(date, roundedDateTimestamp)
      console.log("-", 1747000800000)
      styles[`& button[data-timestamp=${roundedDateTimestamp}]`] = {
        backgroundColor: color,
      }
    });
  }
  );
  return styles;
}