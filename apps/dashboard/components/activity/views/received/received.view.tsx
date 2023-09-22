import React, { useEffect } from 'react';
import { Badge, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Spinner, Error, RelativeTime } from '@gated/ui/components';
import { formatCurrencyUtil } from '@gated/utils';
import { RulingBadge } from '@components/activity/components/ruling.badge';
import { useDecisions } from '@hooks/use-decisions.hook';

export const ReceivedView = () => {
  const { search, searchError, searchLoading, searchResults } = useDecisions();

  useEffect(() => {
    search({ pagination: { last: 100 } });
  }, []);

  if (searchError) {
    return <Error message={searchError.message} />;
  }

  if (searchLoading) {
    return <Spinner />;
  }

  const data = searchResults?.edges || [];

  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')({})}>
        <Tr>
          <Th whiteSpace="nowrap" scope="col" colSpan={2}>
            From
          </Th>
          <Th whiteSpace="nowrap" scope="col" textAlign="right">
            Decision
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map(({ node }) => {
          return (
            <Tr key={node.id}>
              <Td whiteSpace="nowrap">
                {node.emailAddress} <br />
                <RelativeTime timestamp={node.decidedAt} />
              </Td>
              <Td>
                {node.challenge?.hasDonation && (
                  <Badge colorScheme="pink">
                    {formatCurrencyUtil(
                      node.challenge.interactions.edges[0].node
                        .paymentAmount as number,
                    )}
                  </Badge>
                )}
                {node.challenge?.hasExpected && (
                  <Badge colorScheme="primary">Expected</Badge>
                )}
              </Td>

              <Td textAlign="right">
                <RulingBadge tooltip={node.verdict} rule={node.ruling} />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
