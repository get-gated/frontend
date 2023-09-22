import React, { memo, ReactNode } from 'react';
import { QueryResult } from '@apollo/client';
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  Select,
  SimpleGrid,
  Skeleton,
  Spacer,
  Spinner,
  Stack,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Pagination, RelativeTime } from '@gated/ui/components';
import { RuleTag } from '@components/rule-tag';

import { HiOutlineInboxIn, HiOutlinePaperAirplane } from 'react-icons/hi';
import { formatCurrencyUtil } from '@gated/utils';

import {
  ChallengeInteractionEnum,
  ChallengeWitholdReasonEnum,
  Message,
  MessageParticipant,
  MessageQuery,
  MessagesQuery,
  MessageTypeEnum,
  RuleEnum,
  TrainingOriginEnum,
  VerdictEnum,
} from '@gated/graphql-types';

const formatParticipant = (participants: MessageParticipant[]) => {
  const items: ReactNode[] = [];
  items.push(<Text noOfLines={1}>{participants[0].emailAddress}</Text>);
  const more = participants.length - 1;
  if (more > 0) {
    items.push(<Tag>+{more} more</Tag>);
  }

  return items;
};

interface MessagesViewProps {
  queryMessages: QueryResult<MessagesQuery, any>;
  queryMessage: QueryResult<MessageQuery, any>;
  onSearch: (query?: string, type?: MessageTypeEnum) => void;
  onSelectItem: (messageId: string) => void;
  selectedItem: string;
  query?: string;
  type?: MessageTypeEnum;
  onPrevPage: (cursor: string) => void;
  onNextPage: (cursor: string) => void;
  onTypeChange: (type?: MessageTypeEnum) => void;
}
export const MessagesView = memo<MessagesViewProps>(
  ({
    queryMessages,
    queryMessage,
    onSearch,
    onSelectItem,
    selectedItem,
    query,
    type = '',
    onNextPage,
    onPrevPage,
    onTypeChange,
  }) => {
    return (
      <Box minHeight="500px">
        <Flex pb={5}>
          <Box flex={1} mr={3}>
            <Input
              width="100%"
              placeholder="Search From name or email"
              onChange={(e) => onSearch(e.target.value)}
              defaultValue={query}
            />
          </Box>
          <Select
            placeholder="All"
            defaultValue={type}
            maxW={150}
            onChange={(e) => onTypeChange(e.target.value as MessageTypeEnum)}
          >
            <option value={MessageTypeEnum.Sent}>Sent</option>
            <option value={MessageTypeEnum.Received}>Received</option>
          </Select>
        </Flex>
        <SimpleGrid columns={2} spacing={5}>
          <VStack divider={<Divider />}>
            {queryMessages.loading &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <MessagePreview
                  key={i}
                  isSelected={false}
                  onClick={() => null}
                  loading={true}
                  message={
                    {
                      from: { emailAddress: 'joe@schmoe.com' },
                      to: [{ emailAddress: 'cow@mow.com' }],
                    } as Message
                  }
                />
              ))}
            {queryMessages.data?.messages.edges.map((edge) => (
              <MessagePreview
                message={edge.node as Message}
                key={edge.node.id}
                isSelected={selectedItem === edge.node.id}
                onClick={() => onSelectItem(edge.node.id)}
              />
            ))}
            <Pagination
              totalResults={queryMessages.data?.messages.pageInfo.totalResults}
              hasNextPage={queryMessages.data?.messages.pageInfo.hasNextPage}
              hasPreviousPage={
                queryMessages.data?.messages.pageInfo.hasPreviousPage
              }
              startCursor={queryMessages.data?.messages.pageInfo.startCursor}
              onNext={onNextPage}
              onPrev={onPrevPage}
              pageSize={queryMessages?.data?.messages.edges.length}
              isLoading={queryMessages.loading}
              endCursor={queryMessages?.data?.messages.pageInfo.endCursor}
            />
          </VStack>

          <MessageDetails
            selectedItemId={selectedItem}
            queryMessage={queryMessage}
          />
        </SimpleGrid>
      </Box>
    );
  },
);

interface MessagePreviewProps {
  message: Message;
  isSelected: boolean;
  onClick: () => void;
  loading?: boolean;
}

const MessagePreview = memo<MessagePreviewProps>(
  ({ message, onClick, isSelected, loading }) => {
    return (
      <Stack
        direction="row"
        spacing={5}
        onClick={onClick}
        width="100%"
        px={5}
        py={2}
        backgroundColor={isSelected ? 'blue.50' : ''}
      >
        <VStack alignItems="left">
          <Stack
            direction="row"
            fontWeight="semibold"
            maxW="300px"
            textOverflow="ellipsis"
          >
            <Skeleton isLoaded={!loading}>
              {formatParticipant([message.from])}
            </Skeleton>
          </Stack>

          <Stack direction="row" maxW="300px" textOverflow="ellipsis">
            <Text>To: </Text>
            <Skeleton isLoaded={!loading}>
              {formatParticipant(message.to)}
            </Skeleton>
          </Stack>
        </VStack>
        <Spacer />
        <VStack alignItems="end" width="150px">
          <Text textStyle="footnote">
            <Skeleton isLoaded={!loading}>
              <Icon
                as={
                  message.type === MessageTypeEnum.Received
                    ? HiOutlineInboxIn
                    : HiOutlinePaperAirplane
                }
              />{' '}
              <RelativeTime timestamp={message.receivedAt} />
            </Skeleton>
          </Text>
          <Box>
            <Skeleton isLoaded={!loading}>
              {message.decision ? (
                <RuleTag rule={message.decision?.ruling} />
              ) : (
                message.type === MessageTypeEnum.Received && (
                  <Tag colorScheme="gray">
                    <TagLabel>No Decision</TagLabel>
                  </Tag>
                )
              )}
            </Skeleton>
          </Box>
        </VStack>
      </Stack>
    );
  },
);

interface MessageDetailsProps {
  selectedItemId?: string;
  queryMessage?: QueryResult<MessageQuery>;
}
const MessageDetails = memo<MessageDetailsProps>(
  ({ queryMessage, selectedItemId }) => {
    const previewChallenge = useDisclosure();
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    };

    if (queryMessage?.loading) {
      return <Spinner />;
    }

    if (!selectedItemId || !queryMessage?.data) {
      return (
        <Flex direction="column" verticalAlign="middle">
          <Text textAlign="center" textStyle="footnote">
            Select an item to the left...
          </Text>
        </Flex>
      );
    }
    const { message } = queryMessage.data;
    if (message.type === MessageTypeEnum.Sent) {
      return (
        <VStack spacing={5}>
          <Text>
            This was a message sent by the user at{' '}
            {formatDate(message.receivedAt)}
          </Text>
          <VStack alignItems="left" textStyle="footnote" spacing={0}>
            <Text>
              <strong>System IDs:</strong>
            </Text>
            <Text>Message ID: {message.id}</Text>
          </VStack>
        </VStack>
      );
    }

    const { decision } = message;

    if (!decision) {
      return <>No decision was made on this message.</>;
    }

    const donation = decision?.challenge?.interactions.edges.find(
      (item) => item.node.interaction === ChallengeInteractionEnum.Donated,
    );
    const bypass = decision?.challenge?.interactions.edges.find(
      (item) => item.node.interaction === ChallengeInteractionEnum.Expected,
    );

    const donationView = () => {
      if (!donation) return;

      return (
        <Text>
          A donation made to the challenge by the sender of{' '}
          {formatCurrencyUtil(donation.node.paymentAmount || 0)} to{' '}
          {decision?.challenge?.nonprofit.name} at{' '}
          {formatDate(donation.node.performedAt)}.
        </Text>
      );
    };

    const bypassView = () => {
      if (!bypass) return;

      return (
        <Text>
          The challenge was bypassed by sender at{' '}
          {formatDate(bypass.node.performedAt)}.
        </Text>
      );
    };

    const witholdReasonText = () => {
      switch (decision.challenge?.withholdReason) {
        case ChallengeWitholdReasonEnum.CalendarEvent:
          return 'the message was related to a calendar invite';
        case ChallengeWitholdReasonEnum.RecentChallenge:
          return 'sender was recently sent a challenged';
        case ChallengeWitholdReasonEnum.UserDisableSetting:
          return 'the user has challenges disabled in their settings';
      }
    };

    const challengeView = () => {
      if (!decision?.challenge) return;

      if (decision.challenge.withholdReason)
        return (
          <Text>The challenge was withheld because {witholdReasonText()}.</Text>
        );

      return (
        <>
          <Modal
            isOpen={previewChallenge.isOpen}
            onClose={previewChallenge.onClose}
          >
            <ModalContent>
              <ModalBody>
                <div
                  dangerouslySetInnerHTML={{ __html: decision.challenge.body }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Button onClick={previewChallenge.onOpen}>
            Preview Sent Challenge
          </Button>
        </>
      );
    };

    const challengeId = () => {
      if (!decision.challenge) return;
      return (
        <>
          <Text>Challenge ID: {decision.challenge.id}</Text>
          <Text>Challenge Message ID: {decision.challenge.sentMessage.id}</Text>
        </>
      );
    };

    const enforcedId = () => {
      if (decision?.enforcedPattern) {
        return <>Enforced Pattern ID: {decision.enforcedPattern.id}</>;
      }

      if (decision?.enforcedTraining) {
        return <>Enforced Training ID: {decision.enforcedTraining.versionId}</>;
      }

      if (decision?.enforcedOptOutAddress) {
        return <>Enforced Opt-Out ID: {decision.enforcedOptOutAddress.id}</>;
      }
    };

    const originText = () => {
      switch (decision.enforcedTraining?.origin) {
        case TrainingOriginEnum.AdminApp:
          return 'an admin adding it via the admin panel';
        case TrainingOriginEnum.Calendar:
          return "it being on an invite in the user's calendar";
        case TrainingOriginEnum.ExpectedInteraction:
          return 'the sender bypassing a challenge previously';
        case TrainingOriginEnum.IncludedOnAllowed:
          return 'the sender being included on Allowed message';
        case TrainingOriginEnum.InitialDefaults:
          return `the rule being added to the user's Allow List as an initial default`;
        case TrainingOriginEnum.Migration:
          return 'the rule being migrated from the legacy system';
        case TrainingOriginEnum.Pattern:
          return 'the sender matching a pattern';
        case TrainingOriginEnum.ReceivedEmail:
          return 'the user receiving an email with a calendar invite from the user before';
        case TrainingOriginEnum.SentEmail:
          return 'the user previously sending an email to the sender';
        case TrainingOriginEnum.UserApp:
          return 'the user adding it via the dashboard';
        case TrainingOriginEnum.UserInbox:
          return 'the user adding it via their inbox';
      }
    };

    const reason = () => {
      switch (decision.verdict) {
        case VerdictEnum.AddressAllowed:
          return `the sender is Allowed on the user's Allow List, due to ${originText()} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.AddressGated:
          return `the sender is Gated on the user's Allow List, due to ${originText()} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.AddressMuted:
          return `the sender is Gated (Unchallenged) on the user's Allow List, due to ${originText()} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.CalendarEventAllowed:
          return `the sender previously sent the user a calendar invite`;
        case VerdictEnum.CalenderRsvpUserOrganizerAllowed:
          return 'the sender RSVPed to an event the user was the organizer of';
        case VerdictEnum.DomainAllowed:
          return `the sender's domain is Allowed on the user's Allow List, due to ${originText()} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.DomainGated:
          return `the sender's domain is Gated on the user's Allow List, due to ${originText()} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.DomainMuted:
          return `the sender's domain is Gated (Unchallenged) on the user's Allow List, due to ${originText()} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.MailingListAddressAllowed:
          return `it was sent to a mailing list where the address is Allowed on the user's Allow List, due to ${originText} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.MailingListAddressGated:
          return `it was sent to a mailing list where the address is Gated on the user's Allow List, due to ${originText} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.MailingListAddressMuted:
          return `it was sent to a mailing list where the address is Gated (Unchallenged) on the user's Allow List, due to ${originText()} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.MailingListDomainAllowed:
          return `it was sent to a mailing list where the domain is Allowed on the user's Allow List, due to ${originText()} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.MailingListDomainGated:
          return `it was sent to a mailing list where the domain is Gated on the user's Allow List, due to ${originText()} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.MailingListDomainMuted:
          return `it was sent to a mailing list where the domain is Gated (Unchallenged) on the user's Allow List, due to ${originText()} on ${formatDate(
            decision.enforcedTraining?.createdAt,
          )}.`;
        case VerdictEnum.MailingListIgnore:
          return 'it was sent to a mailing list.';
        case VerdictEnum.ParticipantOnAllowedThread:
          return `the sender was participating on a thread that was previously Allowed.`;
        case VerdictEnum.PatternAllowed:
          return `the sender's address matches an Allowed pattern of ${
            decision.enforcedPattern?.expression
          } created on ${formatDate(decision.enforcedPattern?.createdAt)}`;
        case VerdictEnum.PatternGated:
          return `the sender's address matches Gated pattern of ${
            decision.enforcedPattern?.expression
          } created on ${formatDate(decision.enforcedPattern?.createdAt)}.`;
        case VerdictEnum.PatternMuted:
          return `the sender's address matches Gated (Unchallenged) pattern of ${
            decision.enforcedPattern?.expression
          } created on ${formatDate(decision.enforcedPattern?.createdAt)}.`;
        case VerdictEnum.SenderUnknownGated:
          return 'the sender is unknown to the user.';
        case VerdictEnum.SentAllowed:
          return 'the user has sent a message to the user.';
        case VerdictEnum.UserOptOutAllowed:
          return 'the sender emailed the user at an address they opt-ed out of Gating on.';
      }
    };

    const ruleText = (rule: RuleEnum) => {
      switch (rule) {
        case RuleEnum.Allow:
          return 'Allowed';
        case RuleEnum.Ignore:
          return 'Allowed';
        case RuleEnum.Gate:
          return 'Gated';
        case RuleEnum.Mute:
          return 'Gated (Unchallenged)';
      }
    };

    const participantText = (
      participants: { displayName?: string | null; emailAddress: string }[],
    ) => {
      const list = participants.map((p) => {
        if (p.displayName) {
          return `${p.displayName} <${p.emailAddress}>`;
        }
        return p.emailAddress;
      });

      return list.join(', ');
    };

    return (
      <VStack spacing={5} alignItems="left">
        <Text>From: {participantText([message.from])}</Text>
        <Text>To: {participantText(message.to)}</Text>
        {message.cc.length > 0 && (
          <Text>Cc: {participantText(message.cc)}</Text>
        )}
        {message.bcc.length > 0 && (
          <Text>Bcc: {participantText(message.bcc)}</Text>
        )}

        <Text>
          This message was {ruleText(decision.ruling)} on{' '}
          {formatDate(decision.decidedAt)} because {reason()}
        </Text>
        {challengeView()}
        {donationView()}
        {bypassView()}
        <VStack alignItems="left" textStyle="footnote" spacing={0}>
          <Text>
            <strong>System IDs:</strong>
          </Text>
          <Text>Message ID: {message.id}</Text>
          <Text>Decision ID: {decision.id}</Text>
          {challengeId()}
          {enforcedId()}
        </VStack>
      </VStack>
    );
  },
);
