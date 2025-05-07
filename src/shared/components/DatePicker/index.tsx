import "./styles.scss";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface DatePickerProps {
  onChange(date: Date): void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange
}) => {
  return (
    <div className="date-picker">
      <DateCalendar />
    </div>
  )
}
