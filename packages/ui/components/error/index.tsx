import React, { memo } from 'react';
import Head from 'next/head';

/* Components */
import { Flex, Heading } from '@chakra-ui/react';

interface IError {
  message: string;
}
export const Error = memo<IError>(({ message }) => {
  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <Flex
        alignSelf="center"
        direction="column"
        flex={1}
        maxWidth="624px"
        mt={{ base: 0, md: -24 }}
        mx="auto"
        pb={8}
        pt={0}
      >
        <Heading as="h1" mb={2} size="2xl" textAlign="center">
          An error occurred <br />
          {message}
        </Heading>
      </Flex>
    </>
  );
});
