import { useContext } from 'react';
import { AnalyticsContext } from './analytics.context';

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('AnalyticsProvider required for useAnalytics hook');
  }
  return context;
};
