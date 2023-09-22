import { createContext, Dispatch } from 'react';
import { AuthProviderType, AuthStatus, AuthType, Role } from './auth.enums';
import { noop } from 'lodash';

export interface IAuthContext {
  auth?: (arg0: AuthProviderType, arg1: AuthType) => Promise<void>;
  isReady: boolean;
  status: AuthStatus;
  logout: () => Promise<void>;
  roles: Role[];
  userId?: string;
  getAuthToken: (forceRefresh?: boolean) => Promise<string>;
  authToken?: string;
}

const AuthContext = createContext<IAuthContext>({
  isReady: false,
  status: AuthStatus.SignedOut,
  logout: () => Promise.resolve(),
  roles: [],
  getAuthToken: () => Promise.resolve(''),
});
AuthContext.displayName = 'AuthContext';

export default AuthContext;
