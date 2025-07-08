import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateInfo, DateTooltipInfo } from "./types";
import { getDateInfoSettings, getDateInfoStyle } from "./utils";
import { Alert, MenuItem, Paper, Select } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../utils";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./styles.scss";
import { PickerValue } from '@mui/x-date-pickers/internals';

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("00:00");

  const currentAlert = useMemo(() => {
    if (!selectedDate) return undefined;
    return dateInfoSettings[selectedDate.getTime()];
  }, [selectedDate, dateInfoSettings]);

  const getAlertSeverity = useCallback((color?: string) => {
    switch (color) {
      case "green":
        return "success";
      case "yellow":
        return "warning";
      case "blue":
        return "info";
      case "red":
        return "error";
      default:
        return "info";
    }
  }, []);
  console.log(Array(24).fill(0).flatMap((_, index) => {
    const hour = index < 10 ? `0${index}` : index;
    return Array(4).fill(0).map((_, i) => {
      const hourWithQuarter = `${hour}:${!i ? '00' : i * 15}`;
      return (
        <MenuItem key={hourWithQuarter} value={hourWithQuarter}>
          {hourWithQuarter}
        </MenuItem>
      );
    })
  }))
  return (
    <div className={cn("date-picker", className)}>
      <div className="back-button-container">
        <ArrowBackIcon className="back-button" onClick={onClose} />
      </div>

      <Paper className="date-picker-paper">
        <DateCalendar
          ref={calendarRef}
          sx={getDateInfoStyle(dateInfoSettings)}
          onChange={(value) => setSelectedDate(value?.toDate())}
        />
      </Paper>
      <Alert severity={getAlertSeverity(currentAlert?.color)} className="date-alert-container" style={{ opacity: currentAlert ? 1 : 0 }}>
        <div className={cn("date-alert", currentAlert?.color)}>
          {currentAlert?.tooltip}
        </div>
      </Alert>
      {selectedDate && (
        <div className="date-picker-selected-date">
          <span className="date-picker-selected-date-text">
            Le {selectedDate.toLocaleDateString()}
          </span>
          <div className="date-picker-time-select">
            à
            <Select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              aria-placeholder="hh:mm"
            >
              {Array(24).fill(0).flatMap((_, index) => {
                const hour = index < 10 ? `0${index}` : index;
                return Array(4).fill(0).map((_, i) => {
                  const hourWithQuarter = `${hour}:${!i ? '00' : i * 15}`;
                  return (
                    <MenuItem key={hourWithQuarter} value={hourWithQuarter}>
                      {hourWithQuarter}
                    </MenuItem>
                  );
                })
              })}
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}