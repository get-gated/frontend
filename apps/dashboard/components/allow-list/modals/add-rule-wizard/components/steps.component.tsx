import React from 'react';

import { StepContext } from '../use-step.hook';
import { StepConnector } from './step-connector.component';

interface StepsProps {
  activeStep: number;
  children?: React.ReactNode;
}
export const Steps = (props: StepsProps) => {
  const { activeStep, children } = props;
  const steps = React.useMemo(
    () =>
      React.Children.toArray(children).map((step, i, arr) => (
        <StepContext.Provider
          key={i}
          value={{
            isActive: activeStep === i,
            isCompleted: activeStep > i,
            isLastStep: arr.length !== i + 1,
            step: i + 1,
          }}
        >
          {step}
          {arr.length !== i + 1 && <StepConnector />}
        </StepContext.Provider>
      )),
    [activeStep, children],
  );
  return <>{steps}</>;
};
