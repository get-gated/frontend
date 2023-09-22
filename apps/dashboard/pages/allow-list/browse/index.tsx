import React, { useEffect, useRef } from 'react';
import { useTrainings } from '@hooks/use-trainings.hook';

import {
  Button,
  Divider,
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

import debounce from 'lodash/debounce';
import {
  SearchTrainingsTypeEnum,
  Training,
  TrainingsSearchInput,
} from '@gated/graphql-types';
import { useDashboard } from '@hooks/use-dashboard.hook';
import { SearchResultItem } from '@components/allow-list/components/browse-rules.search-result-item.component';
import { Breadcrumbs } from '@components/allow-list/components/breadcrumbs.component';
import { Tile } from '@components/tile';
import { formatSenderFromPartsUtil } from '@gated/utils';
import { Pagination } from '@gated/ui/components';
import { ErrorMessage } from '@components/error-message';
import { useRouter } from 'next/router';
import { MdSearch as SearchIcon } from 'react-icons/md';

export const BrowseRulesPage = () => {
  const { search, searchResults, searchLoading, searchError, searchRefetch } =
    useTrainings();

  const queryInput = useRef<TrainingsSearchInput>({
    pagination: { first: 25 },
    type: SearchTrainingsTypeEnum.Addresses,
  });

  const router = useRouter();
  const { onAddRule } = useDashboard();
  useEffect(() => {
    doSearch();
  }, []);

  const doSearch = debounce(() => search(queryInput.current), 300, {
    trailing: true,
  });

  const onSearchTerm = (q) => {
    queryInput.current.query = q;
    doSearch();
  };

  const onNext = (cursor) => {
    if (!searchResults?.pageInfo.hasNextPage) return;
    queryInput.current.pagination = {
      before: queryInput?.current?.pagination?.last ? cursor : null,
      after: queryInput?.current?.pagination?.first ? cursor : null,
      first: queryInput?.current?.pagination?.first,
      last: queryInput?.current?.pagination?.last,
    };
    doSearch();
  };

  const onPrev = (cursor) => {
    if (!searchResults?.pageInfo.hasPreviousPage) return;
    queryInput.current.pagination = {
      before: queryInput?.current?.pagination?.last ? null : cursor,
      after: queryInput?.current?.pagination?.first ? null : cursor,
      first: queryInput?.current?.pagination?.first,
      last: queryInput?.current?.pagination?.last,
    };
    doSearch();
  };

  const onSearchType = (type: SearchTrainingsTypeEnum) => {
    queryInput.current.type = type;
    queryInput.current.pagination.after = null;
    doSearch();
  };

  const onGotoRule = (email) => router.push(`/allow-list/details/${email}`);

  const loadingRows = [
    <SearchResultItem
      result={{ domain: 'test@test.com' } as Training}
      key="loading-1"
      isLoaded={false}
    />,
    <SearchResultItem
      result={{ domain: 'testingalongeremail@test.com' } as Training}
      key="loading-2"
      isLoaded={false}
    />,
    <SearchResultItem
      result={{ domain: 'mediumone@test.com' } as Training}
      key="loading-3"
      isLoaded={false}
    />,
  ];

  return (
    <VStack alignItems="left" w="100%">
      <Breadcrumbs />
      <Heading>Browse Allow List</Heading>
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
                defaultValue={queryInput.current.type as string}
                as={Stack}
                direction={['column', 'row']}
              >
                <Radio value={SearchTrainingsTypeEnum.Addresses} mr={2}>
                  Addresses
                </Radio>
                <Radio value={SearchTrainingsTypeEnum.Domains}>Domains</Radio>
              </RadioGroup>
              <Divider />
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddRule({ onCompleted: searchRefetch })}
              >
                Add Rule
              </Button>
            </VStack>
          </Tile>
        </GridItem>
        <GridItem colSpan={{ base: 10, md: 7 }} colStart={{ base: 1, md: 4 }}>
          <VStack divider={<StackDivider />}>
            {searchLoading
              ? loadingRows
              : searchResults?.edges.map(({ node }) => (
                  <SearchResultItem
                    key={node.id}
                    result={node}
                    onClick={() =>
                      onGotoRule(
                        formatSenderFromPartsUtil(node.username, node.domain),
                      )
                    }
                  />
                ))}
            {!searchLoading && searchResults?.edges.length === 0 && (
              <>No rules found.</>
            )}
            {searchError && (
              <ErrorMessage
                message="An error occurred while searching your Allow List"
                onRetry={() => {
                  doSearch();
                }}
              />
            )}
          </VStack>
          {(searchLoading || searchResults?.pageInfo.totalResults > 0) && (
            <Pagination
              {...searchResults?.pageInfo}
              onNext={onNext}
              onPrev={onPrev}
              pageSize={searchResults?.edges.length}
              isLoading={searchLoading}
            />
          )}
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default BrowseRulesPage;
