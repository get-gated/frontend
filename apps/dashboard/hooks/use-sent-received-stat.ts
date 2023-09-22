import { gql } from '@apollo/client';
import {
  SentReceivedStatQueryInput,
  useQuerySentReceivedStatQuery,
} from '@gated/graphql-types';

export const FRAGMENT_SENT_RECEIVED_STAT_FIELDS = gql`
  fragment SentReceivedStatFields on SentReceivedStat {
    id
    domain
    username
    firstSeenAt
    lastSeenAt
    receivedCount
    sentCount
    training {
      id
      rule
      origin
      inheritedRule
    }
  }
`;

gql`
  ${FRAGMENT_SENT_RECEIVED_STAT_FIELDS}
  query QuerySentReceivedStat($input: SentReceivedStatQueryInput!) {
    sentReceivedStat(input: $input) {
      ...SentReceivedStatFields
    }
  }
`;

export const useSentReceivedStat = (input: SentReceivedStatQueryInput) => {
  const { data, loading, error } = useQuerySentReceivedStatQuery({
    variables: { input },
  });

  return {
    loading: loading,
    error,
    result: data?.sentReceivedStat,
  };
};
