import { Button } from '@chakra-ui/react';
import React from 'react';
import { AllowListTile } from '../components/tile.component';

interface ExploreFrequentTileViewProps {
  onExploreFrequentSenders: () => any;
}

export const ExploreFrequentTileView = ({
  onExploreFrequentSenders,
}: ExploreFrequentTileViewProps) => {
  return (
    <AllowListTile
      heading="Explore Frequent Senders"
      description="Easily decide if people who frequently email you should be Allowed (or not)"
    >
      <Button w="full" variant="outline" onClick={onExploreFrequentSenders}>
        Get Started
      </Button>
    </AllowListTile>
  );
};
