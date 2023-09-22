import { gql } from '@apollo/client';
import {
  DecisionsInput,
  useQueryDecisionLazyQuery,
  useQueryDecisionsLazyQuery,
} from '@gated/graphql-types';

const FRAGMENT_DECISION_FIELDS = gql`
  fragment DecisionFields on Decision {
    id
    decidedAt
    emailAddress
    verdict
    ruling
    connection {
      id
      emailAddress
    }
    challenge {
      id
      hasExpected
      hasDonation
      interactions(input: { interaction: Donated }) {
        edges {
          node {
            paymentAmount
            performedAt
          }
        }
      }
    }
  }
`;

gql`
  ${FRAGMENT_DECISION_FIELDS}
  query QueryDecisions($input: DecisionsInput!) {
    decisions(input: $input) {
      pageInfo {
        totalResults
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ...DecisionFields
        }
      }
    }
  }
`;

gql`
  ${FRAGMENT_DECISION_FIELDS}
  query QueryDecision($decisionId: ID!) {
    decision(id: $decisionId) {
      ...DecisionFields
    }
  }
`;

export const useDecisions = () => {
  const [
    searchQuery,
    {
      data: searchResults,
      loading: searchLoading,
      error: searchError,
      fetchMore,
    },
  ] = useQueryDecisionsLazyQuery();
  const [
    getQuery,
    { data: decision, loading: decisionLoading, error: decisionError },
  ] = useQueryDecisionLazyQuery({
    fetchPolicy: 'cache-first',
  });

  const nextPage = () => {
    if (!searchResults?.decisions.pageInfo.hasNextPage) return;
    const after = searchResults.decisions.pageInfo.endCursor;
    return fetchMore({ variables: { input: { pagination: { after } } } });
  };

  const search = (input: DecisionsInput = {}) => {
    return searchQuery({ variables: { input } });
  };

  const get = (decisionId: string) => {
    return getQuery({ variables: { decisionId } });
  };

  return {
    search,
    searchResults: searchResults?.decisions,
    searchLoading,
    searchError,
    nextPage,
    get,
    decision,
    decisionLoading,
    decisionError,
  };
};
