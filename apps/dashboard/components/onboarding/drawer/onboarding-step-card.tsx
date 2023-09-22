import { Box, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { IoIosCheckmarkCircle as CheckIcon } from 'react-icons/io';
import React, { ReactNode } from 'react';
import { OnboardingStepProps } from '@components/onboarding/drawer/onboarding-step.interface';

interface OnboardingCardProps extends Omit<OnboardingStepProps, 'onComplete'> {
  stepNumber: string;
  title: string;
  description: string | JSX.Element;
  primaryCta: ReactNode;
  secondaryCta?: ReactNode;
  estimatedDuration: string;
  children?: JSX.Element;
}

export const OnboardingStepCard = ({
  isCompleted = false,
  isActive = false,
  isCurrent = false,
  onJumpTo,
  stepNumber,
  title,
  description,
  primaryCta,
  secondaryCta = null,
  estimatedDuration,
  children,
}: OnboardingCardProps) => {
  let backgroundColor = 'bg-muted';
  let borderColor = '';
  let borderWidth;
  let headingColor = 'emphasized';
  let durationColor = 'default';

  if (isCurrent) {
    borderColor = 'accent';
    borderWidth = 2;
    headingColor = 'accent';
  }
  if (isActive) {
    backgroundColor = 'bg-surface';
    durationColor = 'muted';
  }
  if (isCompleted) {
    backgroundColor = 'bg-surface';
    borderColor = 'success';
    borderWidth = 2;
    headingColor = 'success';
  }

  const isClickable = (isCompleted || isCurrent) && !isActive;

  return (
    <Box
      borderRadius="xl"
      backgroundColor={backgroundColor}
      shadow={isActive ? 'md' : ''}
      w="100%"
      p={6}
      borderColor={borderColor}
      borderWidth={borderWidth}
      position="relative"
      onClick={isClickable ? onJumpTo : null}
      cursor={isClickable ? 'pointer' : 'default'}
      transition="max-height 0.75s ease-out"
      maxH={isActive ? '500px' : '100px'}
    >
      <HStack alignItems="top">
        <Box w={4}>
          <Heading size="sm" color={headingColor}>
            {stepNumber}.
          </Heading>
        </Box>
        <VStack
          alignItems="stretch"
          flex={1}
          spacing={4}
          w="full"
          overflow="hidden"
        >
          <Heading size="sm" color={headingColor}>
            {title}
          </Heading>
          {isActive && (
            <>
              <Text>{description}</Text>
              {primaryCta}
              {secondaryCta}
            </>
          )}
        </VStack>
        {isCompleted ? (
          <Icon
            as={CheckIcon}
            color="success"
            boxSize="1.5rem"
            position="absolute"
            top="20px"
            right="20px"
          />
        ) : (
          <Text
            position="absolute"
            top="20px"
            right="20px"
            color={durationColor}
            fontSize="xs"
          >
            {estimatedDuration}
          </Text>
        )}
      </HStack>
      <>{children}</>
    </Box>
  );
};
