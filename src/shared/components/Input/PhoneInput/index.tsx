import React, { useRef, useState } from 'react';

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
      setValue(newValue);
      props.onChange?.(newValue);
    }
  }

  return (
    <MuiTelInput
      defaultCountry='FR'
      {...props}
      disableDropdown
      onChange={onChange}
      value={value}
    />
  )
}