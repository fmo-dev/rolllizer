import "./styles.scss";
import { AppButton } from "../../../../../../shared/components/Button";
import { DatePicker } from "../../../../../../shared/components/DatePicker";
import { useState } from "react";

interface ForceAddDateProps {
  onChange(date: Date): Promise<void>;
}

export const ForceAddDate: React.FC<ForceAddDateProps> = ({ onChange }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = async (date: Date) => {
    onChange(date).finally(() => setIsDatePickerOpen(false));
  }

  return (
    <div className="game-dates">

      <AppButton variant="contained" onClick={() => setIsDatePickerOpen(true)} >
        Ajouter une date
      </AppButton>
      {isDatePickerOpen && <DatePicker onChange={handleDateChange} />}
    </div>
  );
}
