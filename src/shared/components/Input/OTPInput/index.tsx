import React from "react";
import './styles.scss'
import { MuiOtpInput, MuiOtpInputProps } from "mui-one-time-password-input";

export const OTPInput: React.FC<MuiOtpInputProps> = (props) => (
  <MuiOtpInput {...props} length={4} />
);