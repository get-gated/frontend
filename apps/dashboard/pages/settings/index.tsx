import React from 'react';
import {
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { NameAvatarView } from '@components/settings/name-avatar';
import { NotificationsView } from '@components/settings/notifications';
import { ChallengeView } from '@components/settings/challenge';
import { useApp } from '@gated/app';
import { DestroyView } from '@components/settings/destroy';
import Head from 'next/head';

export const SettingsPage = () => {
  return (
    <>
      <Head>
        <title>Settings &amp; Preference</title>
      </Head>
      <Box maxW="xl" mx="auto">
        <Stack as="section" spacing="6">
          <Heading size="md" fontWeight="semibold">
            Settings & Preferences
          </Heading>
          <Box
            bg={useColorModeValue('white', 'gray.800')}
            shadow="base"
            rounded="lg"
            p={{ base: '4', md: '8' }}
          >
            <Stack divider={<StackDivider />} spacing="6">
              <NameAvatarView />
              <ChallengeView />
              <NotificationsView />
              <DestroyView />
            </Stack>
          </Box>
        </Stack>
        <Text textStyle="footnote" textAlign="center" pt={3}>
          {process.env.GIT_REF_NAME}
        </Text>
      </Box>
    </>
  );
};
export default SettingsPage;
