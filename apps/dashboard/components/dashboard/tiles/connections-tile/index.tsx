import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  TooltipProps,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Tile } from '@components/tile';
import React, { memo } from 'react';
import {
  IoGitNetworkOutline as NetworkIcon,
  IoShareOutline as ShareIcon,
} from 'react-icons/io5';

import { RelativeTime } from '@gated/ui/components';
import { gql } from '@apollo/client';
import { useNetworkConnectionsTileQuery } from '@gated/graphql-types';
import { ShareGatedModal } from '@components/ShareGatedModal';

gql`
  query NetworkConnectionsTile {
    networkConnections(
      input: { filter: { isUsingGated: true }, pagination: { last: 3 } }
    ) {
      edges {
        node {
          id
          avatar
          name
          joinedAt
        }
      }
    }
    networkConnectionStats {
      allKnown
      metWithGated
      usingGated
    }
  }
`;

export default function ConnectionsTile() {
  const { data, loading } = useNetworkConnectionsTileQuery();
  const shareModalDisclosure = useDisclosure();
  const tooltipProps: Partial<TooltipProps> = {
    hasArrow: true,
    placement: 'top',
    textAlign: 'center',
  };
  return (
    <Box>
      <ShareGatedModal {...shareModalDisclosure} />
      <Heading size="sm" color="subtle" mb={2}>
        <Icon as={NetworkIcon} verticalAlign="top" mr={2} />
        Your Network
        <Tooltip
          textAlign="center"
          hasArrow
          placement="top"
          label="This is a new feature. Please be patient while we finalize it."
        >
          <Badge
            bgGradient="linear(to-r, green.600, blue.700)"
            color="white"
            ml={2}
            size="sm"
          >
            BETA
          </Badge>
        </Tooltip>
      </Heading>

      <Tile>
        <StatGroup as={Box} align="center">
          <Tooltip
            label="Total people in your network, based on your connected accounts"
            {...tooltipProps}
          >
            <Stat>
              <StatLabel>Known</StatLabel>
              <StatNumber>
                {data &&
                  Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    maximumFractionDigits: 1,
                  }).format(data.networkConnectionStats.allKnown)}
              </StatNumber>
            </Stat>
          </Tooltip>
          <Tooltip
            label="People in your network who also use Gated"
            {...tooltipProps}
          >
            <Stat>
              <StatLabel>Using Gated</StatLabel>
              <StatNumber>
                {data &&
                  Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    maximumFractionDigits: 1,
                  }).format(data?.networkConnectionStats.usingGated)}
              </StatNumber>
            </Stat>
          </Tooltip>
          <Tooltip
            label="People you met through a Gated donation"
            {...tooltipProps}
          >
            <Stat>
              <StatLabel>Met via Gated</StatLabel>
              <StatNumber>
                {data &&
                  Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    maximumFractionDigits: 1,
                  }).format(data?.networkConnectionStats.metWithGated)}
              </StatNumber>
            </Stat>
          </Tooltip>
        </StatGroup>
        <Divider variant="subtle" />
        <VStack spacing={4} alignItems="start">
          <Text textStyle="label">Recently Signed Up</Text>
          {loading && (
            <>
              <RecentSignup
                avatar=""
                name="Loading"
                joinedAt={new Date()}
                loading
              />
              <RecentSignup
                avatar=""
                name="Loading"
                joinedAt={new Date()}
                loading
              />
              <RecentSignup
                avatar=""
                name="Loading"
                joinedAt={new Date()}
                loading
              />
            </>
          )}
          {data?.networkConnections.edges.length === 0 && (
            <Text textStyle="caption">
              No network connections are using Gated yet...
            </Text>
          )}

          {data?.networkConnections.edges.map((conn) => (
            <RecentSignup
              avatar={conn.node.avatar}
              name={conn.node.name}
              joinedAt={conn.node.joinedAt}
              key={conn.node.id}
            />
          ))}

          <Flex w="full">
            <Spacer />
            <Button
              variant="secondary"
              alignContent="center"
              leftIcon={<ShareIcon />}
              onClick={shareModalDisclosure.onOpen}
            >
              Invite To Gated
            </Button>
            <Spacer />
          </Flex>
        </VStack>
      </Tile>
    </Box>
  );
}

const RecentSignup = memo<{
  avatar: string;
  name: string;
  joinedAt: Date;
  loading?: boolean;
}>(({ avatar, name, joinedAt, loading = false }) => {
  return (
    <Flex align="center" justify="space-between" w="full">
      <Box mr={3}>
        <SkeletonCircle isLoaded={!loading}>
          <Avatar size="sm" name={name} src={avatar} />
        </SkeletonCircle>
      </Box>

      <Box flex={1}>
        <SkeletonText noOfLines={1} isLoaded={!loading}>
          <Text fontSize="sm">{name}</Text>
        </SkeletonText>
      </Box>
      <SkeletonText noOfLines={1} isLoaded={!loading}>
        <Text textStyle="caption">
          <RelativeTime timestamp={joinedAt} />
        </Text>
      </SkeletonText>
    </Flex>
  );
});
