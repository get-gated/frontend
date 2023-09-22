import { useContext } from 'react';

import { ProgressStepsContext } from '@components/ProgressSteps/ProgressStepsContext';

export const useProgressSteps = () => {
  const context = useContext(ProgressStepsContext);
  if (!context) {
    throw Error('Wrap your step with `<ProgressSteps />`');
  } else {
    return context;
  }
};
