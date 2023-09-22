import {
  Heading,
  ModalBody,
  Textarea,
  Text,
  VStack,
  HStack,
  Icon,
  Box,
  Center,
  Avatar,
  Show,
  keyframes,
  ModalFooter,
  Flex,
  Spacer,
  Button,
  ModalHeader,
} from '@chakra-ui/react';

import React, { useState } from 'react';

import { useUserChallengeSettingsMutation } from '@gated/graphql-types';

import { IoInformationCircleOutline as InfoIcon } from 'react-icons/io5';

import { NonprofitStepProps } from '@components/NonprofitModal';
import { useNonprofit } from '@components/NonprofitModal/context';
import { useMe } from '@gated/app';

export function StepReason({ onDone, onBack }: NonprofitStepProps) {
  const { user } = useMe();
  const [reason, setReason] = useState('');
  const { selected } = useNonprofit();

  const [updateChallengeSettings, { loading }] =
    useUserChallengeSettingsMutation();
  const onSave = () => {
    updateChallengeSettings({
      variables: {
        input: {
          nonprofitId: selected.id,
          nonprofitReason: reason,
        },
      },
    }).then(() => {
      onDone();
    });
  };

  const examples = [
    'We’ve all been touched by cancer in some way. The American Cancer Society has been there for my family on multiple occasions.',
    'I’m an animal lover! I support Save the Whales because the Orca is my spirit animal.',
    'I work in software and love how the small nonprofit Bridging Tech gives underprivileged kids the tech they need to succeed.',
  ];

  const exampleOpacityFrames = keyframes`
    0% { opacity: 0;  content: "${examples[0]}"}
    3% { opacity: 1; content: "${examples[0]}"}
    30% {opacity: 1; content: "${examples[0]}"}
    33.33% {opacity: 0; content: "${examples[0]}"}
    33.34% {opacity: 0; content: "${examples[1]}"}
    36% {opacity: 1; content: "${examples[1]}"}
    63% {opacity: 1; content: "${examples[1]}"}
    66.66% {opacity: 0;  content: "${examples[1]}"}
    66.67% {opacity: 0;  content: "${examples[2]}"}
    70% {opacity: 1; content: "${examples[2]}"}
    96% { opacity: 1; content: "${examples[2]}"}
    100% { opacity: 0; ; content: "${examples[2]}"}
  `;

  return (
    <>
      <ModalHeader>Select Your Nonprofit</ModalHeader>
      <ModalBody as={VStack} alignItems="start" spacing={4}>
        <Heading size="md">Why did you choose this nonprofit?</Heading>
        <Text>
          Let the world know why{' '}
          <Text as="span" color="accent-brand" fontWeight="semibold">
            {selected.name}
          </Text>{' '}
          is important to you.
        </Text>
        <HStack w="full" alignItems="start" pt={4}>
          <Show above="lg">
            <Avatar src={user.avatar} name={user.fullName} mr={4} />
          </Show>
          <VStack spacing={4}>
            <Box position="relative" w="full">
              <Center
                position="absolute"
                top={4}
                left={8}
                right={8}
                bottom={4}
                opacity={0.4}
                fontStyle="italic"
                display={reason.length > 0 && 'none'}
                textAlign="center"
                _after={{
                  content: '""',
                  animation: `${exampleOpacityFrames} 15s infinite`,
                }}
              ></Center>
              <Textarea
                h={{ base: 32, sm: 'auto' }}
                autoFocus
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                backgroundColor="transparent"
              />
            </Box>
            <HStack alignItems="start">
              <Icon as={InfoIcon} mt={1} />
              <Text textStyle="caption">
                We share this information publicly to personalize your Gated
                experience and maximize impact for your cause.
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </ModalBody>
      <ModalFooter as={Flex}>
        <Button variant="tertiary" onClick={onDone}>
          Skip
        </Button>
        <Spacer />
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="primary"
          onClick={onSave}
          ml={2}
          disabled={loading || reason.length < 10}
          isLoading={loading}
        >
          Share
        </Button>
      </ModalFooter>
    </>
  );
}
