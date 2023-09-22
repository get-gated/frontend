import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Text,
  UseDisclosureProps,
  VStack,
} from '@chakra-ui/react';
import { AuthError, useAnalytics } from '@gated/app';

import React, { useMemo } from 'react';

import GoogleAccessGraphic from '@gated/assets/images/gated-google-access.gif';

interface ErrorModalProps extends UseDisclosureProps {
  errorCode: string;
  onTryAgain: () => void;
}

export function ErrorModal(props: ErrorModalProps) {
  const { track } = useAnalytics();

  const { heading, subheading, help } = useMemo(() => {
    if (!props.errorCode) return {};
    switch (props.errorCode) {
      case AuthError.InsufficientScopes:
        track('auth_error_insufficient_scopes');
        return {
          heading: 'We need a bit more access',
          subheading: (
            <>
              To protect your email we need all of the permissions on the next
              screen.
              <Box bgColor="white" borderRadius="lg" p={2} mb={8}>
                <Box
                  as="img"
                  display="block"
                  m={0}
                  src={GoogleAccessGraphic.src}
                />
              </Box>
            </>
          ),
        };

      case AuthError.UserNotFound:
        track('auth_error_user_not_found');
        return {
          heading: 'User Not Found',
          subheading:
            'We were unable to find a user associated with the account you selected. Please try again with another account.',
          help: 'You can signup for a Gated account for free.',
        };
      case AuthError.CsrfCheckFailed:
        track('auth_error_csrf_check_failed');
        return {
          heading: 'An Unexpected Error Occurred (csrf)',
          subheading:
            'Well, this is embarrassing. Please try again in a moment.',
        };
      case AuthError.ConnectionInUSe:
        track('auth_error_connection_in_use');
        return {
          heading: 'Gated is already connected to this account',
          subheading:
            'The account you selected is already in use by you or another Gated user. Please select a different account.',
        };
      default:
        track('auth_error_unknown');
        return {
          heading: 'An Unexpected Error Occurred',
          subheading:
            'Well, this is embarrassing. Please try again in a moment.',
        };
    }
  }, [props?.errorCode]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg">
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Oh No!</ModalHeader>
        <ModalBody as={VStack} spacing={4}>
          <Heading size="md" textAlign="center">
            {heading}
          </Heading>

          <Text mb={5} textAlign="center" color="muted">
            {subheading}
          </Text>

          <Box>
            <Text textStyle="caption">
              {help
                ? help
                : 'If you require any help, contact support@gated.com.'}
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Spacer />
          <Button
            variant="primary"
            onClick={() => {
              props.onClose();
              props.onTryAgain();
            }}
          >
            Try Again
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
