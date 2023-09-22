import React, { memo } from 'react';
import { Button, Center, useColorModeValue } from '@chakra-ui/react';

const AuthProviderButton = memo(({ children, icon, size = 'lg', ...rest }) => {
  const color = useColorModeValue('primary.500', 'white');
  return (
    <Button
      borderColor={color}
      borderRadius="md"
      color={color}
      fontSize="md"
      justifyContent="flex-start"
      mx="auto"
      px={0}
      size={size}
      variant="outline"
      w={{ base: '80%', md: 'auto' }}
      {...rest}
    >
      <Center h={10} w={10}>
        {icon}
      </Center>
      <Center
        borderLeftColor={color}
        borderLeftWidth={1}
        flex={1}
        h={10}
        px={4}
      >
        {children}
      </Center>
    </Button>
  );
});

export { AuthProviderButton };
