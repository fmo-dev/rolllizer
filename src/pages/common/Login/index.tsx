import React, { useRef, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';

import { LoginStep } from './types';
import { useAuthentication } from '../../../providers/authentication/hooks';
import { PhoneInput } from '../../../shared/components/Input/PhoneInput';
import { OTPInput } from '../../../shared/components/Input/OTPInput';
import './styles.scss'
import { Page } from '../../../shared/components/Page';
import { AppButton } from '../../../shared/components/Button';

const Login: React.FC = () => {
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
    <Page
      id='login-page'
      cantGoBack
      withLogo
      title="Connexion"
      footerAction={{
        disabled: currentStep === LoginStep.OTP,
        loading: isLoading,
        icon: <CheckIcon />,
        onClick: () => asyncOperation(async () => {
          try {
            await auth(currentPhoneNumberRef.current);
            setCurrentStep(LoginStep.OTP);
          } catch (e) {
            console.error(e);
          }
        }),
      }}
    >
      <div className='form-container'>
        <form className='form'>
          <div className='login-back-button-container'>
            <div className='login-back-button'>
              {currentStep === LoginStep.OTP && (
                <AppButton onClick={() => setCurrentStep(LoginStep.PHONE)}>
                  <ArrowBackIcon /> Retour
                </AppButton>
              )}
            </div>
          </div>
          {renderStep()}
        </form>
      </div>
    </Page>
  );
}

export default Login