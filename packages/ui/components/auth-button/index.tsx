import { useDisclosure } from '@chakra-ui/react';
import {
  AuthType,
  useAnalytics,
  useAuth,
  useAuthPopup,
  UseAuthPopupProps,
} from '@gated/app';
import React, { useEffect, useState } from 'react';
import { useSignIn } from '@gated/app/hooks';
import {
  AuthProviderButton,
  AuthProviderButtonProps,
} from './auth-provider.button';
import { ErrorModal } from './error.modal';

export interface AuthButtonProps
  extends Omit<AuthProviderButtonProps, 'onClick'>,
    UseAuthPopupProps {
  authType: AuthType;
  suppressErrorModal?: boolean;
}

function LiveButton(props: AuthButtonProps) {
  const { buttonProps = {}, authType, suppressErrorModal } = props;

  const {
    signIn,
    canSignIn,
    loading: signInLoading,
    complete: signInComplete,
    error: signInError,
  } = useSignIn();

  const { track } = useAnalytics();

  const errorModalDisclosure = useDisclosure();

  const [authComplete, setAuthComplete] = useState(false);

  const handleAuthError = (errorCode: string) => {
    props.onError && props.onError(errorCode);
    if (suppressErrorModal) return;
    errorModalDisclosure.onOpen();
  };

  const { popupAuth, error: authError } = useAuthPopup({
    ...props,
    onSuccess: () => {
      setAuthComplete(true);

      if (authType === AuthType.Link || authType === AuthType.Reauthorize) {
        props.onSuccess();
      }

      errorModalDisclosure.onClose();
    },
    onError: handleAuthError,
  });

  useEffect(() => {
    if (authType === AuthType.Link || authType === AuthType.Reauthorize) return;
    if (!canSignIn || !authComplete) return;
    signIn();
  }, [canSignIn, authComplete, authType]);

  useEffect(() => {
    if (!signInComplete) return;
    onSignInSuccessful();
  }, [signInComplete]);

  const onSignInSuccessful = async () => {
    if (authType === AuthType.SignUp) {
      await track('user_signup_joined');
    }
    props.onSuccess();
  };

  const onClickButton = async () => {
    if (authType === AuthType.SignUp) {
      track('user_signup_intended');
    }
    popupAuth();
  };

  useEffect(() => {
    if (!track) return;
    if (authType === AuthType.SignUp) {
      track('user_signup_visited');
    }
  }, [track]);

  const allButtonProps = {
    ...buttonProps,
    isDisabled: signInLoading,
    shadow: 'md',
  };

  return (
    <>
      <ErrorModal
        onTryAgain={popupAuth}
        errorCode={signInError?.code || authError}
        {...errorModalDisclosure}
      />
      <AuthProviderButton
        {...props}
        buttonProps={allButtonProps}
        onClick={onClickButton}
      />
    </>
  );
}

export function AuthButton(props: AuthButtonProps) {
  const { isReady } = useAuth();

  if (isReady) {
    return <LiveButton {...props} />;
  }

  return <AuthProviderButton {...props} />;
}
