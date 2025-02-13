import React, { useState } from 'react';
import { useAuthentication } from '../../../providers/authentication/hooks';
import { LoginStep } from './types';
import { PhoneInput } from '../../../shared/components/Input/PhoneInput';
import { AppInput } from '../../../shared/components/Input';

const Login = () => {
  const { auth } = useAuthentication();
  const [currentStep, setCurrentStep] = useState(LoginStep.PHONE);

  const renderStep = () => {
    switch (currentStep) {
      case LoginStep.PHONE:
        return <AppInput type="tel" />
      case LoginStep.OTP:
        return null;
    }
  }

  return renderStep();
}

export default Login