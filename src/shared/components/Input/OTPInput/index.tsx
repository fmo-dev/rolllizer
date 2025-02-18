import React, { useState } from "react";
import { MuiOtpInput, MuiOtpInputProps } from "mui-one-time-password-input";

export const OTPInput: React.FC<MuiOtpInputProps> = (props) => {
  const [value, setValue] = useState('');

  const onChange = (newValue: string) => {
    setValue(newValue);
    props.onChange?.(newValue);
  }

  return (
    <MuiOtpInput
      {...props}
      onChange={onChange}
      autoFocus
      value={value}
      length={4}
    />
  )
};