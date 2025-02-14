import React, { useState } from 'react';

import { MuiTelInput, MuiTelInputProps } from "mui-tel-input"
import '../styles.scss'

interface PhoneInputProps extends Omit<MuiTelInputProps, "onChange" | 'defaultCountry'> {
  onChange?(value: string): void;
}

export const PhoneInput: React.FC<PhoneInputProps> = (props) => {
  const [value, setValue] = useState('');

  const onChange = (newValue: string) => {
    setValue(newValue);
    props.onChange?.(newValue);
  }

  return (
    <MuiTelInput
      defaultCountry='FR'
      {...props}
      onChange={onChange}
      value={value}
    />
  )
}