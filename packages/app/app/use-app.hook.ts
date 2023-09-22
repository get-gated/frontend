import { useContext } from 'react';
import { AppContext } from './app.context';

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('AppProvider required for useApp hook');
  }
  return context;
};
