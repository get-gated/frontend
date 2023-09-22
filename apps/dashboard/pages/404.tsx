import React, { memo } from 'react';

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

import NotFoundGraphic from '@gated/assets/images/not-found.png';
import { App, useAppLink } from '@gated/app/hooks';

const Default = memo(() => {
  const link = useAppLink();

  const gotoLogin = () => {
    window.location.href = link(App.Signup, '/login');
  };

  const gotoMarketing = () => {
    window.location.href = 'http://www.gated.com';
  };

  return (
    <>
      <Box alignSelf="center" flex={1} maxWidth="md" mt={-24} mx="auto">
        <Box textAlign="center">
          <Image
            display="block"
            marginLeft="auto"
            marginRight="auto"
            alt="Not found"
            mb={5}
            src={NotFoundGraphic.src}
          />
        </Box>
        <Heading as="h1" mb={2} size="2xl" textAlign="center">
          Nothing here...
        </Heading>

        <Heading as="p" mb={5} size="md" textAlign="center" textStyle="lead">
          Looks like the page you were looking for wasn&apos;t here.
        </Heading>

        <Flex justify="center">
          <Button onClick={gotoMarketing} variant="outline" mr={2}>
            Learn about us
          </Button>
          <Button ml={2} onClick={gotoLogin}>
            Login
          </Button>
        </Flex>
        <Box mt={8}>
          <Text fontSize="xs">
            If you have any questions about the access that Gated requires,
            please review our{' '}
            <Link href="https://support.gated.com/en/articles/5488684-google-scopes">
              Help center
            </Link>{' '}
            or <Link href="mailto:support@gated.com">email us</Link> directly.
          </Text>
        </Box>
      </Box>
    </>
  );
});

export default Default;
