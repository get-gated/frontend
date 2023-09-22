import { Box, RadioGroup, SlideFade, VStack } from '@chakra-ui/react';
import { Nonprofit, useNonprofitsLazyQuery } from '@gated/graphql-types';
import React, { useEffect } from 'react';
import { ListItem } from '@components/NonprofitModal/step-choose/list-item';
import { gql } from '@apollo/client';
import { useNonprofit } from '@components/NonprofitModal/context';

gql`
  query Nonprofits($input: NonprofitsInput!) {
    nonprofits(input: $input) {
      nonprofits {
        id
        description
        name
        isFeatured
        art
      }
    }
  }
`;
export const List = () => {
  const [getNonprofits, { data, loading }] = useNonprofitsLazyQuery({
    fetchPolicy: 'cache-first',
  });
  const { categoryId, selected, currentId, setSelected } = useNonprofit();

  useEffect(() => {
    getNonprofits({
      variables: { input: { categoryId: categoryId } },
    });
  }, [categoryId]);

  return (
    <RadioGroup value={selected?.id} as={VStack} spacing={0} alignItems="start">
      {loading && (
        <>
          <ListItem
            id="x"
            loading
            name="Loading medium length..."
            description=""
          />
          <ListItem id="x" loading name="Loading short..." description="" />
          <ListItem
            id="x"
            loading
            name="Loading super long value here..."
            description=""
          />
        </>
      )}
      {data &&
        [...data.nonprofits.nonprofits]
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((i) => {
            const isSelected = Boolean(selected.id === i.id);
            const isCurrent = Boolean(currentId === i.id);
            const props = { isSelected, isCurrent, ...i };
            return (
              <Box w="100%" key={i.id} as={SlideFade} in unmountOnExit>
                <ListItem
                  {...props}
                  onClick={() => setSelected(i as Nonprofit)}
                />
              </Box>
            );
          })}
    </RadioGroup>
  );
};
