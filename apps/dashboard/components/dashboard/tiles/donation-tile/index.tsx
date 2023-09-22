import React, { memo } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
  Icon,
  VStack,
  Tooltip,
  TooltipProps,
} from '@chakra-ui/react';
import { Tile } from '@components/tile';
import { formatCurrencyUtil } from '@gated/utils';
import { gql } from '@apollo/client';
import { useDonationTileQuery } from '@gated/graphql-types';
import { NonprofitModal } from '@components/NonprofitModal';

import { IoHeartOutline as ImpactIcon } from 'react-icons/io5';
import { ShareNonprofitModal } from '@components/ShareNonprofitModal';
import { useMe } from '@gated/app';

gql`
  query DonationTile {
    challengeStats {
      donationTotal
      donationAllTimeHigh
      challengesSent
    }
    challengeInteractions(
      input: { interaction: Donated, pagination: { last: 3 } }
    ) {
      edges {
        node {
          paymentAmount
          performedAt
          challenge {
            to
          }
        }
      }
    }
  }
`;

export default function DonationTileView() {
  const { data, loading } = useDonationTileQuery();
  const changeDisclosure = useDisclosure();
  const shareDisclosure = useDisclosure();
  const { user } = useMe();

  const lastThreeDonations = data?.challengeInteractions.edges || [];
  const tooltipProps: Partial<TooltipProps> = {
    hasArrow: true,
    placement: 'top',
    textAlign: 'center',
  };
  return (
    <Box>
      <ShareNonprofitModal {...shareDisclosure} />
      <NonprofitModal {...changeDisclosure} />
      <Heading size="sm" color="subtle" mb={2}>
        <Icon as={ImpactIcon} verticalAlign="top" mr={2} />
        Your Impact
      </Heading>

      <Tile>
        <Box>
          <Flex>
            <Text textStyle="label">Selected Nonprofit</Text>
            <Spacer />
            <Button
              variant="tertiary"
              size="sm"
              onClick={changeDisclosure.onOpen}
            >
              Change
            </Button>
          </Flex>

          <Text fontSize="lg">{user.nonprofit.name}</Text>
        </Box>
        <Divider variant="subtle" />

        <StatGroup as={Box} align="center">
          <Tooltip
            label="Total amount of donations you've received"
            {...tooltipProps}
          >
            <Stat>
              <StatLabel>Total Raised</StatLabel>
              <StatNumber>
                {loading ? (
                  <SkeletonText noOfLines={1} />
                ) : (
                  formatCurrencyUtil(data?.challengeStats.donationTotal)
                )}
              </StatNumber>
            </Stat>
          </Tooltip>
          <Tooltip label="Largest donation you've received" {...tooltipProps}>
            <Stat>
              <StatLabel>Largest</StatLabel>
              <StatNumber>
                {loading ? (
                  <SkeletonText noOfLines={1} />
                ) : (
                  formatCurrencyUtil(data?.challengeStats.donationAllTimeHigh)
                )}
              </StatNumber>
            </Stat>
          </Tooltip>
          <Tooltip
            label="Number of impressions you've generated for your selected nonprofit"
            {...tooltipProps}
          >
            <Stat>
              <StatLabel>Impressions</StatLabel>
              <StatNumber>
                {loading ? (
                  <SkeletonText noOfLines={1} />
                ) : (
                  data &&
                  Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    maximumFractionDigits: 1,
                  }).format(data?.challengeStats.challengesSent)
                )}
              </StatNumber>
            </Stat>
          </Tooltip>
        </StatGroup>
        <Divider variant="subtle" />
        <VStack spacing={5} alignItems="start">
          <Text textStyle="label">Recent Donations</Text>
          {lastThreeDonations.length === 0 && (
            <Text textStyle="caption">
              No donations received yet. We&apos;ll let you know when you get
              your first.
            </Text>
          )}
          {lastThreeDonations.map((donation) => {
            return (
              <RecentDonation
                emailAddress={donation.node.challenge.to}
                donationAmount={donation.node.paymentAmount as number}
                key={donation.node.performedAt}
              />
            );
          })}

          <Flex w="full">
            <Spacer />
            <Button
              variant="secondary"
              alignContent="center"
              leftIcon={<ImpactIcon />}
              onClick={shareDisclosure.onOpen}
            >
              Share Your Nonprofit
            </Button>
            <Spacer />
          </Flex>
        </VStack>
      </Tile>
    </Box>
  );
}

const RecentDonation = memo<{
  emailAddress: string;
  donationAmount: number;
  loading?: boolean;
}>(({ emailAddress, donationAmount, loading = false }) => {
  return (
    <Flex align="center" justify="space-between" w="full">
      <Box mr={3}>
        <SkeletonCircle isLoaded={!loading}>
          <Avatar size="sm" name={emailAddress} />
        </SkeletonCircle>
      </Box>
      <Box flex={1}>
        <SkeletonText noOfLines={1} isLoaded={!loading}>
          <Text fontSize="sm">{emailAddress}</Text>
        </SkeletonText>
      </Box>
      <Skeleton isLoaded={!loading}>
        <Badge>{formatCurrencyUtil(donationAmount)}</Badge>
      </Skeleton>
    </Flex>
  );
});
