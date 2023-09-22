import React, { memo, useEffect } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Tabs,
  Text,
  useDisclosure,
  useToast,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from '@chakra-ui/react';

import { HiCalendar, HiMail, HiDotsVertical, HiLogout } from 'react-icons/hi';

import { RelativeTime } from '@gated/ui/components';
import { LinkedAccountPage } from './tabs/linked-accounts/linked-account.page';
import { SettingsPage } from './tabs/settings/settings.page';
import { MessagesPage } from './tabs/messages/messages.page';
import { useDeleteUserMutation, useUserQuery } from '@gated/graphql-types';

interface UserViewProps {
  onBack: () => void;
  userId: string;
}
export const UserView = ({ onBack, userId }: UserViewProps) => {
  const [onDeleteUser, { error }] = useDeleteUserMutation();
  const userState = useUserQuery({
    variables: { userId },
    fetchPolicy: 'cache-first',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const errorToast = useToast({ status: 'error' });

  useEffect(() => {
    if (!error) return;

    errorToast({
      title: 'Error deleting user',
      description: error.message,
    });
  }, [error]);

  return (
    <Box as="section" pt="20" pb="12" position="relative" width="100%">
      <Flex
        position="relative"
        flex={1}
        direction="column"
        align={{ sm: 'center' }}
        mx="auto"
        bg="white"
        shadow={{ sm: 'base' }}
        rounded={{ sm: 'lg' }}
        px={{ base: '6', md: '8' }}
        pb={{ base: '6', md: '8' }}
      >
        <Avatar
          mt="-10"
          borderWidth="6px"
          borderColor="white"
          size="xl"
          src={userState.data?.user.avatar || undefined}
          name={userState.data?.user.fullName}
        />

        <Box position="absolute" top="4" insetStart={{ base: '6', md: '8' }}>
          <Button variant="link" color="gray" size="sm" onClick={onBack}>
            Back
          </Button>
        </Box>
        <Box position="absolute" top="4" insetEnd={{ base: '6', md: '8' }}>
          <Menu>
            <MenuButton as={Button} variant="ghost" colorScheme="gray">
              <HiDotsVertical />
            </MenuButton>
            <MenuList>
              {!userState.data?.user.isDisabled && (
                <MenuItem onClick={onOpen} color="red">
                  Delete User
                </MenuItem>
              )}
            </MenuList>
          </Menu>
          <DeleteUserAlert
            isOpen={isOpen}
            onClose={onClose}
            onDelete={() => {
              onDeleteUser({
                variables: {
                  userId: userState.data?.user.id || '',
                },
                optimisticResponse: {
                  disableUser: {
                    __typename: 'User',
                    id: userState.data?.user.id || '',
                    disabledAt: new Date().toLocaleDateString(),
                    isDisabled: true,
                  },
                },
              });
              onClose();
            }}
          />
        </Box>

        <Box textAlign={{ sm: 'center' }} pt="2">
          <Heading
            size="lg"
            fontWeight="extrabold"
            letterSpacing="tight"
            style={{
              textDecoration: userState.data?.user.isDisabled
                ? 'line-through'
                : '',
            }}
          >
            {userState.data?.user.fullName}
          </Heading>
          <Text textStyle="footnote">{userState.data?.user.id}</Text>

          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={{ base: '1', sm: '6' }}
            mt="4"
            fontSize="sm"
            fontWeight="medium"
            color="primary"
          >
            <HStack>
              <Icon as={HiMail} />
              <Text>{userState.data?.user.notificationSettings.email}</Text>
            </HStack>
            <HStack>
              <Icon as={HiCalendar} />
              <Text>
                Joined{' '}
                <RelativeTime timestamp={userState.data?.user.joinedAt} />
              </Text>
            </HStack>
            {userState.data?.user.isDisabled && (
              <HStack>
                <Icon as={HiLogout} />
                <Text>
                  Deleted{' '}
                  <RelativeTime timestamp={userState.data?.user.disabledAt} />
                </Text>
              </HStack>
            )}
          </Stack>
        </Box>
        <Tabs width="100%">
          <TabList>
            <Tab>Inbox</Tab>
            <Tab>Linked Accounts</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <MessagesPage />
            </TabPanel>
            <TabPanel>
              <LinkedAccountPage
                connections={userState.data?.user.connections || []}
              />
            </TabPanel>
            <TabPanel>
              <SettingsPage
                addresses={userState.data?.user.optOutAddresses || []}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

interface DeleteUserAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}
const DeleteUserAlert = memo<DeleteUserAlertProps>(
  ({ isOpen, onDelete, onClose }) => {
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} colorScheme="gray">
                Cancel
              </Button>
              <Button
                colorScheme="destroy"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  },
);
