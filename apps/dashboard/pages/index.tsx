import { VStack, Heading, Divider, Box } from '@chakra-ui/react';

import { GatedTile } from '@components/dashboard/tiles/gated-tile';
import DonationTile from '@components/dashboard/tiles/donation-tile';
import { OnboardingDrawer } from '@components/onboarding';
import { LinkedAccounts } from '@components/LinkedAccounts/linked-accounts';
import ConnectionsTile from '@components/dashboard/tiles/connections-tile';
import { useMe } from '@gated/app';

export default function Dashboard() {
  const { user } = useMe();
  return (
    <>
      <Box
        position="absolute"
        borderRadius="full"
        top="15%"
        right="25%"
        bg="mustard.600"
        width="350px"
        height="350px"
        filter="blur(50px)"
        opacity=".15"
        zIndex="hide"
      />
      <Box
        position="absolute"
        borderRadius="full"
        top="10%"
        right="10%"
        bg="blue.800"
        width="300px"
        height="300px"
        filter="blur(50px)"
        opacity=".2"
        zIndex="hide"
      />
      <Box
        position="absolute"
        borderRadius="full"
        bottom="10%"
        right="10%"
        bg="gray.800"
        width="200px"
        height="200px"
        filter="blur(50px)"
        opacity=".1"
        zIndex="hide"
      />
      <OnboardingDrawer />
      <VStack w="full" alignItems="left" spacing={4}>
        <Heading
          w="fit-content"
          textShadow="sm"
          mb={3}
          size={['md', 'lg', 'xl']}
          color="subtle"
        >
          Welcome, {user.firstName}!
        </Heading>

        <LinkedAccounts />
        <Divider variant="brand" size="sm" pt={4} />

        <Box sx={{ columnCount: { base: 1, lg: 2 }, columnGap: 8 }} pt={4}>
          <Box display="inline-block" w="100%" mb={6}>
            <DonationTile />
          </Box>
          <Box display="inline-block" w="100%" mb={6}>
            <GatedTile />
          </Box>

          <Box display="inline-block" w="100%" mb={6}>
            <ConnectionsTile />
          </Box>
        </Box>
      </VStack>
    </>
  );
}
