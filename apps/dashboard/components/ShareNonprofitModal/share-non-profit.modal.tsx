import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UseDisclosureProps,
  VStack,
} from '@chakra-ui/react';

import { CopyInput } from '@gated/ui/components';
import { useApp, useMe } from '@gated/app';

export function ShareNonprofitModal({ isOpen, onClose }: UseDisclosureProps) {
  const { user } = useMe();
  const { config } = useApp();
  const link = `${config.origin}/nonprofits/${user.nonprofit.slug}?ref=${user.referralCode}`;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Share Your Nonprofit</ModalHeader>
        <ModalBody>
          <VStack spacing={3}>
            <Text>
              Raise more money and awareness for{' '}
              <strong>{user.nonprofit.name}</strong> by sharing their page.
            </Text>
            <Divider variant="subtle" />
            <Box w="full">
              <CopyInput value={link} label="Your Nonprofit Page Link" />
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Done</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
