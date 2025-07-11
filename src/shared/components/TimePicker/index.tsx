import { useState } from "react";
import { TimePickerValue } from "./types";
import { cn } from "../../utils";
import { Select } from "../Input/Select";
import "./styles.scss"
import { AppButton } from "../Button";

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
      <div className={cn("time-picker-select-position", { "open": isTimePickerOpen })}>
        <div className="time-picker-select-background" onClick={() => setIsTimePickerOpen(false)} />
        <div className="time-picker-select-container">
          <div className="time-picker-select-label">Sélectionnez l'heure</div>
          <Select
            open
            value={selectedTime}
            onChange={(time) => {
              setSelectedTime(time);
              onChange(time);
            }}
            options={[
              { name: "hour", options: Array.from({ length: 24 }, (_, i) => ({ label: String(i).padStart(2, '0'), value: String(i).padStart(2, '0') })) },
              { name: "minute", options: Array.from({ length: 60 / 5 }, (_, i) => ({ label: String(i * 5).padStart(2, '0'), value: String(i * 5).padStart(2, '0') })) },
            ]}
          />
          <AppButton onClick={() => setIsTimePickerOpen(false)}>Valider</AppButton>
        </div>
      </div>
    </div>
  );
};