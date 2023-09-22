import { gql } from '@apollo/client';
import { useQueryDecisionTestLazyQuery } from '@gated/graphql-types';

export const QUERY_DECISION_TEST = gql`
  query QueryDecisionTest($address: String!) {
    decisionTest(input: { address: $address }) {
      ruling
      verdict

      enforcedPattern {
        id
        expression
      }
      enforcedTraining {
        id
        domain
        username
        createdAt
        origin
        inheritedRule
      }
    }
  }
`;

export const useDecisionTest = () => {
  const [query, { data, loading, error }] = useQueryDecisionTestLazyQuery({
    fetchPolicy: 'network-only',
  });

  const onTest = async (address: string): Promise<void> => {
    await query({ variables: { address } });
  };

  return { onTest, result: data?.decisionTest, loading, error };
};
