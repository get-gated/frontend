import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';

import { colorModeAtom, viewportAtom } from '@/store';

import {
  Box,
  BoxProps,
  Divider,
  Text,
  useBreakpointValue,
  useColorMode,
  VStack,
} from '@chakra-ui/react';

import { Intro } from '@components/signup/Intro';
import { useAuthReturnValues } from '@hooks/use-auth-error-return-values.hook';
import { logos } from '@components/logo-marquee/logos';
import { Logo } from '@components/logo-marquee/Logo';
import Marquee from 'react-fast-marquee';

export const Signup = () => {
  const router = useRouter();
  const { nonprofitId } = router.query;
  const defaultNonprofitId = nonprofitId ?? undefined;
  const { clearLoginHint } = useAuthReturnValues();

  const handleLink = () => {
    router.push('/login');
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
    clearLoginHint();
  }, [clearLoginHint]);

  useEffect(() => {
    if (viewport) setViewport(viewport);
    if (colorMode) setColorMode(colorMode);
  }, [viewport, colorMode, setViewport, setColorMode]);

  const logoContainerBoxProps: BoxProps =
    viewport === 'mobile'
      ? {
          w: '100%',
          left: 0,
          alignItems: 'center',
          zIndex: 10,
          style: { position: 'fixed', bottom: 0 },
        }
      : {
          borderRadius: '20px',
        };

  return (
    <VStack spacing={{ base: '1rem', md: '3rem' }}>
      <Intro
        title="Sign up for Gated"
        emphasis="It’s free, it’s secure,"
        description="and helps support your favorite cause."
        linkDescription="Already have an account?"
        linkLabel="Login"
        linkOnClick={handleLink}
        nonprofitId={defaultNonprofitId}
      />
      {viewport !== 'mobile' && <Divider />}
      <VStack w="100%" h="100%" direction="column" align="center">
        <VStack spacing="1rem" align="left">
          {viewport !== 'mobile' && (
            <Text as="p" textAlign="left" fontSize="2xl">
              Trusted by executives at
            </Text>
          )}
          <Box bgColor="whiteAlpha.900" {...logoContainerBoxProps}>
            {viewport === 'mobile' && (
              <Text
                m="1rem"
                as="p"
                textAlign="left"
                fontSize="lg"
                color="gray.500"
              >
                Trusted by executives at
              </Text>
            )}
            <Box w="900px" maxW="80vw" m="2.5rem">
              <Marquee gradient={false} pauseOnHover={true} pauseOnClick={true}>
                {logos.map((logo) => (
                  <Logo key={`${logo.caption}`} logo={logo} />
                ))}
              </Marquee>
            </Box>
          </Box>
        </VStack>
      </VStack>
    </VStack>
  );
};
