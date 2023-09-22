import { Center, Container, VStack } from '@chakra-ui/react';
import React from 'react';
import { Footer } from '@components/footer';
import { Header } from '@components/header';
import Head from 'next/head';

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>Allow without a donation?</title>
    </Head>
    <Container>
      <Header />
      <Center as={VStack} h="80vh" spacing={4}>
        <Center
          as={VStack}
          bg="bg-surface"
          borderRadius="lg"
          shadow="md"
          maxW="400px"
          p={6}
          spacing={4}
          minH="300px"
          minW={{ base: '', md: '400px' }}
        >
          {children}
        </Center>
      </Center>
    </Container>
    <Footer />
  </>
);
