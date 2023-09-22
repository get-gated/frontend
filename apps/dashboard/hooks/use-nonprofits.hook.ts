import { gql } from '@apollo/client';

import { sortBy } from '@gated/utils';
import {
  useQueryNonprofitCategoriesQuery,
  useQueryNonprofitDefaultQuery,
  useQueryNonprofitLazyQuery,
  useQueryNonprofitsQuery,
} from '@gated/graphql-types';

const FRAGMENT_NONPROFIT_FIELDS = gql`
  fragment NonprofitFields on Nonprofit {
    id
    category {
      id
      name
    }
    description
    name
    logo
    isFeatured
  }
`;

const FRAGMENT_NONPROFIT_CATEGORY_FIELDS = gql`
  fragment NonprofitCategoryFields on NonprofitCategory {
    id
    name
  }
`;

export const QUERY_NONPROFIT_CATEGORIES = gql`
  query QueryNonprofitCategories {
    nonprofitCategories {
      nonprofitCategories {
        id
        name
      }
    }
  }
`;

gql`
  ${FRAGMENT_NONPROFIT_FIELDS}
  ${FRAGMENT_NONPROFIT_CATEGORY_FIELDS}
  query QueryNonprofits {
    nonprofits(input: { isDisplay: true }) {
      nonprofits {
        ...NonprofitFields
        category {
          ...NonprofitCategoryFields
        }
      }
    }
  }
`;

gql`
  ${FRAGMENT_NONPROFIT_FIELDS}
  query QueryNonprofit($nonprofitId: ID!) {
    nonprofit(id: $nonprofitId) {
      ...NonprofitFields
    }
  }
`;

gql`
  ${FRAGMENT_NONPROFIT_FIELDS}
  query QueryNonprofitDefault {
    nonprofitDefault {
      ...NonprofitFields
    }
  }
`;

export const useNonprofits = () => {
  const {
    data: nonprofitCategories,
    loading: nonprofitCategoriesLoading,
    error: nonprofitCategoriesError,
  } = useQueryNonprofitCategoriesQuery();
  const {
    data: nonprofits,
    loading: nonprofitsLoading,
    error: nonprofitsError,
  } = useQueryNonprofitsQuery();
  const [
    getQuery,
    { data: nonprofit, error: nonprofitError, loading: nonprofitLoading },
  ] = useQueryNonprofitLazyQuery({
    fetchPolicy: 'cache-first',
  });

  const {
    data: defaultNonprofit,
    loading: defaultNonprofitLoading,
    error: defaultNonprofitError,
  } = useQueryNonprofitDefaultQuery();

  const get = (nonprofitId: string) => {
    return getQuery({ variables: { nonprofitId } });
  };

  return {
    get,
    nonprofitCategories: nonprofitCategories?.nonprofitCategories
      .nonprofitCategories
      ? sortBy(
          nonprofitCategories.nonprofitCategories.nonprofitCategories,
          'name',
        )
      : [],
    nonprofitCategoriesLoading,
    nonprofitCategoriesError,
    nonprofits: nonprofits?.nonprofits?.nonprofits
      ? sortBy(nonprofits.nonprofits.nonprofits, 'name')
      : [],
    nonprofitsLoading,
    nonprofitsError,
    nonprofit,
    nonprofitError,
    nonprofitLoading,
    defaultNonprofit: defaultNonprofit?.nonprofitDefault,
    defaultNonprofitLoading,
    defaultNonprofitError,
  };
};
