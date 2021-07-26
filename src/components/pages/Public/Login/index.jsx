import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const Login = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');

  const stepComponent = [
  <StepOne next={setStep} email={email} setEmail={setEmail} />,
  <StepTwo previous={setStep} email={email} />
  ];

  return stepComponent[step];

};

export default Login;
