import { useAtom, useAtomValue } from 'jotai';
import { Action, dataAtom, tokenAtom } from '../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';
import React, { useState } from 'react';
import { useMarkExpected } from '@hooks/use-mark-expected.hook';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Heading,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { PersonalizedNote } from '@components/personalized-note';
import { useChallenge } from '@components/views/challenge.view';
import { useAnalytics } from '@gated/app';

export function Bypass() {
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;
  const token = useAtomValue(tokenAtom) as string;
  const { setAction, scrollToTop } = useChallenge();
  const [note, setNote] = useState('');
  const { track } = useAnalytics();
  const [, setData] = useAtom(dataAtom);

  const { markExpected, loading } = useMarkExpected();

  const onSuccess = () => {
    track(`challenge_expected_completed`);
    setData({ ...data, hasExpected: true });
    scrollToTop();
  };
  return (
    <>
      <Box textAlign={{ base: 'center', lg: 'left' }} w="full">
        <Heading size="md" pb={2}>
          Request a Donation Exemption
        </Heading>
        <VStack>
          <Text>
            Donations are not required if you know {data.firstName} personally
            or they are expecting your message.
          </Text>

          <Alert
            status="info"
            variant="left-accent"
            alignItems="start"
            colorScheme="mustardShade"
          >
            <AlertIcon />
            {data.firstName} will need to approve this request before your
            message is delivered.
          </Alert>
        </VStack>
      </Box>

      <Divider />

      <Text color="muted">
        <strong>Tip:</strong> Donations make a good impression and get higher
        response rates.
      </Text>
      <PersonalizedNote
        value={note}
        placeholder={`Hi ${data.firstName}, we met John's dinner party the other night. Looking forward to chatting!`}
        onChange={(e) => setNote(e.target.value)}
        autoFocus
      />
      <Tooltip
        isDisabled={note.length > 0}
        label="Please add a note above first."
      >
        <Button
          variant="primary"
          isLoading={loading}
          isDisabled={loading || note.length === 0}
          onClick={() => {
            markExpected(
              {
                token,
                personalizedNote: note,
              },
              () => {
                onSuccess();
              },
            );
          }}
          w="full"
        >
          Request Exemption
        </Button>
      </Tooltip>
      <Button
        variant="tertiary"
        w="full"
        onClick={() => setAction(Action.Donate)}
      >
        Make a Donation Instead
      </Button>
    </>
  );
}
