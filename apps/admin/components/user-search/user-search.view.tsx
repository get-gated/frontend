import React, { memo, useEffect } from 'react';
import {
  Avatar,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  useToast,
  Tr,
  HStack,
  Text,
  Stack,
} from '@chakra-ui/react';
import { RelativeTime } from '@gated/ui/components/relative-time';
import { UsersQuery } from '@gated/graphql-types';
import { QueryResult } from '@apollo/client';

interface IUserSearchView {
  searchState: QueryResult<UsersQuery, any>;
  setQuery: (arg0: string) => void;
  query: string;
  onSelectUser: (arg0: string) => void;
}

export const UserSearchView = memo<IUserSearchView>(
  ({ setQuery, searchState, query, onSelectUser }) => {
    const errorToast = useToast();

    useEffect(() => {
      if (!searchState.error) return;

      errorToast({
        status: 'error',
        title: 'Error executing search',
        description: searchState.error.message,
      });
    }, [searchState.error]);

    return (
      <Stack flex={1}>
        <Input
          placeholder="Search Users..."
          onChange={(e) => setQuery(e.target.value)}
          defaultValue={query}
        />
        <TableContainer>
          <Table variant="simple">
            <TableCaption placement="top">
              <Text textStyle="footnote">
                {searchState.loading && 'Searching...'}
                {searchState.data &&
                  `Found ${searchState.data.userSearch.results.length} users`}
                {!searchState.data?.userSearch.results && (
                  <>Enter your search query above...</>
                )}
              </Text>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Joined</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchState.data?.userSearch.results.map((item) => (
                <Tr
                  key={item.id}
                  onClick={() => onSelectUser(item.id)}
                  _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                >
                  <Td>
                    <HStack>
                      <Avatar
                        size="sm"
                        src={item.avatar || undefined}
                        name={item.fullName}
                      />
                      <Text
                        style={{
                          textDecoration: item.isDisabled ? 'line-through' : '',
                        }}
                      >
                        {item.fullName}
                      </Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Text textStyle="footnote">
                      <RelativeTime timestamp={item.joinedAt} />
                    </Text>
                  </Td>
                </Tr>
              ))}
              {searchState.data?.userSearch.results.length === 0 && query && (
                <Tr>
                  <Td colSpan={2}>No Results for {query}</Td>
                </Tr>
              )}
              {!searchState.data?.userSearch.results && (
                <Tr>
                  <Td colSpan={2}></Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    );
  },
);
