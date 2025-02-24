import React, { useRef, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { LoginStep } from './types';
import { useAuthentication } from '../../../providers/authentication/hooks';
import { PhoneInput } from '../../../shared/components/Input/PhoneInput';
import { OTPInput } from '../../../shared/components/Input/OTPInput';
import './styles.scss'
import { Title } from '../../../shared/components/Title';
import { Page } from '../../../shared/components/Page';
import { AppButton } from '../../../shared/components/Button';

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
    <Page id='login-page'>
      <Title>Connexion</Title>
      <div className='form-container'>
        <form className='form'>
          <div>
            {currentStep === LoginStep.OTP && (
              <AppButton className='back-button' onClick={() => setCurrentStep(LoginStep.PHONE)}>
                <ArrowBackIcon /> Retour
              </AppButton>
            )}
          </div>
          {renderStep()}
          <AppButton
            type='submit'
            variant='contained'
            color='primary'
            center
            disabled={currentStep === LoginStep.OTP}
            loading={isLoading}
            onClick={() => asyncOperation(async () => {
              await auth(currentPhoneNumberRef.current);
              setCurrentStep(LoginStep.OTP);
            })}
          >
            Valider
          </AppButton>
        </form>
      </div>
    </Page>
  );
}

export default Login