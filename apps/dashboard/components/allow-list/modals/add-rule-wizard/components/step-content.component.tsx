import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useStep } from '../use-step.hook';

export const StepContent = (props: BoxProps) => {
  const { isLastStep } = useStep();
  return (
    <Box
      color={useColorModeValue('gray.600', 'gray.400')}
      borderStartWidth={isLastStep ? '1px' : '0'}
      ms="4"
      mt="2"
      ps="8"
      pb="3"
      fontSize="sm"
      {...props}
    />
  );
};
