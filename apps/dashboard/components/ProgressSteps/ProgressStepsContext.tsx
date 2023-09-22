import React from 'react';

export interface IProgressStepsContext {
  activeStep: number;
  numberOfSteps: number;
  onBack: () => void;
  onNext: () => void;
  onReset: () => void;
  onSetStep: (any) => void;
}

export const ProgressStepsContext =
  React.createContext<IProgressStepsContext | null>(null);
