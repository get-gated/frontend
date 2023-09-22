import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthError } from '@gated/app';
import { useAnalytics } from '@gated/app';
import { Spinner } from '@gated/ui/components';
import { useSetAtom } from 'jotai';
import { colorModeAtom, viewportAtom } from '@/store';
import { useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { gql } from '@apollo/client';
import { useSignupSuccessQuery } from '@gated/graphql-types';
import { useAuthReturnValues } from '@hooks/use-auth-error-return-values.hook';
import { App, useAppLink } from '@gated/app/hooks';
import { Congrats } from '@components/signup/Congrats/Congrats';

gql`
  query signupSuccess {
    me {
      notificationSettings {
        email
      }
    }
  }
`;

export const Success = () => {
  const { track } = useAnalytics();
  const router = useRouter();
  const { error, clearLoginHint } = useAuthReturnValues();
  const { data: meData, loading: meLoading } = useSignupSuccessQuery({
    fetchPolicy: 'cache-first',
  });
  const appLink = useAppLink();

  const email = meData?.me.notificationSettings.email;

  const handleClick = () => {
    clearLoginHint();
    window.location.href = appLink(App.Dashboard, '/app');
  };

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
    if (error) {
      track('user_signup_activation_failed', { code: error });
      router.replace(
        `/signup/${
          error === AuthError.OauthFlowCancelled ? 'privacy' : 'error'
        }`,
      );
      window.focus();
    }
  }, [error, router, track]);

  useEffect(() => {
    if (!meData) return;
    track('user_signup_activated');
  }, [meData, track]);

  if (meLoading || error) return <Spinner />;

  return (
    <Congrats
      description="Congrats! Gated is live"
      email={email}
      buttonText="Go To My Dashboard"
      buttonOnClick={handleClick}
    />
  );
};
