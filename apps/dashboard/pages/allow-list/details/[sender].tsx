import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Skeleton,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import RouterLink from 'next/link';
import { useDashboard } from '@hooks/use-dashboard.hook';
import { emailPartsUtil, formatCurrencyUtil } from '@gated/utils';
import { useSentReceivedStat } from '@hooks/use-sent-received-stat';
import { useDonationTotalFromSender } from '@hooks/use-donation-total-from-sender.hook';
import { ErrorMessage } from '@components/error-message';
import { SenderAvatar } from '@gated/ui/components';
import { Breadcrumbs } from '@components/allow-list/components/breadcrumbs.component';
import { RuleTag } from '@components/rule-tag';
import { useTrainings } from '@hooks/use-trainings.hook';
import { SenderItem } from '@components/allow-list/components/sender-item.component';
import {
  SentReceivedStatSortByEnum,
  SentReceivedStatTypeEnum,
} from '@gated/graphql-types';
import { useSentReceivedStats } from '@hooks/use-sent-received-stats.hook';

export const SenderDetailsPage = (props) => {
  const router = useRouter();

  const sender = router.query.sender as string;

  const { onEditRule } = useDashboard();

  const { domain, username } = emailPartsUtil(sender);
  const isDomain = !username;

  const onGotoSender = (gotoSender: string) =>
    router.push(`/allow-list/details/${gotoSender}`);

  const { result, loading, error } = useSentReceivedStat({ sender });
  const { result: donations, loading: donationsLoading } =
    useDonationTotalFromSender({ sender });

  if (error)
    return (
      <ErrorMessage message="We experienced an error loading this page. Please try again soon." />
    );

  return (
    <Stack gap={10} w="full">
      <Stack>
        <Breadcrumbs />
        <HStack>
          <SenderAvatar sender={sender} />

          <Box>
            <Heading>{sender}</Heading>
            {!isDomain && (
              <Link
                as={RouterLink}
                textStyle="footnote"
                position="absolute"
                href={`/allow-list/details/${domain}`}
              >
                <a>view all of {domain}</a>
              </Link>
            )}
          </Box>
          <Skeleton isLoaded={!loading}>
            <RuleTag
              rule={result?.training?.rule}
              inheritedRule={result?.training?.inheritedRule}
              onClick={(e) => {
                e.stopPropagation();
                onEditRule({
                  domain,
                  username,
                  ruleId: result.training?.id,
                  currentRule: result.training?.rule,
                  isDomainOnly: isDomain,
                  isCreationMode: !result.training,
                });
              }}
            />
          </Skeleton>
        </HStack>
      </Stack>
      <HStack>
        <Stat>
          <StatLabel>Received</StatLabel>
          <Skeleton isLoaded={!loading}>
            <StatNumber>{result?.receivedCount || '0'}</StatNumber>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <StatHelpText>
              {result?.firstSeenAt ? (
                <>
                  since{' '}
                  {new Date(result?.firstSeenAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: '2-digit',
                    day: 'numeric',
                  })}
                </>
              ) : (
                '--'
              )}
            </StatHelpText>
          </Skeleton>
        </Stat>
        <Stat>
          <StatLabel>Sent</StatLabel>
          <Skeleton isLoaded={!loading}>
            <StatNumber>{result?.sentCount || '0'}</StatNumber>
          </Skeleton>
          <StatHelpText>--</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Last Seen</StatLabel>
          <Skeleton isLoaded={!loading}>
            <StatNumber>
              {result?.lastSeenAt
                ? new Date(result?.lastSeenAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: '2-digit',
                    day: 'numeric',
                  })
                : 'Never'}
            </StatNumber>
          </Skeleton>
          <StatHelpText>--</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Donations</StatLabel>
          <Skeleton isLoaded={!donationsLoading}>
            <StatNumber>
              {formatCurrencyUtil(donations?.totalAmountInCents)}
            </StatNumber>
          </Skeleton>
          <Skeleton isLoaded={!donationsLoading}>
            <StatHelpText>
              {donations?.donationsCount > 0 ? (
                <>{donations?.donationsCount} total</>
              ) : (
                <>--</>
              )}
            </StatHelpText>
          </Skeleton>
        </Stat>
      </HStack>
      {/* <Alert flexDirection="column" alignItems="left"> */}
      {/*   <HStack alignItems="top"> */}
      {/*     <AlertIcon /> */}
      {/*     <VStack alignItems="left"> */}
      {/*       <AlertTitle>Recommendation</AlertTitle> */}
      {/*       <AlertDescription> */}
      {/*         You have <strong>over 3</strong> senders from this domain on your{' '} */}
      {/*         <strong>Allow List</strong>. Consider adding the domain to your */}
      {/*         Allow List.{' '} */}
      {/*       </AlertDescription> */}
      {/*     </VStack> */}
      {/*   </HStack> */}
      {/* </Alert> */}
      {isDomain && (
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <GridItem>
            <Heading size="md" mb={2}>
              Your Address Rules
            </Heading>
            <TrainedSenders domain={domain} onGotoSender={onGotoSender} />
          </GridItem>
          <GridItem>
            <Heading size="md" mb={2}>
              Recent Activity
            </Heading>
            <UntrainedSenders domain={domain} onGotoSender={onGotoSender} />
          </GridItem>
        </Grid>
      )}
    </Stack>
  );
};

interface SendersProps {
  domain: string;
  onGotoSender: (gotoSender: string) => void;
}

export const TrainedSenders = ({ domain, onGotoSender }: SendersProps) => {
  const { search, searchResults, searchError, searchLoading, searchRefetch } =
    useTrainings();
  useEffect(() => {
    search({ forDomain: domain });
  }, []);

  const { onEditRule } = useDashboard();

  if (searchLoading || !searchResults) return <LoadingSenderItems />;

  if (searchError) {
    return <SenderItemsEmptyState message="Error loading rules for domain." />;
  }

  if (searchResults?.edges.length === 0) {
    return (
      <SenderItemsEmptyState message="No rules for senders at this domain yet.">
        <Button
          variant="link"
          onClick={() =>
            onEditRule({
              domain,
              isCreationMode: true,
              isDomainOnly: false,
              onCompleted: searchRefetch,
            })
          }
        >
          Create Rule
        </Button>
      </SenderItemsEmptyState>
    );
  }

  return (
    <VStack divider={<Divider />}>
      {searchResults?.edges.map(({ node }) => {
        return (
          <SenderItem
            key={node.id}
            emailAddress={`${node.username}@${node.domain}`}
            rule={node.rule}
            inheritedRule={node.inheritedRule}
            onClick={() => onGotoSender(`${node.username}@${node.domain}`)}
          />
        );
      })}
    </VStack>
  );
};

export const UntrainedSenders = ({ domain, onGotoSender }: SendersProps) => {
  const { search, results, error, loading } = useSentReceivedStats();
  useEffect(() => {
    search({
      type: SentReceivedStatTypeEnum.Address,
      filter: { forDomain: domain },
      sortBy: SentReceivedStatSortByEnum.LastSeenAt,
      pagination: { last: 25 },
    });
  }, []);

  if (loading || !results) return <LoadingSenderItems />;

  if (results.edges.length === 0) {
    return (
      <SenderItemsEmptyState message="No activity from this domain yet." />
    );
  }

  if (error) {
    return (
      <SenderItemsEmptyState message="Error loading activity for domain." />
    );
  }

  return (
    <VStack divider={<Divider />}>
      {results.edges.map(({ node }) => (
        <SenderItem
          key={node.id}
          emailAddress={`${node.username}@${node.domain}`}
          rule={node.training?.rule}
          inheritedRule={node.training?.inheritedRule}
          onClick={() => onGotoSender(`${node.username}@${node.domain}`)}
        />
      ))}
    </VStack>
  );
};

const LoadingSenderItems = () => (
  <VStack divider={<Divider />}>
    <SenderItem emailAddress="test@xyz.com" isLoaded={false} />
    <SenderItem
      emailAddress="longer-email-address@domain.com"
      isLoaded={false}
    />
    <SenderItem emailAddress="testing@domain.com" isLoaded={false} />
  </VStack>
);

interface SenderItemsEmptyStateProps {
  message: string | React.ReactNode;
  children?: React.ReactNode;
}
const SenderItemsEmptyState = ({
  children,
  message,
}: SenderItemsEmptyStateProps) => (
  <VStack py="50px">
    <Text textStyle="footnote">{message}</Text>
    <>{children}</>
  </VStack>
);

export default SenderDetailsPage;
