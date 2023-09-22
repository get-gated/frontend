import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';

import { colorModeAtom, viewportAtom } from '@/store';

import {
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';

import { GiveAccess } from '@components/signup/GiveAccess';
import { Spinner } from '@gated/ui/components';
import {
  AuthError,
  AuthProviderType,
  AuthStatus,
  AuthType,
  useAuth,
  useAuthPopup,
} from '@gated/app';
import { useAnalytics } from '@gated/app';

import { HowItWorksModal } from '@components/signup/HowItWorksModal/HowItWorksModal';
import { gql } from '@apollo/client';
import { useSignupActivateLazyQuery } from '@gated/graphql-types';
import { App, useAppLink, useSignIn } from '@gated/app/hooks';

import { useAuthReturnValues } from '@hooks/use-auth-error-return-values.hook';

gql`
  query signupActivate {
    me {
      isSignupCompleted
    }
  }
`;

export const Activate = () => {
  const { track } = useAnalytics();
  const router = useRouter();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const appLink = useAppLink();

  const { popupAuth } = useAuthPopup({
    authProvider: AuthProviderType.Google,
    authType: AuthType.Link,
    redirectPath: '/loading',
    onSuccess: () => {
      router.push('/signup/success');
    },
    onCancel: () => {
      router.push('/signup/privacy');
    },
  });

  const { status } = useAuth();
  const { signIn, error, complete: signInCompleted } = useSignIn();

  const { error: authErrorCode } = useAuthReturnValues();

  const [getData, { data }] = useSignupActivateLazyQuery({
    fetchPolicy: 'cache-first',
  });

  const setViewport = useSetAtom(viewportAtom);
  const setColorMode = useSetAtom(colorModeAtom);

  const viewport = useBreakpointValue(
    {
      base: 'mobile',
      md: 'tablet',
      xl: 'desktop',
    },
    {
      fallback: 'mobile',
    },
  );

  const { colorMode } = useColorMode();

  useEffect(() => {
    if (viewport) setViewport(viewport);
    if (colorMode) setColorMode(colorMode);
  }, [viewport, colorMode, setViewport, setColorMode]);

  useEffect(() => {
    signIn();
  }, [signIn]);

  useEffect(() => {
    if (status !== AuthStatus.SignedIn) return;
    getData();
  }, [status, getData]);

  useEffect(() => {
    if (!signInCompleted) return;
    track('user_signup_joined');
  }, [signInCompleted, track]);

  useEffect(() => {
    if (!data) return;

    if (data.me.isSignupCompleted === true) {
      window.location.href = appLink(App.Dashboard, '/app');
    }
  }, [data, appLink]);

  useEffect(() => {
    if (!authErrorCode) return;
    switch (authErrorCode) {
      case AuthError.OauthFlowCancelled:
        router.replace('/signup');
        break;
      default:
        router.replace('/signup/error');
    }
  }, [authErrorCode, router]);

  const handleActivate = async () => {
    await track('user_signup_activation_attempted');
    popupAuth();
  };

  if (error) router.push('/signup/error');

  if (!signInCompleted) return <Spinner />;

  return (
    <>
      <GiveAccess
        title="Almost there..."
        description="We need a bit more access in order to finish setting up your Gated account."
        buttonLabel="Give Access"
        buttonOnClick={handleActivate}
        linkLabel="Show me how it works first"
        linkOnClick={onOpen}
      />
      <HowItWorksModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
