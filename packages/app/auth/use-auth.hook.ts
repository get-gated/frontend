import AuthContext from './auth.context';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthProvider required for useAuth hook');
  }
  return context;
};
