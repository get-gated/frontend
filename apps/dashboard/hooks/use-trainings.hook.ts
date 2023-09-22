import { useCallback } from 'react';
import { gql } from '@apollo/client';
import {
  RuleEnum,
  TrainingOriginEnum,
  TrainingsSearchInput,
  useSearchTrainingsLazyQuery,
  useTrainAddressMutation,
  useTrainDomainMutation,
} from '@gated/graphql-types';

const FRAGMENT_TRAINING_FIELDS = gql`
  fragment TrainingFields on Training {
    id
    origin
    rule
    domain
    username
    createdAt
    inheritedRule
  }
`;

gql`
  ${FRAGMENT_TRAINING_FIELDS}
  mutation TrainAddress($address: String!, $rule: RuleEnum!) {
    trainAddress(
      input: { emailAddress: $address, rule: $rule, origin: UserApp }
    ) {
      ...TrainingFields
    }
  }
`;

gql`
  ${FRAGMENT_TRAINING_FIELDS}
  mutation TrainDomain($domain: String!, $rule: RuleEnum!) {
    trainDomain(input: { domain: $domain, rule: $rule, origin: UserApp }) {
      ...TrainingFields
    }
  }
`;

gql`
  ${FRAGMENT_TRAINING_FIELDS}
  query SearchTrainings($input: TrainingsSearchInput!) {
    trainingSearch(input: $input) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
        totalResults
      }
      edges {
        cursor
        node {
          ...TrainingFields
        }
      }
    }
  }
`;

export const useTrainings = () => {
  const [
    trainAddressMutation,
    { loading: trainAddressLoading, error: trainAddressError },
  ] = useTrainAddressMutation();
  const [
    trainDomainMutation,
    { loading: trainDomainLoading, error: trainDomainError },
  ] = useTrainDomainMutation();

  const [
    searchQuery,
    {
      data: searchResults,
      loading: searchLoading,
      error: searchError,
      fetchMore,
      refetch: searchRefetch,
    },
  ] = useSearchTrainingsLazyQuery();

  const trainAddress = useCallback(
    (
      address: string,
      rule: RuleEnum,
      id?: string,
      onCompleted?: (data: any) => void,
    ) => {
      const [username, domain] = address.split('@');
      return trainAddressMutation({
        variables: { address, rule },
        optimisticResponse: id
          ? {
              trainAddress: {
                rule,
                __typename: 'Training',
                id: id as string,
                username,
                domain,
                origin: TrainingOriginEnum.UserApp,
                createdAt: new Date(),
                inheritedRule: null,
              },
            }
          : undefined,
        onCompleted,
      });
    },
    [],
  );

  const trainDomain = useCallback(
    (
      domain: string,
      rule: RuleEnum,
      id?: string,
      onCompleted?: (data: any) => void,
    ) => {
      return trainDomainMutation({
        variables: { domain, rule },
        optimisticResponse: id
          ? {
              trainDomain: {
                rule,
                __typename: 'Training',
                id,
                origin: TrainingOriginEnum.UserApp,
                domain,
                username: null,
                createdAt: new Date(),
                inheritedRule: null,
              },
            }
          : undefined,
        onCompleted,
      });
    },
    [],
  );

  const nextPage = () => {
    if (!searchResults?.trainingSearch.pageInfo.hasNextPage) return;
    const after = searchResults.trainingSearch.pageInfo.endCursor;
    return fetchMore({ variables: { input: { pagination: { after } } } });
  };

  const search = (input: TrainingsSearchInput = {}) => {
    return searchQuery({ variables: { input }, fetchPolicy: 'network-only' });
  };

  return {
    trainDomainLoading,
    trainAddressLoading,
    trainDomainError,
    trainAddressError,
    trainAddress,
    trainDomain,
    searchResults: searchResults?.trainingSearch,
    search,
    nextPage,
    searchLoading,
    searchError,
    searchRefetch,
  };
};
