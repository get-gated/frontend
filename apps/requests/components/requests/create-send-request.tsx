import React, { useRef } from 'react';
import {
  DonationRequestTypeEnum,
  useCreateDonationRequestMutation,
} from '@gated/graphql-types';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';

interface SendRequestProps extends Omit<ModalProps, 'children'> {
  onSuccess?: () => void;
}

export function CreateSendRequest(props: SendRequestProps) {
  const memo = useRef<HTMLTextAreaElement>();
  const amount = useRef<HTMLInputElement>();

  const [request, { loading, error }] = useCreateDonationRequestMutation();

  const handleRequest = async () => {
    const { errors } = await request({
      variables: {
        input: {
          memo: memo.current.value,
          amountInCents: Number(amount.current.value) * 100,
          type: DonationRequestTypeEnum.SingleUse,
          allowExemptionRequest: false,
          isFeatured: false,
        },
      },
    });
    if (!errors) {
      props.onClose();
      props.onSuccess();
    }
  };

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Send a Donation Request</ModalHeader>
        <ModalBody>
          <VStack alignItems="start">
            <VStack w="full" alignItems="start">
              <Text textStyle="label">Amount:</Text>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input type="number" ref={amount} />
              </InputGroup>
            </VStack>

            <VStack alignItems="start" w="full">
              <Text textStyle="label">Memo:</Text>
              <Textarea ref={memo} />
            </VStack>
          </VStack>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error sending request</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            isDisabled={loading}
            isLoading={loading}
            onClick={handleRequest}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
