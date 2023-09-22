import React, { useEffect } from 'react';
import { AuthProviderType, AuthType, useAuthRedirect } from '@gated/app';
import { useSetAtom } from 'jotai';
import { colorModeAtom, viewportAtom } from '@/store';
import { useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { TryAgain } from '@components/signup/TryAgain';

export const Error = () => {
  const { redirectToAuth, loading } = useAuthRedirect(
    AuthProviderType.Google,
    AuthType.SignUp,
    '/signup/activate',
    undefined,
    undefined,
    false,
  );

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

  return (
    <TryAgain
      title="Ok, this is awkward..."
      description="Something went wrong."
      buttonText="Try again"
      buttonOnClick={redirectToAuth}
      buttonLoading={loading}
      linkLabel="We are sorry you got this error, please contact our team for assistance via"
      linkText="support@gated.com"
      linkHref="mailto:support@gated.com"
    />
  );
};
