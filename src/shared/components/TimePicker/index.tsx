import { useState } from "react";
import { TimePickerValue } from "./types";
import Picker from "react-mobile-picker";
import { cn } from "../../utils";
import { Select } from "../Input/Select";
import "./styles.scss"

interface TimePickerProps {
  onChange(time: { hour: string; minute: string }): void;
  className?: string;
  value: TimePickerValue;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  onChange,
  className,
  value,
}) => {
  const [selectedTime, setSelectedTime] = useState<TimePickerValue>(value);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  return (
    <div className={cn("time-picker", className)}>
      <button onClick={() => setIsTimePickerOpen(!isTimePickerOpen)} className="time-picker-input">
        {selectedTime.hour}:{selectedTime.minute}
      </button>
      <div className={cn("time-picker-select", { "open": isTimePickerOpen })}>
        <Select
          value={selectedTime}
          height={100}
          size={1}
          onChange={(time) => {
            setSelectedTime(time);
            onChange(time);
          }}
          options={[
            { name: "hour", options: Array.from({ length: 24 }, (_, i) => ({ label: String(i).padStart(2, '0'), value: String(i).padStart(2, '0') })) },
            { name: "minute", options: Array.from({ length: 60 / 15 }, (_, i) => ({ label: String(i * 15).padStart(2, '0'), value: String(i * 15).padStart(2, '0') })) },
          ]}
        />
      </div>
    </div>
  );
};