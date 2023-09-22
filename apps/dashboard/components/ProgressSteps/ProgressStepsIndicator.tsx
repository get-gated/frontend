import { Box, HStack } from '@chakra-ui/react';
import { useProgressSteps } from '@components/ProgressSteps/useProgressSteps.hook';

export function ProgressStepsIndicator() {
  const { activeStep, numberOfSteps } = useProgressSteps();

  return (
    <HStack>
      {Array.from({ length: numberOfSteps }).map((val, i) => (
        <Box
          key={i}
          flex="1"
          h="2"
          bg={i < activeStep ? 'secondary.500' : 'muted'}
          borderRadius="base"
        />
      ))}
    </HStack>
  );
}
