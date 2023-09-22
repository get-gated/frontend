import { gql } from '@apollo/client';
import {
  Box,
  Button,
  ButtonProps,
  Center,
  Circle,
  Flex,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Radio,
  RadioGroup,
  SlideFade,
  Spacer,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  UseDisclosureProps,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import {
  StatusEnum,
  useLinkedAccountsQuery,
  useRemoveAccountMutation,
} from '@gated/graphql-types';
import { SenderAvatar } from '@gated/ui/components';

import { AuthProviderType, AuthType, useAuthPopup } from '@gated/app';
import React, { useEffect, useState } from 'react';
import {
  AccountAddIcon,
  AccountHealthyIcon,
  AccountIcon,
  AccountInitializingIcon,
  AccountRemoveIcon,
  AccountUnhealthyIcon,
  DeleteIcon,
} from '@gated/ui/icons';
import { AuthButton } from '@gated/ui/components/auth-button';

gql`
  query LinkedAccounts {
    me {
      connections {
        id
        status
        isSyncing
        emailAddress
      }
    }
  }
`;
export const LinkedAccounts = () => {
  const { data, loading, refetch, startPolling, stopPolling } =
    useLinkedAccountsQuery();

  useEffect(() => {
    const hasInitializingConnection = data?.me.connections.find(
      (conn) =>
        conn.status === StatusEnum.Provisioned ||
        conn.status === StatusEnum.Initializing,
    );

    if (hasInitializingConnection) {
      startPolling(3000);
    } else {
      stopPolling();
    }
  }, [data]);

  return (
    <Box>
      <Heading size="sm" mb={2} color="subtle">
        <Icon as={AccountIcon} mr={2} verticalAlign="top" />
        Your Connected Inboxes
      </Heading>
      <Wrap spacing={4}>
        {loading && (
          <AccountCard disabled>
            <Spinner />
          </AccountCard>
        )}
        {data?.me.connections.map((account) => (
          <Account
            key={account.id}
            emailAddress={account.emailAddress}
            connectionId={account.id}
            status={account.status}
            refetch={refetch}
          />
        ))}
        {!loading && (
          <AddAccount
            refetch={refetch}
            isFirst={data?.me.connections.length === 0}
          />
        )}
      </Wrap>
    </Box>
  );
};

interface AccountProps {
  emailAddress: string;
  status: StatusEnum;
  connectionId: string;
  refetch: () => void;
}

const Account = ({
  emailAddress,
  status,
  connectionId,
  refetch,
}: AccountProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const domain = emailAddress.split('@')[1];

  let borderColor: string;
  let backgroundColor: string;
  let statusMessage: string;
  switch (status) {
    case StatusEnum.Running:
      borderColor = 'success.500';
      backgroundColor = 'bg-surface';
      statusMessage = 'Healthy & Scanning';
      break;
    case StatusEnum.Invalid:
      borderColor = 'warn.500';
      statusMessage = 'Unhealthy';
      break;
    case StatusEnum.Initializing:
      borderColor = 'gray.500';
      statusMessage = 'Initializing...';
      break;
    case StatusEnum.Provisioned:
      borderColor = 'gray.500';
      statusMessage = 'Initializing...';
      break;
  }

  return (
    <AccountCard borderColor={borderColor} borderTopWidth={5} onClick={onOpen}>
      <AccountModal
        refetch={refetch}
        isOpen={isOpen}
        onClose={onClose}
        status={status}
        connectionId={connectionId}
        emailAddress={emailAddress}
      />

      <VStack>
        <SenderAvatar sender={domain} borderRadius="full" />
        <Text>{emailAddress}</Text>
        <HStack spacing={1}>
          <Circle bg={borderColor} size={2.5} />
          <Text textStyle="caption">{statusMessage}</Text>
        </HStack>
      </VStack>
    </AccountCard>
  );
};

const AddAccount = ({
  refetch,
  isFirst = false,
}: {
  refetch: () => void;
  isFirst?: boolean;
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <AccountCard onClick={onOpen}>
      <VStack>
        <Icon as={AccountAddIcon} boxSize={6} color="subtle" />
        <Text textStyle="caption">
          Connect {isFirst ? 'First' : 'New'} Inbox
        </Text>
      </VStack>
      <AddAccountModal onClose={onClose} isOpen={isOpen} refetch={refetch} />
    </AccountCard>
  );
};

interface AddAccountModal extends UseDisclosureProps {
  refetch: () => void;
}

const AddAccountModal = ({ isOpen, onClose, refetch }: AddAccountModal) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Connect New Inbox</ModalHeader>
        <ModalBody>
          <VStack textAlign="center" spacing={6} my={6}>
            <Center
              bgColor="bg-active"
              color="active"
              borderRadius="full"
              boxSize={16}
            >
              <Icon as={AccountAddIcon} boxSize={10} />
            </Center>
            <Text>Add Gated to an additional inbox.</Text>

            <AuthButton
              redirectPath="/loading"
              authType={AuthType.Link}
              buttonTitle="Connect Google Inbox"
              authProvider={AuthProviderType.Google}
              buttonProps={{ variant: 'primary' }}
              onSuccess={() => {
                refetch();
                onClose();
              }}
              onClose={() => setIsPopupOpen(false)}
              onOpen={() => setIsPopupOpen(true)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter textAlign="center">
          <Text w="full" color="muted" fontSize="sm">
            {isPopupOpen
              ? 'Complete the Google Authorization in the popup.'
              : 'Choose an inbox type to connect above.'}
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const AccountCard = ({ children, ...props }: ButtonProps) => (
  <Button
    fontWeight="normal"
    shadow="sm"
    h="110px"
    w={{ base: 'full', sm: '220px' }}
    borderRadius="md"
    variant="outline"
    backgroundColor="bg-surface"
    position="relative"
    padding={3}
    textAlign="center"
    cursor="pointer"
    colorScheme="grayNeutral"
    {...props}
  >
    {children}
  </Button>
);

interface AccountModalProps extends AccountProps {
  isOpen: boolean;
  onClose: () => void;
}

gql`
  mutation RemoveAccount(
    $connectionId: String!
    $reason: String!
    $experience: String!
  ) {
    connectionUnlink(
      input: {
        connectionId: $connectionId
        reasonText: $reason
        experienceText: $experience
      }
    ) {
      id
    }
  }
`;

const AccountModal = ({
  isOpen,
  onClose,
  status,
  emailAddress,
  connectionId,
  refetch,
}: AccountModalProps) => {
  const [removing, setRemoving] = useState(false);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);
  const [reason, setReason] = useState(null);
  const [experience, setExperience] = useState('');

  const [removeMutation, { loading: removeLoading }] =
    useRemoveAccountMutation();

  const onRemove = async () => {
    const { errors } = await removeMutation({
      variables: { connectionId, reason, experience },
      update(cache) {
        const normalizedId = cache.identify({
          id: connectionId,
          __typename: 'Connection',
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
    if (!errors || errors.length === 0) {
      refetch();
      onClose();
    }
  };

  const removeEnabled =
    reason && (reason === 'Other' ? experience.length > 1 : true);

  const reset = () => {
    setReason(null);
    setRemoving(false);
    setShowFinalConfirmation(false);
    setExperience('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" onCloseComplete={reset}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {removing ? (
          <>
            <ModalHeader>Remove Inbox</ModalHeader>
            <ModalBody px={10} py={4}>
              <VStack
                spacing={2}
                alignItems={showFinalConfirmation ? 'center' : 'start'}
              >
                {!showFinalConfirmation ? (
                  <>
                    <Text color="muted">
                      Please take a moment and let us know why you are removing
                      this inbox.
                    </Text>
                    <RadioGroup
                      name="unlinkReason"
                      onChange={(value) => setReason(value)}
                    >
                      <VStack alignItems="start">
                        <Radio value="JobChange">I am changing jobs</Radio>
                        <Radio value="Other">Other reason</Radio>
                      </VStack>
                    </RadioGroup>
                    <Box w="full" as={SlideFade} in={reason === 'Other'}>
                      <Textarea
                        colorScheme="secondary"
                        w="full"
                        placeholder="Please let us know more..."
                        onChange={(e) => setExperience(e.target.value)}
                        value={experience}
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <Center
                      bgColor="bg-destroy"
                      color="destroy"
                      borderRadius="full"
                      boxSize={16}
                    >
                      <Icon as={AccountRemoveIcon} boxSize={10} />
                    </Center>
                    <Heading size="md">Are you sure?</Heading>
                    <Text textAlign="center">
                      Removing this inbox will stop all Gated services{' '}
                      <strong>{emailAddress}</strong>.
                    </Text>
                  </>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Flex w="full">
                <Button onClick={reset}>Cancel</Button>
                <Spacer />
                {!showFinalConfirmation ? (
                  <Button
                    colorScheme="destroy"
                    disabled={!removeEnabled}
                    onClick={() => setShowFinalConfirmation(true)}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    colorScheme="destroy"
                    onClick={onRemove}
                    isLoading={removeLoading}
                    disabled={removeLoading}
                  >
                    Confirm Removal
                  </Button>
                )}
              </Flex>
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalHeader>Inbox Status</ModalHeader>
            <ModalBody px={10}>
              <VStack textAlign="center" spacing={6} my={6}>
                {status === StatusEnum.Running && (
                  <>
                    <Center
                      bgColor="bg-success"
                      color="success"
                      borderRadius="full"
                      boxSize={16}
                    >
                      <Icon as={AccountHealthyIcon} boxSize={10} />
                    </Center>
                    <Heading size="md">All&apos;s Well</Heading>
                    <Text>
                      We are successfully connected to{' '}
                      <strong>{emailAddress}</strong> and actively Gating your
                      inbox.
                    </Text>
                  </>
                )}

                {status === StatusEnum.Initializing ||
                  (status === StatusEnum.Provisioned && (
                    <>
                      <Center
                        bgColor="bg-subtle"
                        color="subtle"
                        borderRadius="full"
                        boxSize={16}
                      >
                        <Icon as={AccountInitializingIcon} boxSize={10} />
                      </Center>
                      <Progress
                        isIndeterminate
                        w="full"
                        colorScheme="gray"
                        size="sm"
                      />
                      <Text>
                        We are successfully connected to{' '}
                        <strong>{emailAddress}</strong> and currently
                        initializing it. This should only take a few moments...
                      </Text>
                    </>
                  ))}

                {status === StatusEnum.Invalid && (
                  <>
                    <Center
                      bgColor="bg-warn"
                      color="warn"
                      borderRadius="full"
                      boxSize={16}
                    >
                      <Icon as={AccountUnhealthyIcon} boxSize={10} />
                    </Center>
                    <Heading size="md">Oh Dear...</Heading>
                    <Text>
                      We have lost connection with{' '}
                      <strong>{emailAddress}</strong> and need to you to
                      reconnect to enable Gated for it again.
                    </Text>
                    <AuthButton
                      redirectPath="/loading"
                      authProvider={AuthProviderType.Google}
                      authType={AuthType.Reauthorize}
                      buttonTitle="Reconnect with Google"
                      onSuccess={() => {
                        refetch();
                        onClose();
                      }}
                      loginHint={emailAddress}
                    />
                  </>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Flex w="full">
                <Button
                  colorScheme="destroy"
                  variant="ghost"
                  leftIcon={<DeleteIcon />}
                  onClick={() => setRemoving(true)}
                >
                  Remove Inbox
                </Button>
                <Spacer />
                <Button onClick={onClose}>Done</Button>
              </Flex>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
