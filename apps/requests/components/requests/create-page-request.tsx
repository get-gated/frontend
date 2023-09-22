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
  Switch,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';

interface SendRequestProps extends Omit<ModalProps, 'children'> {
  onSuccess?: () => void;
}

export function CreatePageRequest(props: SendRequestProps) {
  const intro = useRef<HTMLTextAreaElement>();
  const name = useRef<HTMLInputElement>();
  const amount = useRef<HTMLInputElement>();
  const featured = useRef<HTMLInputElement>();
  const thankyou = useRef<HTMLTextAreaElement>();
  const cta = useRef<HTMLInputElement>();

  const [request, { loading, error }] = useCreateDonationRequestMutation();

  const handleRequest = async () => {
    const { errors } = await request({
      variables: {
        input: {
          memo: intro.current.value,
          amountInCents: Number(amount.current.value) * 100,
          thankYouMessage: thankyou.current.value,
          type: DonationRequestTypeEnum.LongLiving,
          allowExemptionRequest: false,
          isFeatured: featured.current.checked,
          cta: cta.current.value,
          name: name.current.value,
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
        <ModalHeader>Create a Donation Page</ModalHeader>
        <ModalBody>
          <VStack alignItems="start">
            <VStack alignItems="start" w="full">
              <Text textStyle="label">Name:</Text>
              <Input ref={name} />
            </VStack>

            <VStack alignItems="start" w="full">
              <Text textStyle="label">Page Intro:</Text>
              <Textarea ref={intro} />
            </VStack>

            <VStack alignItems="start" w="full">
              <Text textStyle="label">Thank You Message:</Text>
              <Textarea ref={thankyou} />
            </VStack>

            <VStack w="full" alignItems="start">
              <Text textStyle="label">Amount:</Text>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Input type="number" ref={amount} />
              </InputGroup>
            </VStack>

            <Switch ref={featured}>Featured on my Gated profile</Switch>
            <VStack w="full" alignItems="start">
              <Text textStyle="label">Button Text:</Text>
              <Input type="text" ref={cta} />
            </VStack>
          </VStack>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error creating page </AlertTitle>
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
