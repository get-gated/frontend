import {
  Box,
  Text,
  HStack,
  Flex,
  Badge,
  Spacer,
  SkeletonText,
  useInterval,
  keyframes,
  VStack,
  Heading,
  Center,
} from '@chakra-ui/react';
import donations from './recent-donations.json';
import { formatCurrencyUtil } from '@gated/utils';
import { SenderAvatar } from '@gated/ui/components';

import { IoHeartOutline as DonationIcon } from 'react-icons/io5';
import { memo, useRef, useState } from 'react';
import { HighlightBox } from '@components/highlight-box';
import { useAtomValue } from 'jotai';
import { dataAtom } from '../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';

const formattedDonations = donations.map((d, id) => ({ ...d, id }));

export const RecentDonations = memo(() => {
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;

  useInterval(() => {
    const newDonations = [getRandomDonation(), ...currentDonations];
    setCurrentDonations(newDonations.slice(0, 5));
  }, 3000);
  const usedDonations = useRef([]);

  const getRandomDonation = () => {
    const randomIndex = Math.floor(Math.random() * formattedDonations.length);
    if (currentDonations?.find((donation) => donation.id === randomIndex))
      return getRandomDonation();
    usedDonations.current.push(randomIndex);
    return formattedDonations[randomIndex];
  };

  const [currentDonations, setCurrentDonations] = useState<
    { d: string; a: number; id: number; isInitial?: boolean }[]
  >([
    { ...getRandomDonation(), isInitial: true },
    { ...getRandomDonation(), isInitial: true },
    { ...getRandomDonation(), isInitial: true },
  ]);

  const entryKeyframes = keyframes`
      0%{max-height:0; opacity: 0}
      80%{max-height:500px; opacity: 0; transform: scale(.9)}
      90%{ transform: scale(1.1)}
      100%{max-height:500px; opacity:1; transform: scale(1)}
    `;
  const entryAnimation = `${entryKeyframes} 1s ease-in`;

  const getAmountColor = (amount: number) => {
    let amountColor = 'purple';
    if (amount > 1000) amountColor = 'pink';
    if (amount > 2500) amountColor = 'teal';
    if (amount > 5000) amountColor = 'cyan';
    if (amount > 7500) amountColor = 'orange';
    return amountColor;
  };

  return (
    <HighlightBox
      heading="Recent Donations From..."
      headingIcon={DonationIcon}
      w={{ base: 'full', lg: '368px', xl: '325px' }}
      infoTooltip="Actual donations to Gated users from shown sender domains."
    >
      <Box
        textAlign="center"
        position="relative"
        height="120px"
        overflow="hidden"
        sx={{
          maskImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 90%);',
        }}
      >
        {!data.hasDonation &&
          currentDonations.map((donation) => {
            return (
              <Box
                animation={!donation.isInitial && entryAnimation}
                overflow="hidden"
                key={donation.id}
              >
                <Flex
                  w="full"
                  px={2}
                  py={2}
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.50"
                >
                  <HStack textOverflow="ellipsis" overflow="hidden">
                    <SenderAvatar
                      sender={donation.d}
                      boxSize="4"
                      mr={0}
                      pr={0}
                    />
                    <SkeletonText speed={0} noOfLines={1} />
                    <Text pr={2} noOfLines={1} color="white">
                      @{donation.d}
                    </Text>
                  </HStack>
                  <Spacer />
                  <Badge
                    fontWeight="semibold"
                    colorScheme={getAmountColor(donation.a)}
                  >
                    {formatCurrencyUtil(donation.a)}
                  </Badge>
                </Flex>
              </Box>
            );
          })}

        {data.hasDonation && (
          <VStack height="90%" as={Center} spacing={3}>
            <HStack overflow="hidden" textOverflow="ellipsis" maxW="80%">
              <SenderAvatar
                forceDomain
                sender={data.senderEmail}
                boxSize="5"
                mr={0}
                pr={0}
              />
              <Heading size="sm" noOfLines={1} color="white">
                {data.senderEmail}
              </Heading>
            </HStack>
            <Badge
              fontWeight="semibold"
              colorScheme={getAmountColor(data.donationAmountInCents)}
              fontSize="xl"
              py={2}
              px={4}
            >
              {formatCurrencyUtil(data.donationAmountInCents)}
            </Badge>
          </VStack>
        )}
      </Box>
    </HighlightBox>
  );
});
