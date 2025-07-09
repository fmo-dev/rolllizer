import { useState } from "react";
import { TimePickerValue } from "./types";
import Picker from "react-mobile-picker";
import { cn } from "../../utils";
import { Select } from "../Input/Select";

interface TimePickerProps {
  onChange(time: { hour: string; minute: string }): void;
  className?: string;
  value?: { hour: string; minute: string };
}

export const TimePicker: React.FC<TimePickerProps> = ({
  onChange,
  className,
  value,
}) => {
  const [selectedTime, setSelectedTime] = useState<TimePickerValue>({ hour: "14", minute: "00" });
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  console.log(isTimePickerOpen)
  return (
    <div className={cn("time-picker", className)}>
      <button onClick={() => setIsTimePickerOpen(!isTimePickerOpen)} className="time-picker-input">
        {selectedTime.hour}:{selectedTime.minute}
      </button>
      <Select
        open={isTimePickerOpen}
        value={selectedTime}
        onChange={(time) => {
          setSelectedTime(time);
          onChange(time);
        }}
        label="Select Time"
        options={[
          { name: "hour", options: Array.from({ length: 24 }, (_, i) => ({ label: String(i).padStart(2, '0'), value: String(i).padStart(2, '0') })) },
          { name: "minute", options: Array.from({ length: 60 / 15 }, (_, i) => ({ label: String(i * 15).padStart(2, '0'), value: String(i * 15).padStart(2, '0') })) },
        ]}
      />
    </div>
  );
};