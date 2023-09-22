import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Circle,
  Divider,
  Heading,
  Icon,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from '@chakra-ui/react';

import { IoPlaySkipForwardOutline as BypassIcon } from 'react-icons/io5';
import {
  ConsentResponse,
  useConsentContext,
} from '@components/consent/context';
import { Layout } from '@components/consent/layout';
import { useState } from 'react';

export default function ConsentView() {
  const {
    response,
    setResponse,
    onRespond,
    hasResponded,
    loading,
    expectedEmailAddress,
    expectedPersonalNote,
    consentGrantedAt,
    consentDeniedAt,
    error,
  } = useConsentContext();

  const [completed, setCompleted] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <Circle bg="bg-active" size="50px">
        <Icon as={BypassIcon} color="active" w="50%" h="50%" />
      </Circle>
      <Heading size="md" color="muted">
        Allow without a donation?
      </Heading>
      <Text>
        <strong>{expectedEmailAddress}</strong> has requested to be exempt from
        a donation to reach you.
      </Text>

      {completed && (
        <>
          <Divider />
          <Alert status="info" variant="left-accent">
            <AlertIcon />
            {response === 'GRANTED'
              ? `Thanks for taking the time to approve this request. Their message has been delivered to your inbox, as will all future message from ${expectedEmailAddress}.`
              : "Thanks for taking the time to deny this request. Their message will remain in your Gated folder and we won't give this person an opportunity to reach you in the future."}
          </Alert>
        </>
      )}

      {!hasResponded && !completed && (
        <>
          <Box w="full">
            <Text textStyle="label" w="full">
              Reason from {expectedEmailAddress}
            </Text>
            <Text as={Box} bg="bg-subtle" p={4} w="full" borderRadius="md">
              {expectedPersonalNote}
            </Text>
          </Box>

          <Divider />
          <RadioGroup
            pl={4}
            w="full"
            as={VStack}
            isDisabled={loading}
            alignItems="start"
            value={response}
            onChange={(val) => setResponse(val as ConsentResponse)}
            verticalAlign="top"
          >
            <Radio value="GRANTED" alignItems="start">
              <Heading size="sm" mt="-1">
                Allow
              </Heading>
              <Text textStyle="caption">
                Move their message to my inbox and allow them to reach me
                directly in the future.
              </Text>
            </Radio>
            <Radio value="DENIED" alignItems="start">
              <Heading size="sm" mt="-1">
                Deny
              </Heading>
              <Text textStyle="caption">
                Ignore their message and don&apos;t allow them to reach my inbox
                in the future.
              </Text>
            </Radio>
          </RadioGroup>
          {error && (
            <Text color="error">An error occurred. Please try again.</Text>
          )}
          <Button
            isLoading={loading}
            colorScheme={response === 'DENIED' ? 'destroy' : 'primary'}
            disabled={!response}
            onClick={async () => {
              const { error } = await onRespond();
              if (!error) {
                setCompleted(true);
              }
            }}
            w="full"
          >
            Submit
          </Button>
        </>
      )}

      {hasResponded && (
        <>
          <Divider />
          <Alert status="info" variant="left-accent">
            <AlertIcon />
            <Text>
              You <strong>{consentGrantedAt ? 'accepted' : 'denied'}</strong>{' '}
              this request on{' '}
              <Text as="span" display="inline-block">
                {formatDate(consentGrantedAt || consentDeniedAt)}
              </Text>
              .
            </Text>
          </Alert>
        </>
      )}
    </Layout>
  );
}
