import {
  Box,
  BoxProps,
  Container,
  Fade,
  HStack,
  Show,
  Stack,
  VStack,
  keyframes,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useAtom, useAtomValue } from 'jotai';
import { Action, actionAtom, dataAtom } from '../../store';
import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';

import { RecentDonations } from '@components/recent-donations/recent-donations';

import { FrequentlyAskedQuestions } from '@components/views/faqs';
import { DonationThankYou } from '@components/views/donation-thankyou';
import { BypassThankYou } from '@components/views/bypass-thankyou';
import { Bypass } from '@components/views/bypass';
import { Donation } from '@components/views/donation';
import { Stats } from '@components/stats';
import { Header } from '@components/header';
import { HeroContent } from '@components/views/hero-content';
import { noop } from 'lodash';
import { Footer } from '@components/footer';
import Head from 'next/head';
import { useAnalytics } from '@gated/app';

const ActionBox = ({ children, ...props }: BoxProps) => {
  return (
    <VStack
      borderTop="10px solid"
      borderColor="brand.500"
      width={{ base: 'full', md: '400px' }}
      minW={{ base: 'full', md: '400px' }}
      backgroundColor="bg-surface"
      borderRadius="xl"
      shadow="lg"
      p={8}
      right="0"
      top="12"
      {...props}
    >
      <Fade in>
        <VStack align="start" spacing={5}>
          {children}
        </VStack>
      </Fade>
    </VStack>
  );
};

interface IChallengeContext {
  setAction: (action: Action) => void;
  scrollToTop: () => void;
}
export const ChallengeContext = createContext<IChallengeContext>({
  setAction: noop,
  scrollToTop: noop,
});

export const useChallenge = () => {
  return useContext(ChallengeContext);
};

export default function Challenge() {
  const [animateActionBox, setAnimateActionBox] = useState(false);
  const [, setData] = useAtom(dataAtom);
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;
  const [action, setActionAtom] = useAtom(actionAtom);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollToActionArea = useBreakpointValue({ base: true, lg: false });

  const { track } = useAnalytics();

  const setAction = (action: Action) => {
    setAnimateActionBox(true);

    if (scrollToActionArea)
      window.scrollTo({
        behavior: 'smooth',
        top: contentRef.current.offsetTop + 300,
      });
    setTimeout(() => setAnimateActionBox(false), 500);
    setActionAtom(action);
  };

  useEffect(() => {
    track(`challenge_${action}_started`);
  }, [action]);

  const actionBoxEmphasize = keyframes`
      0%{transform: scale(1.0)}
      50%{transform: scale(1.06)}
      100%{transform: scale(1.0)}
    `;

  const ActionContent = memo(() => {
    if (data.hasDonation) {
      return <DonationThankYou />;
    } else if (data.hasExpected) {
      return <BypassThankYou />;
    } else if (action === 'expected') {
      return <Bypass />;
    } else {
      return <Donation />;
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: contentRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <ChallengeContext.Provider value={{ setAction, scrollToTop }}>
      <Head>
        <title>Reach {data.firstName} with Gated</title>
      </Head>
      <Box w="full" position="relative">
        <Container pb={12}>
          <Header textColor="white" markDotColor="white" />
          <HStack alignItems="start" spacing={12}>
            <Box w={{ base: 'full', lg: 'auto' }}>
              <HeroContent contentRef={contentRef} />
              <Show below="lg">
                <VStack spacing={8} w="full">
                  <ActionBox
                    mt={-12}
                    animation={
                      animateActionBox && `${actionBoxEmphasize} 0.2s linear`
                    }
                  >
                    <ActionContent />
                  </ActionBox>

                  <Stack
                    direction={{ base: 'column', md: 'row' }}
                    alignItems="center"
                    w="full"
                    spacing={5}
                  >
                    <RecentDonations />
                    <Stats />
                  </Stack>
                </VStack>
              </Show>
              <FrequentlyAskedQuestions />
            </Box>
            <Show above="lg">
              <ActionBox
                animation={
                  animateActionBox && `${actionBoxEmphasize} 0.2s linear`
                }
                position="sticky"
              >
                <ActionContent />
              </ActionBox>
            </Show>
          </HStack>
        </Container>
      </Box>
      <Footer />
    </ChallengeContext.Provider>
  );
}
