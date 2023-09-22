import React, { useContext } from 'react';

export const useStep = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw Error('Wrap your step with `<Steps />`');
  } else {
    return context;
  }
};

export interface StepContext {
  step: number;
  isActive: boolean;
  isCompleted: boolean;
  isLastStep: boolean;
}

export const StepContext = React.createContext<StepContext | null>(null);
