import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export interface QuestionnaireModalContentProps {
  stepText?: string;
  modalHeader?: string;
  heading?: string;
  body: React.ReactNode;
  leastDestructiveRef?: React.MutableRefObject<any>;
  onClose?: () => void;
  onLeft?: () => void;
  leftText?: string;
  onRight?: () => void;
  rightType?: 'submit' | 'button' | 'reset';
  rightDisabled?: boolean;
  rightText?: string;
  rightMobileText?: string;
  rightChevron?: boolean;
  rightScheme?: string;
}

export const QuestionnaireModalContent = ({
  stepText,
  modalHeader,
  heading,
  body,
  leastDestructiveRef,
  onClose,
  onLeft,
  leftText = 'Back',
  onRight,
  rightText = 'Next',
  rightMobileText = 'Next',
  rightType = 'submit',
  rightDisabled = false,
  rightChevron = true,
  rightScheme = 'primary',
}: QuestionnaireModalContentProps) => {
  const viewport = useBreakpointValue({ base: 'mobile', md: 'desktop' });

  return (
    <ModalContent>
      <ModalHeader>{modalHeader}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack gap={2} pb={4} alignItems={'left'}>
          {stepText ? (
            <Heading size={'xs'} fontWeight={'medium'}>
              Step {stepText}
            </Heading>
          ) : null}
          <Box>{heading && <Heading size="sm">{heading}</Heading>}</Box>
          <>{body}</>
        </VStack>
      </ModalBody>
      <Box mx={6}>
        <Divider />
      </Box>
      <ModalFooter>
        <Flex gap={2} direction={'row'} w={'full'}>
          {onClose && (
            <Button
              variant={'ghost'}
              onClick={onClose}
              colorScheme="gray"
              {...(!onLeft ? { ref: leastDestructiveRef } : {})}
            >
              Cancel
            </Button>
          )}
          <Spacer />
          {onLeft && (
            <Button
              variant={'outline'}
              onClick={onLeft}
              ref={leastDestructiveRef}
              leftIcon={<MdChevronLeft />}
              colorScheme="primary"
            >
              {leftText}
            </Button>
          )}
          {(onRight || rightType !== 'button') && (
            <Button
              variant={'solid'}
              type={rightType}
              onClick={onRight}
              disabled={rightDisabled}
              colorScheme={rightScheme}
              {...(rightChevron ? { rightIcon: <MdChevronRight /> } : {})}
              {...(!onLeft && !onClose ? { ref: leastDestructiveRef } : {})}
            >
              {viewport === 'mobile' ? rightMobileText || rightText : rightText}
            </Button>
          )}
        </Flex>
      </ModalFooter>
    </ModalContent>
  );
};
