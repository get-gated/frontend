import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';
import { colorModeAtom, viewportAtom } from '@/store';
import { Permissions } from '../Permissions/Permissions';
import { Stack, useBreakpointValue, useColorMode } from '@chakra-ui/react';

import { AuthProviderType, AuthType, useAuthPopup } from '@gated/app';
import { Commitments } from '@components/signup/Commitments';

export const PrivacyPage = () => {
  const router = useRouter();

  const { popupAuth } = useAuthPopup({
    authProvider: AuthProviderType.Google,
    authType: AuthType.Link,
    redirectPath: '/loading',
    onSuccess: () => {
      router.push('/signup/success');
    },
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

  const buttonProps = {
    buttonLabel: 'Try again',
    buttonOnClick: popupAuth,
    homeLabel: 'No thanks',
    homeOnClick: () => router.push('/signup'), // This is used, even though it doesn't appear to be
  };

  return (
    <Stack
      h="100vh"
      w="100%"
      direction={viewport !== 'desktop' ? 'column' : 'row'}
      spacing="0"
    >
      <Permissions
        title="We like to keep your data private, too."
        description="In order to use Gated securely in your inbox, we’re required to ask for these additional permissions."
        {...buttonProps}
      />
      <Commitments />
    </Stack>
  );
};
