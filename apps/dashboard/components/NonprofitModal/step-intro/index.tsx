import {
  Button,
  Flex,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NonprofitImage from '@assets/images/undraw_spread_love_re_v3cl.svg';
import React from 'react';
import { NonprofitStepProps } from '@components/NonprofitModal';
export function StepIntro({ onDone }: Omit<NonprofitStepProps, 'onBack'>) {
  return (
    <>
      <ModalHeader>Select Your Nonprofit</ModalHeader>
      <ModalBody as={VStack} textAlign="center">
        <Image src={NonprofitImage.src} height="300" width="300" />
        <Heading size="md">Make an Impact &amp; Make New Connections</Heading>
        <Text>
          To reach your inbox, unknown senders must make a donation to the
          nonprofit you choose.
        </Text>
      </ModalBody>
      <ModalFooter as={Flex}>
        <Spacer />
        <Button variant="primary" onClick={onDone}>
          Select My Nonprofit
        </Button>
      </ModalFooter>
    </>
  );
}
