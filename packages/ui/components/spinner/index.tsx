import React, { memo } from 'react';
import {
  Center,
  Spinner as ChakraSpinner,
  SpinnerProps as ChakraSpinnerProps,
  useColorMode,
} from '@chakra-ui/react';

interface SpinnerProps extends ChakraSpinnerProps {
  spacing?: number;
}

const Spinner = memo<SpinnerProps>(({ size = 'xl', spacing = 12, ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Center py={spacing} w="full">
      <ChakraSpinner
        color={colorMode === 'dark' ? 'white' : 'blue.400'}
        emptyColor={colorMode === 'dark' ? 'primary.600' : 'white'}
        size={size}
        speed="0.6s"
        thickness="4px"
        {...rest}
      />
    </Center>
  );
});

export { Spinner };
