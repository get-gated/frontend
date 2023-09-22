import React, { memo } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export const Tile = memo(({ children, ...rest }: BoxProps) => {
  return (
    <Box
      borderRadius="lg"
      shadow="xs"
      overflow="hidden"
      p={8}
      py={6}
      {...rest}
      backgroundColor="bg-surface"
    >
      {children}
    </Box>
  );
});
