import { useMemo } from 'react';
import AuthContext, { IAuthContext } from './auth.context';

import { useFirebase } from './use-firebase.hook';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function MobileAuthProvider({ children }: AuthProviderProps) {
  const {
    userId,
    signOut: logout,
    isReady,
    status,
    roles,
    authToken,
    getAuthToken,
  } = useFirebase();

  const value = useMemo(
    (): IAuthContext => ({
      isReady,
      status,
      logout,
      roles,
      userId,
      authToken,
      getAuthToken,
    }),
    [isReady, status],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
