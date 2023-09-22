import { AuthProviderType as Provider, AuthType } from './auth.enums';
import { appUrl } from '@gated/utils/src/api.utils';
import { useApi } from '../hooks';
import nookies from 'nookies';
import AUTH_PATHS from './auth-paths.json';
import { useMemo, useState } from 'react';
import { noop } from 'lodash';

interface IUseAuthPopup {
  popupAuth: () => void;
  isOpen: boolean;
  lastLogin: string;
  error?: string;
}

export interface UseAuthPopupProps {
  authProvider: Provider;
  authType: AuthType;
  redirectPath: string;
  onSuccess?: () => any | void;
  onError?: (string) => any | void;
  onCancel?: () => any | void;
  nonprofitId?: string;
  clientState?: string;
  loginHint?: string;
  onOpen?: () => void;
  onClose?: () => void;
  additionalReqParams?: any;
}

export const useAuthPopup = ({
  authProvider,
  authType,
  redirectPath,
  onSuccess = noop,
  onError = noop,
  onCancel = noop,
  onOpen = noop,
  onClose = noop,
  nonprofitId,
  clientState = undefined,
  loginHint = undefined,
  additionalReqParams = {},
}: UseAuthPopupProps): IUseAuthPopup => {
  const [, , url] = useApi(AUTH_PATHS[authType]);
  const [isOpen, setIsOpen] = useState(false);
  const lastLogin = nookies.get(undefined)['auth_login_hint'];
  const error = nookies.get(undefined)['auth_error'];

  const popupUrl = useMemo(() => {
    if (!url) return;
    const u = new URL(url);
    u.searchParams.set('provider', authProvider);
    u.searchParams.set('redirect', appUrl(redirectPath));

    clientState && u.searchParams.set('clientState', clientState);
    loginHint && u.searchParams.set('loginHint', loginHint);

    nonprofitId && u.searchParams.set('defaultNonprofitId', nonprofitId);

    Object.keys(additionalReqParams).forEach((key) => {
      u.searchParams.set(key, additionalReqParams[key]);
    });

    return u;
  }, [authProvider, clientState, redirectPath, loginHint, nonprofitId, url]);

  const popupAuth = (height = 700, width = 400) => {
    nookies.destroy(undefined, 'auth_error');
    nookies.destroy(undefined, 'auth_state');
    nookies.destroy(undefined, 'auth_custom_token');

    setIsOpen(true);
    onOpen();

    //todo: fix calc for multi display
    const top = undefined; //window.top.outerHeight / 2 + window.top.screenY - height / 2;
    const left = undefined; //window.top.outerWidth / 2 + window.top.screenX - width / 2;
    const newWindow = window.open(
      popupUrl,
      'gated_oauth_window',
      `height=${height},width=${width},top=${top},left=${left}`,
    );

    const timer = setInterval(function () {
      try {
        if (newWindow.closed) {
          clearInterval(timer);
          setIsOpen(false);
          onCancel();
          onClose();
        }
        if (newWindow.document.URL.indexOf(appUrl(redirectPath)) != -1) {
          window.clearInterval(timer);
          const error = nookies.get(undefined)['auth_error'];
          if (error) {
            onError(error);
          } else {
            onSuccess();
          }
          newWindow.close();
          onClose();
          setIsOpen(false);
        }
      } catch (e) {
        // Do nothing
      }
    }, 500);
  };

  return { popupAuth, isOpen, lastLogin, error };
};
