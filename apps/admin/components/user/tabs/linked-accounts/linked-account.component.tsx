import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AvatarBadge,
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { memo, useMemo } from 'react';
import { RelativeTime, SenderAvatar } from '@gated/ui/components';
import { HiDotsVertical } from 'react-icons/hi';
import { Connection } from '@gated/graphql-types';

export type LinkAccountConnection = Pick<
  Connection,
  'id' | 'isDisabled' | 'isActivated' | 'emailAddress' | 'createdAt' | 'status'
>;

interface ConnectionItemProps {
  connection: LinkAccountConnection;
  onRemoveConnection: () => void;
  onActivateConnection: () => void;
  onDeactivateConnection: () => void;
}

export const LinkedAccount = ({
  connection,
  onActivateConnection,
  onDeactivateConnection,
  onRemoveConnection,
}: ConnectionItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const badgeColor = useMemo(() => {
    if (connection.isDisabled) return 'red.500';
    if (connection.isActivated) return 'green.500';
    if (!connection.isActivated) return 'yellow.500';
  }, [connection.isDisabled, connection.isActivated]);

  return (
    <HStack flex={1}>
      <SenderAvatar sender={connection.emailAddress} forceDomain>
        <AvatarBadge boxSize="1.25em" bg={badgeColor} />
      </SenderAvatar>
      <Box pr={10}>
        <Text
          style={{
            textDecoration: connection.isDisabled ? 'line-through' : '',
          }}
        >
          {connection.emailAddress}
        </Text>
        <HStack textStyle="footnote">
          <Text>
            Added <RelativeTime timestamp={connection.createdAt} />
          </Text>
          <Box px={1}>|</Box>
          {!connection.isDisabled && <Text>Status: {connection.status}</Text>}
          {connection.isDisabled && <Text>Account Removed</Text>}
        </HStack>
      </Box>

      <Menu>
        <RemoveLinkedAccountAlert
          isOpen={isOpen}
          onClose={onClose}
          onRemove={onRemoveConnection}
        />
        <MenuButton as={Button} variant="ghost" colorScheme="gray">
          <HiDotsVertical />
        </MenuButton>
        <MenuList>
          {!connection.isActivated && (
            <MenuItem onClick={onActivateConnection}>Activate</MenuItem>
          )}
          {connection.isActivated && (
            <MenuItem onClick={onDeactivateConnection}>Deactivate</MenuItem>
          )}
          {!connection.isDisabled && (
            <MenuItem onClick={onOpen} color="red">
              Remove
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </HStack>
  );
};

interface RemoveConnectionAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}
const RemoveLinkedAccountAlert = memo<RemoveConnectionAlertProps>(
  ({ isOpen, onRemove, onClose }) => {
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
              Remove Connection
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
                  onRemove();
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
