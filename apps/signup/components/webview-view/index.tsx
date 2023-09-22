import React, { memo } from 'react';

/* Components */
import { Heading, Box, Text, VStack } from '@chakra-ui/react';

import { BsCloudLightningRain } from 'react-icons/bs';

const InWebview = memo(() => {
  return (
    <>
      <Box alignSelf="center" flex={1} maxWidth="md" mx="auto">
        <Heading as="h1" mb={2} size="2xl" textAlign="center">
          Insecure Browser
        </Heading>
        <VStack mb={5}>
          <Box my={5}>
            <BsCloudLightningRain size={40} />
          </Box>
          <Text color="red.400" align="center">
            You are in an insecure in-app browser. This is often because you are
            viewing this page in a a third-party application.
          </Text>
          <Text align="center" fontWeight="bold">
            Please visit gated.com in your default browser.
          </Text>
        </VStack>
      </Box>
    </>
  );
});

export default InWebview;
