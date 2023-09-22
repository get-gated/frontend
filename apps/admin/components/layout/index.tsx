import React from 'react';
import { BrandLogo, Layout } from '@gated/ui/components';
import { Box, Flex, Link } from '@chakra-ui/react';

export const Index = ({ children }) => (
  <Layout
    width="wide"
    header={
      <Flex py={{ base: 3, md: 8 }} justify="space-between">
        <Box
          as={Link}
          to="https://www.gated.com"
          textStyle="footnote"
          fontWeight="semibold"
        >
          <Box mr={2}>
            <BrandLogo height="36px" width="108px" />
          </Box>
          ADMIN
        </Box>
      </Flex>
    }
  >
    <Flex flex={1}>{children}</Flex>
  </Layout>
);
