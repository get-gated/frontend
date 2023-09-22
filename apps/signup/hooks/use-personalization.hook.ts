import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { AuthStatus, useAuth } from '@gated/app';
import { UserPersonalizationUpdateInput } from '@gated/graphql-types';

const FRAGMENT_USER_PERSONALIZATION_FIELDS = gql`
  fragment Personalization on User {
    personalization {
      userBenefitSelection {
        userBenefit
        benefitLabel
        otherText
      }
    }
  }
`;

const MUTATION_UPDATE_PERSONALIZATION = gql`
  ${FRAGMENT_USER_PERSONALIZATION_FIELDS}
  mutation UpdatePersonalization($input: UserPersonalizationUpdateInput!) {
    userUpdatePersonalization(input: $input) {
      ...Personalization
    }
  }
`;

export const usePersonalization = () => {
  const { status } = useAuth();

  useEffect(() => {
    if (status !== AuthStatus.SignedIn) return;
  }, [status]);

  const [mutation, { loading: updateLoading, error: updateError }] =
    useMutation(MUTATION_UPDATE_PERSONALIZATION);

  const updatePersonalization = async (
    input: UserPersonalizationUpdateInput,
  ) => {
    await mutation({ variables: { input } });
  };

  return {
    updateError,
    updateLoading,
    updatePersonalization,
  };
};
