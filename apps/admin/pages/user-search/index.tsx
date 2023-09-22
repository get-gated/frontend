import React, { useEffect } from 'react';
import { gql } from '@apollo/client';
import { UserSearchView } from '@components/user-search/user-search.view';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';
import { useUsersLazyQuery } from '@gated/graphql-types';

const queryParam = 'query';

gql`
  query Users($query: String!) {
    userSearch(query: $query) {
      results {
        id
        avatar
        fullName
        joinedAt
        isDisabled
      }
    }
  }
`;

export default function UserSearch() {
  const router = useRouter();

  const [onSearch, searchState] = useUsersLazyQuery({
    fetchPolicy: 'cache-first',
  });

  const setQuery = debounce(
    (val) => {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, [queryParam]: val },
        },
        undefined,
        { shallow: true },
      );
    },
    500,
    { trailing: true },
  );

  const query = (router.query[queryParam] as string) || '';

  const onSelectUser = (userId: string) => {
    router.push('/user/' + userId);
  };

  useEffect(() => {
    if (!query) return;

    onSearch({ variables: { query } });
  }, [query]);

  const props = {
    searchState,
    query,
    setQuery,
    onSelectUser,
  };

  return <UserSearchView {...props} />;
}
