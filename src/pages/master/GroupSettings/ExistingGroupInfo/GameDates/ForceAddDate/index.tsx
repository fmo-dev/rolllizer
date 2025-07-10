import "./styles.scss";
import { AppButton } from "../../../../../../shared/components/Button";
import { DatePicker } from "../../../../../../shared/components/DatePicker";
import { useState } from "react";
import { useGroups } from "../../../../../../providers/groups/hooks";
import { GroupType } from "../../../../../../providers/groups/types";

interface ForceAddDateProps {
  onChange(date: Date): Promise<void>;
  group: GroupType;
}

export const ForceAddDate: React.FC<ForceAddDateProps> = ({ onChange, group }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { } = useGroups();
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
          label={<>Ajouter une date pour <br /> <b>{group.name}</b></>}
          onClose={() => setIsDatePickerOpen(false)}
          onChange={setSelectedDate}
          dateInfo={[
            {
              dates: [new Date('2025-07-12')],
              tooltip: "Tous les joueurs sont disponibles",
              color: "green",
            },
            {
              dates: [new Date('2025-07-15'), new Date('2025-07-18')],
              tooltip: "Pauline n'est pas disponible",
              color: "yellow",
            },
            {
              dates: [new Date('2025-07-16')],
              tooltip: "Partie Toto à la plage",
              color: "blue",
            },
            {
              dates: [new Date('2025-07-22')],
              tooltip: "Pauline, Charlotte et Jean ne sont pas disponibles",
              color: "yellow",
            },
          ]}
        />
      )}
    </div>
  );
}
