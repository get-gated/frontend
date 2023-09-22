import React, { useRef } from 'react';

import { Button, Center, Heading, VStack } from '@chakra-ui/react';

export interface ChurnQuestionnaireSuccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChurnQuestionnaireSuccess = ({
  onClose,
}: ChurnQuestionnaireSuccessProps) => {
  const focusRef = useRef<any>();

  return (
    <Center w={'full'} maxH={'3xl'}>
      <VStack w={'md'} gap={{ base: 2, md: 6 }} my={{ base: 8, md: 16 }}>
        <Heading
          size={'2xl'}
          maxW={500}
          textAlign={'center'}
          fontWeight={'light'}
        >
          Your Gated account was successfully deleted.
        </Heading>
        <VStack gap={2}>
          <Heading size={'sm'} textAlign={'left'}>
            We&apos;re on a journey to improve email for everyone. Your feedback
            is greatly appreciated.
          </Heading>
          <Heading size={'sm'} textAlign={'left'}>
            And if you ever miss Gated... we&apos;ll be ready to welcome you
            back.
          </Heading>
        </VStack>
        <Button onClick={onClose} variant={'solid'} ref={focusRef}>
          Home
        </Button>
      </VStack>
    </Center>
  );
};
