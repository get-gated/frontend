import React, { useEffect, useRef } from 'react';

import {
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react';

import { MdSearch as SearchIcon } from 'react-icons/md';

import { useSentReceivedStats } from '@hooks/use-sent-received-stats.hook';
import debounce from 'lodash/debounce';

import { formatSenderFromPartsUtil } from '@gated/utils';
import { useRouter } from 'next/router';
import {
  SentReceivedStat,
  SentReceivedStatsInput,
  SentReceivedStatTypeEnum,
} from '@gated/graphql-types';
import { FrequentSenderSearchResultItem } from '@components/allow-list/components/frequent-sender.search-result-item.component';
import { Breadcrumbs } from '@components/allow-list/components/breadcrumbs.component';
import { Tile } from '@components/tile';
import { ErrorMessage } from '@components/error-message';
import { Pagination } from '@gated/ui/components';

export const FrequentSendersPage = () => {
  const { search, results, loading, error } = useSentReceivedStats();
  const router = useRouter();

  const queryInput = useRef<SentReceivedStatsInput>({
    type: SentReceivedStatTypeEnum.Address,
    pagination: { last: 25 },
    filter: {},
  });

  useEffect(() => {
    doSearch();
  }, []);

  const doSearch = debounce(() => search(queryInput.current), 300, {
    trailing: true,
  });

  const onSearchTerm = (q) => {
    queryInput.current = Object.assign({}, queryInput.current, {
      filter: { query: q },
    });
    doSearch();
  };

  const onNext = (cursor) => {
    if (!results?.pageInfo.hasNextPage) return;
    queryInput.current.pagination = {
      before: queryInput?.current?.pagination?.last ? cursor : null,
      after: queryInput?.current?.pagination?.first ? cursor : null,
      first: queryInput?.current?.pagination?.first,
      last: queryInput?.current?.pagination?.last,
    };
    doSearch();
  };

  const onPrev = (cursor) => {
    if (!results?.pageInfo.hasPreviousPage) return;
    queryInput.current.pagination = {
      before: queryInput?.current?.pagination?.last ? null : cursor,
      after: queryInput?.current?.pagination?.first ? null : cursor,
      first: queryInput?.current?.pagination?.first,
      last: queryInput?.current?.pagination?.last,
    };
    doSearch();
  };

  const onSearchType = (type: SentReceivedStatTypeEnum) => {
    queryInput.current.type = type;
    doSearch();
  };

  const loadingRows = [
    <FrequentSenderSearchResultItem
      result={{ domain: 'test@test.com', receivedCount: 1 } as SentReceivedStat}
      key="loading-1"
      isLoaded={false}
    />,
    <FrequentSenderSearchResultItem
      result={
        {
          domain: 'testingalongeremail@test.com',
          receivedCount: 1,
        } as SentReceivedStat
      }
      key="loading-2"
      isLoaded={false}
    />,
    <FrequentSenderSearchResultItem
      result={
        { domain: 'mediumone@test.com', receivedCount: 1 } as SentReceivedStat
      }
      key="loading-3"
      isLoaded={false}
    />,
  ];

  return (
    <VStack alignItems="left">
      <Breadcrumbs />
      <Heading>Frequent Senders</Heading>
      <Grid templateColumns="repeat(10, 1fr)" gap={6} w="full">
        <GridItem colSpan={{ base: 10, md: 3 }}>
          <Tile>
            <VStack spacing={5}>
              <InputGroup>
                <InputLeftAddon>
                  <Icon as={SearchIcon} />
                </InputLeftAddon>
                <Input onChange={(e) => onSearchTerm(e.target.value)} />
              </InputGroup>
              <RadioGroup
                onChange={onSearchType}
                defaultValue={queryInput.current.type}
                as={Stack}
                direction={['column', 'row']}
              >
                <Radio value={SentReceivedStatTypeEnum.Address} mr={2}>
                  Addresses
                </Radio>
                <Radio value={SentReceivedStatTypeEnum.Domain}>Domains</Radio>
              </RadioGroup>
            </VStack>
          </Tile>
        </GridItem>
        <GridItem colSpan={{ base: 10, md: 7 }} colStart={{ base: 1, md: 4 }}>
          <VStack divider={<StackDivider />}>
            {loading && loadingRows}
            {results?.edges.map(({ node }) => (
              <FrequentSenderSearchResultItem
                key={node.id}
                result={node as SentReceivedStat}
                onClick={() =>
                  router.push(
                    `/allow-list/details/${formatSenderFromPartsUtil(
                      node.username,
                      node.domain,
                    )}`,
                  )
                }
              />
            ))}
            {!loading && results?.edges.length === 0 && (
              <>No frequent senders found.</>
            )}
            {error && (
              <ErrorMessage
                message="An error occurred while searching your frequent senders."
                onRetry={doSearch}
              />
            )}
          </VStack>
          {(loading || results?.pageInfo.totalResults > 0) && (
            <Pagination
              {...results?.pageInfo}
              onNext={onNext}
              onPrev={onPrev}
              pageSize={results?.edges.length}
              isLoading={loading}
            />
          )}
        </GridItem>
      </Grid>
    </VStack>
  );
};
export default FrequentSendersPage;
