import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import {
  chakra,
  Box,
  useBreakpointValue,
  useColorMode,
  Show,
  shouldForwardProp,
  Heading,
  Image,
  Center,
  VStack,
} from '@chakra-ui/react';

import { LogoMarquee, Header, Footer } from '@components';
import { useAuthReturnValues } from '@hooks/use-auth-error-return-values.hook';
import { colorModeAtom, viewportAtom } from '@/store';

import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';
import { Meta } from '@gated/ui/components';
import { QuoteBlock } from './QuoteBlock';

import quoteJennImage from '@assets/images/squeeze-page/zen-inbox.svg';
import protectedImage from '@assets/images/squeeze-page/protected-inbox.svg';
import contactsImage from '@assets/images/squeeze-page/contacts.svg';

import { css, Global } from '@emotion/react';
import { motion, isValidMotionProp } from 'framer-motion';

const metaProps = {
  title: 'Stop Unwanted Email & Support Your Favorite Charity | Gated',
  description:
    'Gated blocks unwanted emails, stops email overload & filters emails by challenging unknown senders to donate to reach you. Add Gated to your work inbox now!',
};
export const globalStyleOverrides = css`
  body {
    background: white !important;
  }
`;

const BackgroundElements = () => {
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });

  return (
    <>
      <ChakraBox
        top={{ base: '100px', md: '50px' }}
        zIndex="hide"
        style={{
          position: 'absolute',
          left: '-10px',
          zIndex: -1,
          width: '321px',
          height: '527px',
        }}
      >
        <Image src="/images/squeeze-page/squeeze-bg-6.svg" alt="" />
      </ChakraBox>
      <Show above="md">
        <ChakraBox
          style={{
            position: 'absolute',
            left: '100px',
            zIndex: -1,
            width: '736px',
            height: '271px',
          }}
        >
          <Image src="/images/squeeze-page/squeeze-bg-1.svg" alt="" />
        </ChakraBox>
      </Show>
    </>
  );
};

export const SqueezePage = () => {
  const { clearLoginHint } = useAuthReturnValues();
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

  const pageRef = useRef<HTMLDivElement>(null);
  const showStickyHeaderTargetRef = useRef<HTMLDivElement>(null);

  const { colorMode } = useColorMode();

  useEffect(() => {
    if (viewport) setViewport(viewport);
    if (colorMode) setColorMode(colorMode);
  }, [viewport, colorMode, setViewport, setColorMode]);

  useEffect(() => {
    clearLoginHint();
  }, [clearLoginHint]);

  return (
    <>
      <Global styles={globalStyleOverrides} />
      <Meta {...metaProps} />
      <Box
        ref={pageRef}
        overflowY="scroll"
        h="100vh"
        scrollSnapType="y mandatory"
        position="relative"
      >
        <BackgroundElements />
        <Header
          pageRef={pageRef}
          showStickyHeaderTargetRef={showStickyHeaderTargetRef}
        />
        <Hero
          title="Focus on the emails that matter."
          description="Gated is the easy, free way to reduce unsolicited email and support a nonprofit you love."
          secondaryContent={<Image src={contactsImage.src} />}
        />
        <Box scrollSnapAlign={{ base: 'start', lg: '' }}>
          <LogoMarquee />
        </Box>
        <Box ref={showStickyHeaderTargetRef}></Box>
        <HowItWorks />

        <Center bg="brand.500" minH="100vh" my={20} scrollSnapAlign="start">
          <VStack maxW={{ base: '80%', md: '40%' }} spacing={10}>
            <Image src={protectedImage.src} width="387" height="301px" />

            <Heading size="lg" textAlign="center" lineHeight="150%">
              Gated ensures every email in your inbox is from people you know -
              or those who value your attention.{' '}
            </Heading>
          </VStack>
        </Center>
        <QuoteBlock
          text="Before Gated, my inbox felt like a game of whack-a-mole. Now, the (far fewer) messages in my inbox actually matter and nothing gets lost in the shuffle."
          name="Jenn Steele, CEO of Kissmetrics"
          image={quoteJennImage.src}
          imageAlignment="right"
        />

        <Footer />
      </Box>
    </>
  );
};
