import nookies from 'nookies';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Role } from './auth.enums';
import AuthContext from './auth.context';
import { App, useAppLink } from '../hooks/use-app-link.hook';
import { useFirebase } from './use-firebase.hook';

export interface AuthProps {
  publicRoutes?: string[] | '*';
  privateRoutes?: string[] | '*';
  unauthedRedirectPath?: string;
  adminOnly?: boolean;
}

interface AuthProviderProps extends AuthProps {
  children: ReactNode;
}

const setCookie = (token = '') => {
  nookies.set(undefined, 'authorization', token, { path: '/' });
};

export function AuthProvider({
  publicRoutes = [],
  privateRoutes = '*',
  unauthedRedirectPath = '/login',
  adminOnly = false,
  ...props
}: AuthProviderProps) {
  const router = useRouter();
  const link = useAppLink();

  const { userId, signOut, isReady, status, roles, getAuthToken, authToken } =
    useFirebase();

  useEffect(() => {
    setCookie(authToken);
  }, [authToken]);

  useEffect(() => {
    if (!isReady) return;

    if (privateRoutes === '*' && publicRoutes.includes(router.pathname)) return;

    if (publicRoutes === '*' && !privateRoutes.includes(router.pathname))
      return;

    const login = `${link(
      App.Signup,
      unauthedRedirectPath,
    )}?redirect=${encodeURIComponent(window.location.href)}`;

    if (adminOnly && !roles.includes(Role.Admin)) {
      window.location.href = login;
    } else if (roles.length === 0) {
      window.location.href = login;
    }
  }, [router.pathname, isReady]);

  // const value = useMemo(
  //   (): IAuthContext => ({
  //     isReady,
  //     status,
  //     logout: signOut,
  //     roles,
  //     userId,
  //     getAuthToken,
  //   }),
  //   [isReady, status, firebaseUser],
  // );

  return (
    <AuthContext.Provider
      value={{
        isReady,
        status,
        logout: signOut,
        roles,
        userId,
        getAuthToken,
        authToken,
      }}
      {...props}
    />
  );
}
