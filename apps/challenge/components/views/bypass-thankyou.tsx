import { useAtomValue } from 'jotai';
import { dataAtom } from '../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';
import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

import ThankYouImage from '@assets/images/undraw_messaging_fun_re_vic9.svg';
import Image from 'next/image';
import { GetStarted } from '@components/get-started';

export function BypassThankYou() {
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
        We have notified {data.firstName} of your request to reach them without
        a donation.
      </Text>
      <Text textStyle="caption">
        If they approve, your message will be delivered to their inbox.
      </Text>

      <GetStarted />
    </>
  );
}
