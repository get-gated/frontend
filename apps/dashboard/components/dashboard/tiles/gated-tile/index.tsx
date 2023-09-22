import { useGatedStats } from '@hooks/use-gated-stats.hook';
import React from 'react';
import { GatedTileView } from './gated-tile.view';
import { Box, Heading, Icon } from '@chakra-ui/react';
import { IoHeadsetOutline as AttentionIcon } from 'react-icons/io5';
export const GatedTile = () => {
  const { loading, error, ...stats } = useGatedStats();

  return (
    <Box>
      <Heading size="sm" color="subtle" mb={2}>
        <Icon as={AttentionIcon} verticalAlign="top" mr={2} />
        Your Attention
      </Heading>
      <GatedTileView {...stats} loading={loading} error={error} />
    </Box>
  );
};
