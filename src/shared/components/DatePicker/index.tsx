import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateInfo } from "./types";
import { getDateInfoSettings, getDateInfoStyle } from "./utils";
import { Alert, Paper } from "@mui/material";
import React, { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { cn } from "../../utils";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./styles.scss";
import { TimePicker } from '../TimePicker';
import { Title } from '../Title';
import { TimePickerValue } from '../TimePicker/types';
import { AppButton } from '../Button';

interface DatePickerProps {
  onChange(date: Date | undefined): void;
  dateInfo?: DateInfo[];
  className?: string;
  onClose?(): void;
  label?: ReactNode;

}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  dateInfo = [],
  className,
  onClose,
  label
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const dateInfoSettings = useMemo(() => getDateInfoSettings(dateInfo), [dateInfo])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<TimePickerValue>({ hour: "14", minute: "00" });
  const currentAlert = useMemo(() => {
    if (!selectedDate) return undefined;
    return dateInfoSettings[selectedDate.getTime()];
  }, [selectedDate, dateInfoSettings]);

  const getAlertSeverity = useCallback((color: string) => {
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

  const onSubmit = () => {
    if (selectedDate) {
      const dateWithTime = new Date(selectedDate.setHours(Number(selectedTime.hour), Number(selectedTime.minute)));
      onChange(dateWithTime);
    } else {
      onChange(undefined);
    }
  }

  return (
    <div className={cn("date-picker", className)}>
      <div className="back-button-container">
        <ArrowBackIcon className="back-button" onClick={onClose} />
      </div>
      <Title className="date-picker-title">
        {label || "Sélectionnez une date"}
      </Title>
      <Paper className="date-picker-paper">
        <DateCalendar
          ref={calendarRef}
          sx={getDateInfoStyle(dateInfoSettings)}
          onChange={(value) => setSelectedDate(value?.toDate())}
        />
      </Paper>
      <div className="date-picker-value-info">
        {currentAlert && (
          <Alert severity={getAlertSeverity(currentAlert.color)} className="date-alert-container" style={{ opacity: currentAlert ? 1 : 0 }}>
            <div className={cn("date-alert", currentAlert.color)}>
              {currentAlert.tooltip}
            </div>
          </Alert>
        )}
        {selectedDate && (
          <div className="date-picker-selected-date">
            Le {selectedDate.toLocaleDateString()}
            <div className="date-picker-time-select">
              à
            </div>
            <TimePicker onChange={setSelectedTime} value={selectedTime} />
          </div>
        )}
      </div>
      <AppButton className='date-picker-submit-button' onClick={onSubmit}>Valider</AppButton>
    </div>
  )
}