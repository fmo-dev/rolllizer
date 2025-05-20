import "./styles.scss";
import { AppButton } from "../../../../../../shared/components/Button";
import { DatePicker } from "../../../../../../shared/components/DatePicker";
import { useState } from "react";

interface ForceAddDateProps {
  onChange(date: Date): Promise<void>;
}

export const ForceAddDate: React.FC<ForceAddDateProps> = ({ onChange }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateChange = async (date: Date) => {
    onChange(date).finally(() => setIsDatePickerOpen(false));
  }

  return (
    <div className="game-dates">

      <AppButton variant="contained" onClick={() => setIsDatePickerOpen(true)} >
        Ajouter une date
      </AppButton>
      {isDatePickerOpen && (
        <DatePicker
          className="game-dates-picker"
          onChange={setSelectedDate}
          dateInfo={[
            {
              dates: [new Date('2025-05-12')],
              tooltip: "Tous les joueurs sont disponibles",
              color: "green",
            },
            {
              dates: [new Date('2025-05-15'), new Date('2025-05-18')],
              tooltip: "Pauline n'est pas disponible",
              color: "yellow",
            },
            {
              dates: [new Date('2025-05-16')],
              tooltip: "Partie Toto à la plage",
              color: "blue",
            },
          ]}
        />
      )}
    </div>
  );
}
