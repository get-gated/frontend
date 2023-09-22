import { AuthProviderType as Provider, AuthType } from './auth.enums';
import { appUrl } from '@gated/utils/src/api.utils';
import { useApi } from '../hooks';
import nookies from 'nookies';
import AUTH_PATHS from './auth-paths.json';

interface IUseAuthRedirect {
  redirectToAuth: (clientState?: string) => Promise<void>;
  error: any;
  loading: boolean;
}

export const useAuthRedirect = (
  provider: Provider,
  type: AuthType,
  redirectPath: string,
  defaultNonprofitId?: string,
  activate?: boolean,
  linkAccount = true,
): IUseAuthRedirect => {
  const [execute, { loading, error }] = useApi(AUTH_PATHS[type]);
  const loginHint = nookies.get(undefined)['auth_login_hint'];

  const redirectToAuth = async (clientState = '') => {
    const { data, error } = await execute({
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({
        provider,
        clientState,
        redirect: appUrl(redirectPath),
        loginHint,
        defaultNonprofitId,
        activate,
        linkAccount,
      }),
    });
    if (error) return;
    window.location.href = data.url;
  };

  return { redirectToAuth, error, loading };
};
