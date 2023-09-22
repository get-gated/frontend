import React, { memo } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { RelativeTime } from '@gated/ui/components';
import { HiTrash } from 'react-icons/hi';

import { OptOutAddress as OptOutAddressType } from '@gated/graphql-types';

interface OptOutAddressProps {
  address: OptOutAddressType;
  onRemoveAddress: (arg0: string) => void;
}
export const OptOutAddress = memo<OptOutAddressProps>(
  ({ onRemoveAddress, address }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <Stack direction="row" spacing={5}>
        <RemoveOptOutAddressAlert
          isOpen={isOpen}
          onClose={onClose}
          onRemove={() => {
            onRemoveAddress(address.id);
            onClose();
          }}
        />
        <Box>
          <Text
            style={{
              textDecoration: address.deletedAt ? 'line-through' : '',
            }}
          >
            {address.emailAddress}
          </Text>
          <Text textStyle="footnote">
            {!address.deletedAt && (
              <>
                Added <RelativeTime timestamp={address.createdAt} />
              </>
            )}
            {address.deletedAt && (
              <>
                Deleted <RelativeTime timestamp={address.deletedAt} />
              </>
            )}
          </Text>
        </Box>
        <Spacer />
        {!address.deletedAt && (
          <Button onClick={onOpen} variant="ghost" colorScheme="gray">
            <HiTrash />
          </Button>
        )}
      </Stack>
    );
  },
);

interface RemoveOptOutAddressAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}
const RemoveOptOutAddressAlert = memo<RemoveOptOutAddressAlertProps>(
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
              Remove Opt Out Address
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} colorScheme="gray">
                Cancel
              </Button>
              <Button colorScheme="destroy" onClick={onRemove} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  },
);
