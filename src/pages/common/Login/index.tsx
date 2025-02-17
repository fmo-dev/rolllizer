import React, { useState } from 'react';
import { LoginStep } from './types';
import { PhoneInput } from '../../../shared/components/Input/PhoneInput';

import './styles.scss'
const Login = () => {
  const [currentStep] = useState(LoginStep.PHONE);

  const renderStep = () => {
    switch (currentStep) {
      case LoginStep.PHONE:
        return <PhoneInput className="login-input" label="Numéro de téléphone" />
      case LoginStep.OTP:
        return null;
    }
  }

  return (
    <div id='login-page'>
      <h1>Connexion</h1>
      <div className='login-input-container'>
        {renderStep()}
      </div>
    </div>
  );
}

export default Login