import React, { useState } from 'react';
import { ProgressStepsContext } from '@components/ProgressSteps/ProgressStepsContext';

export const ProgressStepsProvider = ({ children, numberOfSteps }) => {
  const [activeStep, setActiveStep] = useState(1);

  const onBack = () => {
    if (activeStep === 1) return;
    setActiveStep(activeStep - 1);
  };

  const onNext = () => {
    if (activeStep === numberOfSteps) return;
    setActiveStep(activeStep + 1);
  };

  const onReset = () => {
    setActiveStep(1);
  };

  const onSetStep = (stepNumber: number) => {
    if (stepNumber < 1 || stepNumber > numberOfSteps) {
      console.error(`Cannot move to Invalid step ${stepNumber}`);
      return;
    }
    setActiveStep(stepNumber);
  };

  return (
    <ProgressStepsContext.Provider
      value={{
        activeStep,
        numberOfSteps,
        onBack,
        onNext,
        onReset,
        onSetStep,
      }}
    >
      {children}
    </ProgressStepsContext.Provider>
  );
};
