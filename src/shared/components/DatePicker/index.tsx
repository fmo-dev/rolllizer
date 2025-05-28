import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateInfo, DateTooltipInfo } from "./types";
import { getDateInfoSettings, getDateInfoStyle } from "./utils";
import { Paper } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../utils";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./styles.scss";

interface DatePickerProps {
  onChange(date: Date | undefined): void;
  dateInfo?: DateInfo[];
  className?: string;
  onClose?(): void;

}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  dateInfo = [],
  className,
  onClose
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const dateInfoSettings = useMemo(() => getDateInfoSettings(dateInfo), [dateInfo])
  const [tooltipInfo, setTooltipInfo] = useState<DateTooltipInfo>();

  useEffect(() => {
    const abortController = new AbortController();
    if (calendarRef.current) {
      Object.entries(dateInfoSettings).forEach(([timestamp, dateInfo]) => {
        const dateElement = calendarRef.current?.querySelector(
          `.MuiPickersDay-root[data-timestamp="${timestamp}"]`
        ) as HTMLDivElement;
        if (dateElement) {
          dateElement.addEventListener("touchstart", () => {
            setTooltipInfo({
              top: dateElement.getBoundingClientRect().top,
              left: dateElement.getBoundingClientRect().left,
              tooltip: dateInfo.tooltip,
              color: dateInfo.color
            });
          }, { signal: abortController.signal });
          dateElement.addEventListener("touchend", () => {
            setTooltipInfo(undefined);
          }, { signal: abortController.signal });
        }
      });
    }
    return () => abortController.abort();
  }, [calendarRef, dateInfoSettings])

  return (
    <div className={cn("date-picker", className)}>
      <div className="back-button-container">
        <ArrowBackIcon className="back-button" onClick={onClose} />
      </div>
      <Paper className="date-picker-paper">
        <DateCalendar
          ref={calendarRef}
          sx={getDateInfoStyle(dateInfoSettings)}
          onChange={(value) => onChange(value?.toDate())}
        />
        {tooltipInfo && (
          <div className={cn("date-tooltip", tooltipInfo.color)} style={{ top: tooltipInfo.top, left: tooltipInfo.left }}>
            {tooltipInfo.tooltip}
          </div>
        )}
      </Paper>
    </div>
  )
}