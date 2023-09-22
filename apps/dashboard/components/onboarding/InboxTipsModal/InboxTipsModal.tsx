import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useBreakpointValue,
  UseDisclosureProps,
  VStack,
} from '@chakra-ui/react';
import {
  ProgressStepsIndicator,
  ProgressStepsProvider,
  useProgressSteps,
} from '@components/ProgressSteps';
import Image from 'next/image';

import AllowMobileImage from '@assets/images/inbox-tour-allow-desktop.svg';
import AllowImage from '@assets/images/inbox-tour-allow-mobile.svg';
import InboxImage from '@assets/images/inbox-tour-inbox-desktop.svg';
import InboxMobileImage from '@assets/images/inbox-tour-inbox-mobile.svg';
import LabelsImage from '@assets/images/inbox-tour-labels-desktop.svg';
import LabelsMobileImage from '@assets/images/inbox-tour-labels-mobile.svg';

interface InboxTipsModalProps extends UseDisclosureProps {
  onComplete: () => void;
}

export function InboxTipsModal(props: InboxTipsModalProps) {
  return (
    <ProgressStepsProvider numberOfSteps={3}>
      <InboxTipsModalView {...props} />
    </ProgressStepsProvider>
  );
}

interface Step {
  image: string;
  header: string;
  body: string;
}

function InboxTipsModalView({
  onClose,
  onComplete,
  isOpen,
}: InboxTipsModalProps) {
  const { onNext, onBack, activeStep, onReset, numberOfSteps } =
    useProgressSteps();
  const close = () => {
    onReset();
    onClose();
  };

  const steps: Step[] = [
    {
      image: useBreakpointValue({
        base: LabelsMobileImage.src,
        md: LabelsImage.src,
      }),
      header: 'A Gated folder has been added to your Inbox.',
      body: "This is where you'll find emails from senders not on your Allow List. You can read these anytime - or not at all.",
    },
    {
      image: useBreakpointValue({
        base: AllowMobileImage.src,
        md: AllowImage.src,
      }),
      header: 'Tell Gated which messages you want to see.',
      body: 'It’s easy to move any email to the folder ‘Add to Allow List’ or ‘Remove from Allow List.’ Gated will update automatically.',
    },
    {
      image: useBreakpointValue({
        base: InboxMobileImage.src,
        md: InboxImage.src,
      }),
      header: 'You’ll still see the messages that matter.',
      body: 'Anyone who is not on your Allow List can donate - or verify that they know you - to reach your inbox.',
    },
  ];

  const step = steps[activeStep - 1];
  return (
    <Modal isOpen={isOpen} onClose={close} size="2xl">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Inbox Tips & Tricks</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={5} alignItems="start" py={4}>
            <Center>
              <Image
                src={step.image}
                width={useBreakpointValue({ base: '315px', md: '700px' })}
                height={useBreakpointValue({ base: '315px', md: '257px' })}
              />
            </Center>
            <Divider variant="brand" size="sm" />
            <Heading size={{ base: 'md', md: 'lg' }}>{step.header}</Heading>
            <Text>{step.body}</Text>
          </VStack>
        </ModalBody>
        <ModalFooter as={Flex}>
          <Box w="50%">
            <ProgressStepsIndicator />
          </Box>
          <Spacer />
          <Box>
            {activeStep !== 1 && (
              <Button variant="ghost" onClick={onBack} mr={4}>
                Back
              </Button>
            )}
            {activeStep !== numberOfSteps && (
              <Button variant="primary" onClick={onNext}>
                Next
              </Button>
            )}
            {activeStep === numberOfSteps && (
              <Button
                variant="primary"
                onClick={() => {
                  onComplete();
                  close();
                }}
              >
                Done
              </Button>
            )}
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
