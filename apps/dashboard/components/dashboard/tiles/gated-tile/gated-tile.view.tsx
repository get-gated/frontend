import React, { memo, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { IUseGatedStatsReturn } from '@hooks/use-gated-stats.hook';
import { RelativeTime } from '@gated/ui/components';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import { RuleEnum, useRecentDecisionsQuery } from '@gated/graphql-types';

gql`
  query RecentDecisions {
    decisions(
      input: { filter: { rulings: [Gate, Mute] }, pagination: { last: 3 } }
    ) {
      edges {
        node {
          id
          emailAddress
          decidedAt
          ruling
        }
      }
    }
  }
`;

const StatItem = ({ number, delta, title, loading = false, tooltip }) => {
  return (
    <Tooltip label={tooltip} hasArrow placement="top" textAlign="center">
      <Stat>
        <StatLabel>{title}</StatLabel>
        <StatNumber>
          {number}
          {loading && <SkeletonText />}
        </StatNumber>
        {delta && (
          <StatHelpText>
            <StatArrow type={delta > 0 ? 'increase' : 'decrease'} />
            {Math.round(delta * 1000) / 10}%
          </StatHelpText>
        )}
      </Stat>
    </Tooltip>
  );
};

const RecentDecision = memo<{
  emailAddress: string;
  decidedAt: Date;
  ruling: RuleEnum;
  loading?: boolean;
}>(({ emailAddress, decidedAt, loading }) => {
  return (
    <Flex w="full">
      <Box mr={3}>
        <SkeletonCircle isLoaded={!loading}>
          <Avatar size="sm" name={emailAddress} />
        </SkeletonCircle>
      </Box>

      <VStack alignItems="start" flex={1} textAlign="left">
        <SkeletonText noOfLines={1} isLoaded={!loading}>
          <Text fontSize="sm">{emailAddress}</Text>
        </SkeletonText>
      </VStack>

      <Skeleton isLoaded={!loading}>
        <Text textStyle="caption">
          <RelativeTime timestamp={decidedAt} />
        </Text>
      </Skeleton>
    </Flex>
  );
});

export const GatedTileView = memo<IUseGatedStatsReturn>(
  ({ received, gated, percentGated, loading }) => {
    const router = useRouter();
    const {
      startPolling,
      loading: recentDecisionsLoading,
      data,
    } = useRecentDecisionsQuery();

    useEffect(() => {
      startPolling(5000);
    }, []);

    return (
      <Box p="6" w="full" bg="bg-surface" borderRadius="lg" shadow="xs">
        <Text textStyle="label">Last 30 Days</Text>

        <Box>
          <StatGroup textAlign="center" w="full" pt={4}>
            <StatItem
              title="Received"
              number={
                received &&
                Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  maximumFractionDigits: 1,
                }).format(received?.total)
              }
              delta={received?.delta}
              loading={loading}
              tooltip="Messages received across all connected inboxes in last 30 days"
            />
            <StatItem
              title="Gated"
              number={
                gated &&
                Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  maximumFractionDigits: 1,
                }).format(gated?.total)
              }
              delta={gated?.delta}
              loading={loading}
              tooltip="Messages moved out of your inbox(es) across all connected inboxes in last 30 days"
            />

            <StatItem
              title="% Gated"
              number={((percentGated?.total || 0) * 100).toPrecision(3) + '%'}
              delta={percentGated?.delta}
              loading={loading}
              tooltip="Percentage of messages moved out of your inbox(es) across all connected inboxes in last 30 days"
            />
          </StatGroup>
          <Divider variant="subtle" />
        </Box>
        <VStack spacing={3} alignItems="start">
          <Flex w="full">
            <Text textStyle="label">Recently Gated Messages</Text>
            <Spacer />
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => router.push('/allow-list')}
            >
              Manage Allow List
            </Button>
          </Flex>

          {data?.decisions.edges.length === 0 && (
            <Text textStyle="caption">No messages have been Gated yet.</Text>
          )}
          {data?.decisions.edges.map((decision) => {
            return (
              <RecentDecision
                emailAddress={decision.node.emailAddress}
                decidedAt={decision.node.decidedAt}
                ruling={decision.node.ruling}
                key={decision.node.id}
              />
            );
          })}
          {recentDecisionsLoading && (
            <>
              <RecentDecision
                emailAddress="loading@email.com"
                decidedAt={new Date()}
                ruling={RuleEnum.Allow}
                loading
              />
              <RecentDecision
                emailAddress="loading@email.com"
                decidedAt={new Date()}
                ruling={RuleEnum.Allow}
                loading
              />
              <RecentDecision
                emailAddress="loading@email.com"
                decidedAt={new Date()}
                ruling={RuleEnum.Allow}
                loading
              />
            </>
          )}
        </VStack>
      </Box>
    );
  },
);
