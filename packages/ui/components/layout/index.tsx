import React, { memo } from 'react';
import { Box, Flex } from '@chakra-ui/react';

interface LayoutNarrowProps {
  children: React.ReactNode;
  width?: 'full' | 'narrow' | 'regular' | 'wide';
  header?: React.ReactNode;
}

export const Layout = memo<LayoutNarrowProps>(
  ({ width = 'regular', children, header }) => {
    let maxWidth = '100%';
    switch (width) {
      case 'full':
        break;
      case 'narrow':
        maxWidth = '4xl';
        break;
      case 'regular':
        maxWidth = '5xl';
        break;
      case 'wide':
        maxWidth = '7xl';
        break;
    }

    return (
      <Flex
        minHeight="calc(100vh)"
        transition="padding 135ms ease-in-out"
        width="100%"
        pb="10"
      >
        <Box maxWidth={maxWidth} mx="auto" px={4} width="100%">
          {header}
          <Flex flex={1}>{children}</Flex>
        </Box>
      </Flex>
    );
  },
);
