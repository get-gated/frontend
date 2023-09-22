import { Box, GridItem, Heading, Text } from '@chakra-ui/react';
import { Tile } from '@components/tile';

interface TileProps {
  heading: string;
  description: string;
  children: React.ReactNode;
}
export const AllowListTile = ({
  heading,
  description,
  children,
}: TileProps) => {
  return (
    <GridItem colSpan={{ base: 9, md: 3 }}>
      <Tile overflow="visible">
        <Heading size="md" minH="60px" maxH="60px">
          {heading}
        </Heading>
        <Text minH={100} maxH={100}>
          {description}
        </Text>
        <Box>{children}</Box>
      </Tile>
    </GridItem>
  );
};
