import React, { memo } from 'react';

import { AuthProviderType, AuthType, useAuthRedirect } from '@gated/app';

/* Components */
import {
  Flex,
  Heading,
  Box,
  Button,
  Text,
  Image,
  Link,
} from '@chakra-ui/react';

import RainCloudGraphic from '@gated/assets/images/rain-cloud.png';

const UnknownErrorView = memo(() => {
  const { redirectToAuth, loading } = useAuthRedirect(
    AuthProviderType.Google,
    AuthType.SignUp,
    '/onboarding',
  );

  return (
    <>
      <Box alignSelf="center" flex={1} maxWidth="md" mx="auto">
        <Box textAlign="center">
          <Image
            display="block"
            marginLeft="auto"
            marginRight="auto"
            mb={5}
            src={RainCloudGraphic.src}
          />
        </Box>
        <Heading as="h1" mb={2} size="2xl" textAlign="center">
          Ok, this is awkward...
        </Heading>

        <Heading as="p" mb={5} size="md" textAlign="center" textStyle="lead">
          Something went wrong.
        </Heading>

        <Flex justify="center">
          <Button onClick={() => redirectToAuth()} isDisabled={loading}>
            Try again
          </Button>
        </Flex>
        <Box mt={8}>
          <Text fontSize="s" textAlign="center">
            We are sorry you got this error, please contact our team via{' '}
            <Link variant="prominent" href="mailto:support@gated.com">
              support@gated.com
            </Link>{' '}
            for assistance.
          </Text>
        </Box>
      </Box>
    </>
  );
});

export default UnknownErrorView;
