import { SxProps } from "@mui/material";
import { DateInfo, DateInfoSettings } from "./types";
import { CSSObject, Theme } from "@emotion/react";
import { DATE_COLOR } from "./constants";

export const getDateInfoStyle = (settings: DateInfoSettings): SxProps<Theme> => {
  const styles: CSSObject = {};
  Object.entries(settings).forEach(([timestamp, { color }]) => {
    styles[`& .MuiPickersDay-root[data-timestamp="${timestamp}"]`] = {
      backgroundColor: DATE_COLOR[color].transparent,
      fontWeight: 500,
      "&.Mui-selected": {
        backgroundColor: DATE_COLOR[color].selected,
      }
    };
  });
  return styles;
}

export const getDateTimestamp = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year, month, day).getTime();
}

export const getDateInfoSettings = (dateInfo: DateInfo[]) => {
  const settings: DateInfoSettings = {}
  dateInfo.forEach((info) => {
    const { dates, tooltip, color } = info;
    dates.forEach((date) => {
      const currentDate = new Date(date);
      const dateTimestamp = getDateTimestamp(currentDate);
      settings[dateTimestamp] = { tooltip, color };
    });
  });
  return settings;
}
