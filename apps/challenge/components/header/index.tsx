import { Box, Flex, Link, Spacer } from '@chakra-ui/react';
import { BrandLogo } from '@gated/ui/components';
import React, { ReactNode } from 'react';

interface HeaderProps {
  textColor?: string;
  markDotColor?: string;
  children?: ReactNode;
}

export const Header = ({
  textColor,
  markDotColor,
  children = null,
}: HeaderProps) => (
  <Flex py={{ base: 3, md: 8 }} w="full" alignItems="end">
    <Box as={Link} to="https://www.gated.com">
      <BrandLogo
        height="36px"
        width="108px"
        textColor={textColor}
        markDotColor={markDotColor}
      />
    </Box>
    <Spacer />
    <Box>{children}</Box>
  </Flex>
);
