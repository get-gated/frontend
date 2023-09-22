import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

interface ISettingsModal {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  isValid: boolean;
  onSave: () => Promise<void>;
  header: string;
  subheader?: string;
}

export const SettingsModal = ({
  children,
  isOpen,
  onClose,
  loading,
  isValid = true,
  onSave,
  header,
  subheader,
}: ISettingsModal) => {
  const modalSize = useBreakpointValue({
    base: 'full',
    md: 'md',
  });
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align="left">
            {subheader && (
              <Text fontSize="sm" pb="5">
                {subheader}
              </Text>
            )}
            <>{children}</>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} variant="ghost" colorScheme="gray" mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme="primary"
            disabled={loading || !isValid}
            onClick={onSave}
            isLoading={loading}
            w={100}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
