import React from 'react';
import { Circle, Divider, Icon, Stack, Text } from '@chakra-ui/react';
import {
  HiOutlineInboxIn as ReceivedIcon,
  BiBrain as DecisionIcon,
  BiSend as ChallengeIcon,
} from 'react-icons/all';

export const MessageDetail = () => {
  return (
    <>
      <Text>John Smith</Text>
      <Text>john@smith.com</Text>
      <Text>Gated</Text>

      <Stack spacing={0}>
        <TimelineItem
          title="Message Received"
          description="test"
          EntryIcon={ReceivedIcon}
        />
        <TimelineItem
          title="Decision Made"
          description="test"
          EntryIcon={DecisionIcon}
        />
        <TimelineItem
          title="Challenge Sent"
          description="test"
          EntryIcon={ChallengeIcon}
        />
        <TimelineItem
          title="Donation Received"
          description="test"
          EntryIcon={ReceivedIcon}
        />
      </Stack>
    </>
  );
};

const TimelineItem = ({ isLast = false, title, description, EntryIcon }) => (
  <Stack spacing="4" direction="row">
    <Stack spacing="0" align="center">
      <Circle size="8" borderWidth="2px" borderColor="blue.700">
        <Icon as={EntryIcon} color="blue.700" boxSize="5" />
      </Circle>
      <Divider
        orientation="vertical"
        borderWidth="1px"
        borderColor={isLast ? 'transparent' : 'blue.700'}
      />
    </Stack>
    <Stack spacing="0.5" pb="8">
      <Text color="emphasized" fontWeight="medium">
        {title}
      </Text>
      <Text color="muted">{description}</Text>
    </Stack>
  </Stack>
);
