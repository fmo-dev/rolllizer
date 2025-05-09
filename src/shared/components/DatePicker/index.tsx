import "./styles.scss";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateInfo } from "./types";
import { getDateInfoStyle } from "./utils";
import { Paper } from "@mui/material";

interface DatePickerProps {
  onChange(date: Date): void;
  dateInfo?: DateInfo[];

}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  dateInfo = [],
}) => {

  return (
    <div className="date-picker">
      <Paper >
        <DateCalendar disablePast sx={getDateInfoStyle(dateInfo)} />
      </Paper>
    </div>
  )
}