import { gql } from '@apollo/client';
import { FRAGMENT_SENT_RECEIVED_STAT_FIELDS } from './use-sent-received-stat';
import {
  SentReceivedStatsInput,
  useQuerySentReceivedStatsLazyQuery,
} from '@gated/graphql-types';

gql`
  ${FRAGMENT_SENT_RECEIVED_STAT_FIELDS}
  query QuerySentReceivedStats($input: SentReceivedStatsInput!) {
    sentReceivedStats(input: $input) {
      pageInfo {
        totalResults
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...SentReceivedStatFields
        }
      }
    }
  }
`;

export const useSentReceivedStats = () => {
  const [searchQuery, { data, loading, error }] =
    useQuerySentReceivedStatsLazyQuery();

  const search = (input: SentReceivedStatsInput) => {
    return searchQuery({ variables: { input }, fetchPolicy: 'network-only' });
  };

  return {
    search,
    loading: loading,
    error,
    results: data?.sentReceivedStats,
  };
};
