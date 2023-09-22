import { gql } from '@apollo/client';
import {
  DonationTotalFromSenderQueryInput,
  useQueryDonationTotalFromSenderQuery,
} from '@gated/graphql-types';

gql`
  query QueryDonationTotalFromSender(
    $input: DonationTotalFromSenderQueryInput!
  ) {
    donationTotalFromSender(input: $input) {
      donationsCount
      totalAmountInCents
    }
  }
`;

export const useDonationTotalFromSender = (
  input: DonationTotalFromSenderQueryInput,
) => {
  const { data, loading, error } = useQueryDonationTotalFromSenderQuery({
    variables: { input },
  });

  return {
    result: data?.donationTotalFromSender,
    loading,
    error,
  };
};
