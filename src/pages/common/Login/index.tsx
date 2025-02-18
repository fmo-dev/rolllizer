import React, { useRef, useState } from 'react';

import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { LoginStep } from './types';
import { useAuthentication } from '../../../providers/authentication/hooks';
import { PhoneInput } from '../../../shared/components/Input/PhoneInput';
import { OTPInput } from '../../../shared/components/Input/OTPInput';
import './styles.scss'

const Login = () => {
  const [currentStep, setCurrentStep] = useState(LoginStep.PHONE);
  const { auth, sendOTP } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  const currentPhoneNumberRef = useRef<string>('');

  const asyncOperation = (callback: () => Promise<void>) => {
    setIsLoading(true);
    callback().finally(() => setIsLoading(false));
  }

  const renderStep = () => {
    switch (currentStep) {
      case LoginStep.PHONE:
        return (
          <>
            <PhoneInput
              className="login-input"
              label="Numéro de téléphone"
              onChange={(value) => currentPhoneNumberRef.current = value}
            />

          </>
        )
      case LoginStep.OTP:
        return (
          <OTPInput
            className="login-input"
            onComplete={(otp: string) => asyncOperation(() => (
              sendOTP(currentPhoneNumberRef.current, otp)
            ))}
          />
        );
    }
  }

  return (
    <div id='login-page'>
      <h1>Connexion</h1>
      <div className='form-container'>
        <div className='form'>
          <div>
            {currentStep === LoginStep.OTP && (
              <Button className='back-button' onClick={() => setCurrentStep(LoginStep.PHONE)}>
                <ArrowBackIcon /> Retour
              </Button>
            )}
          </div>
          {renderStep()}
          <Button
            variant='contained'
            color='primary'
            disabled={currentStep === LoginStep.OTP}
            loading={isLoading}
            onClick={() => asyncOperation(async () => {
              await auth(currentPhoneNumberRef.current);
              setCurrentStep(LoginStep.OTP);
            })}
          >
            Valider
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login