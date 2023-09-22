import React, { useEffect } from 'react';

import { Badge, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { RelativeTime, Spinner, Error } from '@gated/ui/components';
import { formatCurrencyUtil } from '@gated/utils';
import {
  ChallengeInteractionEnum,
  useChallengeInteractionsLazyQuery,
} from '@gated/graphql-types';
import { gql } from '@apollo/client';

gql`
  query ChallengeInteractions($input: ChallengeInteractionsInput!) {
    challengeInteractions(input: $input) {
      pageInfo {
        totalResults
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          interaction
          paymentAmount
          performedAt
          challenge {
            to
            createdAt
          }
        }
      }
    }
  }
`;

export const InteractionsView = () => {
  const [search, { data, loading, error }] =
    useChallengeInteractionsLazyQuery();

  useEffect(() => {
    search({ variables: { input: { pagination: { last: 100 } } } });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  const results = data?.challengeInteractions.edges || [];
  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')({})}>
        <Tr>
          <Th whiteSpace="nowrap" scope="col">
            Interaction
          </Th>
          <Th whiteSpace="nowrap" scope="col">
            Sender
          </Th>
          <Th whiteSpace="nowrap" scope="col" textAlign="right">
            Type
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {results.map(({ node }) => {
          return (
            <Tr key={node.id}>
              <Td>
                {node.id} <br />
                Interacted <RelativeTime timestamp={node.performedAt} />
              </Td>
              <Td whiteSpace="nowrap">
                {node.challenge.to} <br />
                Challenged <RelativeTime timestamp={node.challenge.createdAt} />
              </Td>

              <Td textAlign="right">
                {node.interaction === ChallengeInteractionEnum.Donated && (
                  <Badge colorScheme="pink">
                    {formatCurrencyUtil(node.paymentAmount as number)}
                  </Badge>
                )}
                <Badge>{node.interaction}</Badge>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
