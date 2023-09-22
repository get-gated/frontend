import { Button, Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import { App, useAppLink } from '@gated/app/hooks';
import { useAtomValue } from 'jotai';
import { dataAtom } from '../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';

export const GetStarted = () => {
  const appLink = useAppLink();
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;
  return (
    <>
      <Divider />
      <Heading size="sm" textAlign="center" w="full">
        Get Gated for your Inbox. 100% Free!
      </Heading>
      <Button
        w="full"
        variant="secondary"
        as="a"
        href={appLink(App.Signup, `/?ref=${data.referralCode}`)}
      >
        Get Started
      </Button>
    </>
  );
};
