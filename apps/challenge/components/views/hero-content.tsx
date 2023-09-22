import {
  Avatar,
  Box,
  Divider,
  Heading,
  Link,
  Show,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Action, dataAtom } from '../../store';
import { RecentDonations } from '@components/recent-donations/recent-donations';
import { Stats } from '@components/stats';
import React, { MutableRefObject } from 'react';
import { useAtomValue } from 'jotai';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';
import { useChallenge } from '@components/views/challenge.view';
import { BackgroundArt } from '@components/background-art';

export const HeroContent = ({
  contentRef,
}: {
  contentRef: MutableRefObject<HTMLDivElement>;
}) => {
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;
  const { setAction } = useChallenge();
  return (
    <BackgroundArt>
      <Stack
        ref={contentRef}
        pb={{ base: 12, lg: 6 }}
        color="white"
        direction={{ base: 'column', lg: 'row' }}
        spacing={6}
        alignItems={{ base: 'center', lg: 'start' }}
      >
        <Avatar
          src={data.avatar}
          name={data.fullName}
          size="xl"
          borderWidth={3}
          borderColor="white"
        />
        <VStack
          spacing={{ base: 5, lg: 10 }}
          align={{ base: 'center', lg: 'start' }}
          textAlign={{ base: 'center', lg: 'left' }}
          pb={{ base: 5, lg: 1 }}
        >
          <Heading>
            <Text as="span" fontWeight="normal">
              Reach Me &{' '}
            </Text>
            <Show above="lg">
              <br />
            </Show>
            <strong>
              Make an{' '}
              <Text as="span" color="accent-brand">
                Impact
              </Text>
            </strong>
          </Heading>
          <Heading size="md">
            I use Gated to stay focused{' '}
            <Text as="span" textTransform="uppercase">
              and
            </Text>{' '}
            support my favorite cause:{' '}
            <Text as="span" color="accent-brand" display="inline-block">
              {data.nonprofitName}
            </Text>
          </Heading>
          {!data.hasExpected && !data.hasDonation && (
            <Box>
              <Text as="p" pb={2}>
                To reach my inbox,{' '}
                <strong>
                  <Link onClick={() => setAction(Action.Donate)}>
                    please make a donation.
                  </Link>
                </strong>
              </Text>

              <Text as="p" pb={3}>
                If I know you or I&apos;m expecting your message, you can{' '}
                <strong>
                  <Link onClick={() => setAction(Action.Bypass)}>
                    request an exemption.
                  </Link>
                </strong>
              </Text>
            </Box>
          )}

          <Show above="lg">
            <Divider variant="brand" size="sm" />

            <Wrap direction="row" alignItems="center" spacing={4}>
              <WrapItem>
                <RecentDonations />
              </WrapItem>
              <WrapItem>
                <Stats />
              </WrapItem>
            </Wrap>
          </Show>
        </VStack>
      </Stack>
    </BackgroundArt>
  );
};
