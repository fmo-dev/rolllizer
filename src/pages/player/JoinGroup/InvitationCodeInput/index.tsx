import React, { useState } from "react";

import "./styles.scss";
import "./styles.scss"
import { InputLabel } from "@mui/material";
import { cn } from "../../../../shared/utils";

interface InvitationCodeInputProps {
  value: string;
  onChange(code: string): void;
}

export const InvitationCodeInput: React.FC<InvitationCodeInputProps> = ({
  value,
  onChange
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="invitation-code-input">
      <InputLabel>Entrez le code du groupe</InputLabel>
      <div className={cn("code-input", isFocused && "focused")}>
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="code-input-item">
            {value[index] || '_'}
          </div>
        ))}
        <input
          autoFocus
          onChange={({ target }) => onChange(target.value.replace(/_/g, ''))}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}
