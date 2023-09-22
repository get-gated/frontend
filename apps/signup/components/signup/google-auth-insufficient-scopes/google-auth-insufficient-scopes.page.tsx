import React, { memo } from 'react';

/* Assets */
import { Box, Flex, Heading, Button, Text } from '@chakra-ui/react';
import GoogleAccessGraphic from '@gated/assets/images/gated-google-access.gif';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface IAuthPreflightPage {
  onForward: () => Promise<void>;
  loading: boolean;
}
const GoogleAuthInsufficientScopesPage = memo<IAuthPreflightPage>(
  ({ onForward, loading }) => {
    const router = useRouter();

    const goToSignup = () => {
      router.push('/signup');
    };

    return (
      <>
        <Head>
          <title>Before we go...</title>
        </Head>
        <Box alignSelf="center" flex={1} maxWidth="md" mx="auto">
          <Heading as="h1" mb={2} size="2xl" textAlign="center">
            We need a bit more access
          </Heading>

          <Heading as="p" mb={5} size="md" textAlign="center" textStyle="lead">
            To protect your email we need all of the permissions on the next
            screen.
          </Heading>

          <Box bgColor="white" borderRadius="lg" color="gray.600" p={2} mb={8}>
            <Box as="img" display="block" m={0} src={GoogleAccessGraphic.src} />
          </Box>

          <Flex justify="center">
            <Button onClick={goToSignup} variant="outline" mr={2}>
              Cancel
            </Button>
            <Button ml={2} isDisabled={loading} onClick={() => onForward()}>
              Try again
            </Button>
          </Flex>
          <Box mt={8}>
            <Text fontSize="xs">
              If you have any questions about the access that Gated requires,
              please review our Help center.
            </Text>
          </Box>
        </Box>
      </>
    );
  },
);

export default GoogleAuthInsufficientScopesPage;
