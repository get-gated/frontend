import { gql } from '@apollo/client';
import {
  Pagination,
  useQueryDonationsLazyQuery,
  useQueryDonationStatsQuery,
} from '@gated/graphql-types';

gql`
  query QueryDonations($pagination: Pagination) {
    challengeInteractions(
      input: { interaction: Donated, pagination: $pagination }
    ) {
      pageInfo {
        hasNextPage
        endCursor
        totalResults
      }
      edges {
        cursor
        node {
          id
          performedAt
          paymentAmount
          challenge {
            id
            to
          }
        }
      }
    }
  }
`;

gql`
  query QueryDonationStats {
    challengeStats {
      donationTotal
      donationCount
    }
  }
`;

export const useDonations = () => {
  const [
    searchQuery,
    { data, loading: searchLoading, error: searchError, fetchMore },
  ] = useQueryDonationsLazyQuery();

  const { data: stats } = useQueryDonationStatsQuery({
    fetchPolicy: 'cache-first',
  });

  const nextPage = () => {
    if (!data?.challengeInteractions.pageInfo.hasNextPage) return;
    const after = data.challengeInteractions.pageInfo.endCursor;
    return fetchMore({ variables: { input: { pagination: { after } } } });
  };

  const search = (pagination: Pagination) => {
    return searchQuery({ variables: { pagination } });
  };

  return {
    search,
    searchResults: data?.challengeInteractions,
    searchLoading,
    searchError,
    nextPage,
    donationTotal: stats?.challengeStats.donationTotal,
    donationCount: stats?.challengeStats.donationCount,
  };
};
