import nookies from 'nookies';
import { AuthError } from '@gated/app';

interface IUseAuthReturnValues {
  error: AuthError | null;
  loginHint: string;
  state: string;
  customToken: string;
  clearLoginHint: () => void;
}

export const useAuthReturnValues = (): IUseAuthReturnValues => {
  const error = nookies.get()['auth_error'] as AuthError | null;
  const loginHint = nookies.get()['auth_login_hint'];
  const customToken = nookies.get()['auth_custom_token'];
  const state = nookies.get()['auth_state'];

  const clearLoginHint = () => nookies.destroy(undefined, 'auth_login_hint');

  return { error, loginHint, customToken, state, clearLoginHint };
};
