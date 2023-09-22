import React from 'react';

import {
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TestAddressTile } from '@components/allow-list/tiles/test-address.view';
import { ExploreFrequentTileView } from '@components/allow-list/tiles/explore-frequent-tile.view';
import { ReviewRulesTileView } from '@components/allow-list/tiles/review-rules-tile.view';

export const AllowListPage = () => {
  const router = useRouter();
  const onTest = (value: string) => {
    router.push(`/allow-list/test/${value}`);
  };
  const onBrowse = () => router.push('/allow-list/browse');

  const onViewDetails = (value: string) => {
    router.push(`/allow-list/details/${value}`);
  };

  const onExploreFrequentSenders = () =>
    router.push('/allow-list/frequent-senders');

  return (
    <VStack spacing={8} w="full">
      <Heading w="full">Allow List</Heading>
      <Grid templateColumns="repeat(9, 1fr)" gap={6} w="full">
        <GridItem colSpan={{ base: 9, md: 3 }}>
          <ReviewRulesTileView onViewDetails={onViewDetails} />
        </GridItem>
        <GridItem colSpan={{ base: 9, md: 3 }}>
          <ExploreFrequentTileView
            onExploreFrequentSenders={onExploreFrequentSenders}
          />
        </GridItem>
        <GridItem colSpan={{ base: 9, md: 3 }}>
          <TestAddressTile onTest={onTest} />
        </GridItem>
      </Grid>
      <Center>
        <Button
          variant="link"
          _light={{ color: 'gray.700' }}
          _dark={{ color: 'white' }}
          onClick={onBrowse}
        >
          or browse your entire Allow List
        </Button>
      </Center>
    </VStack>
  );
};
export default AllowListPage;
