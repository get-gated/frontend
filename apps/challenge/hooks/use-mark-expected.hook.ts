import { useCallback } from 'react';
import { gql, MutationUpdaterFn } from '@apollo/client';
import {
  ChallengeMarkExpectedInput,
  useChallengeMarkExpectedMutation,
} from '@gated/graphql-types';

gql`
  mutation ChallengeMarkExpected($input: ChallengeMarkExpectedInput!) {
    challengeMarkExpected(input: $input)
  }
`;

export const useMarkExpected = () => {
  const [markExpectedMutation, { error, loading }] =
    useChallengeMarkExpectedMutation();

  const markExpected = useCallback(
    (input: ChallengeMarkExpectedInput, update?: MutationUpdaterFn) => {
      return markExpectedMutation({
        variables: { input },
        update,
      });
    },
    [],
  );

  return { error, loading, markExpected };
};
