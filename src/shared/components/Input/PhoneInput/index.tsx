import React, { useState } from 'react';

import { MuiTelInput, MuiTelInputProps } from "mui-tel-input"
import '../styles.scss'
import { AVAILABLE_COUNTRY_CODE } from './constants';

interface PhoneInputProps extends Omit<MuiTelInputProps, "onChange" | 'defaultCountry'> {
  onChange?(value: string): void;
}

export const PhoneInput: React.FC<PhoneInputProps> = (props) => {
  const [value, setValue] = useState('');


  const onChange = (newValue: string) => {
    const startWithCountryCode = AVAILABLE_COUNTRY_CODE.some((countryCode) => newValue.startsWith(countryCode));
    if (startWithCountryCode) {
      const phoneLength = newValue.split(' ').join('').length;
      if (phoneLength > 12) {
        return;
      }
      else if (phoneLength === 12) {
        props.onChange?.(newValue);
      }
      else {
        props.onChange?.('');
      }
      setValue(newValue);
    }
    else props.onChange?.('');
  }

  return (
    <MuiTelInput
      defaultCountry='FR'
      {...props}
      autoFocus
      disableDropdown
      onChange={onChange}
      value={value}
    />
  )
}