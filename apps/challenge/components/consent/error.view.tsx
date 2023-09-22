import { Layout } from '@components/consent/layout';
import { Heading, Text } from '@chakra-ui/react';
import React from 'react';

export default function ConsentErrorView() {
  return (
    <Layout>
      <Heading size="md">Oh No!</Heading>
      <Text>An unexpected error occurred. Please try again soon.</Text>
    </Layout>
  );
}
