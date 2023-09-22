import { useAtomValue } from 'jotai';
import { dataAtom } from '../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';

import { Box, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import ThankYouImage from '@assets/images/undraw_winners_re_wr1l 2.svg';
import Image from 'next/image';
import { GetStarted } from '@components/get-started';
import { formatCurrencyUtil } from '@gated/utils';
import { Share } from '@components/share';

export function DonationThankYou() {
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;

  return (
    <>
      <Heading size="md">Thanks!</Heading>

      <Box w="full" textAlign="center">
        <Image
          src={ThankYouImage.src}
          alt="Thank You!"
          width="200px"
          height="200px"
        />
      </Box>
      <Text>
        Your <strong>{formatCurrencyUtil(data.donationAmountInCents)}</strong>{' '}
        donation has been received and your message has been moved to{' '}
        {data.firstName}’s inbox.
      </Text>
      <Text textStyle="caption">
        You’ll get an email receipt of your transaction at {data.senderEmail}{' '}
        shortly.
      </Text>

      <Divider />
      <VStack w="full">
        <Heading size="sm">Share Your Donation Experience</Heading>
        <Share nonprofitName={data.nonprofitName} />
      </VStack>

      <GetStarted />
    </>
  );
}
