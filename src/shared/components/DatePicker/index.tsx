import "./styles.scss";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateInfo } from "./types";
import { getDateInfoSettings, getDateInfoStyle } from "./utils";
import { Paper } from "@mui/material";
import React, { useEffect, useMemo, useRef } from "react";

interface DatePickerProps {
  onChange(date: Date): void;
  dateInfo?: DateInfo[];

}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  dateInfo = [],
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const dateInfoSettings = useMemo(() => getDateInfoSettings(dateInfo), [dateInfo])

  useEffect(() => {
    // Show tooltip for date info on hover / click
    if (calendarRef.current) {
      const timestamps = Object.keys(dateInfoSettings);
      timestamps.forEach((timestamp) => {
        const dateElement = calendarRef.current?.querySelector(
          `.MuiPickersDay-root[data-timestamp="${timestamp}"]`
        );
        if (dateElement) {
          dateElement.addEventListener("mouseover", () => {
            const tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.innerText = dateInfoSettings[Number(timestamp)].tooltip;
            dateElement.appendChild(tooltip);
          });
          dateElement.addEventListener("mouseout", () => {
            const tooltip = dateElement.querySelector(".tooltip");
            if (tooltip) {
              dateElement.removeChild(tooltip);
            }
          });
        }
      });
    }
  }, [calendarRef])

  return (
    <div className="date-picker">
      <Paper>
        <DateCalendar
          ref={calendarRef}
          sx={getDateInfoStyle(dateInfoSettings)}
        />
      </Paper>
    </div>
  )
}