import React, { useEffect } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { RulingBadge } from '../../components/ruling.badge';
import { RelativeTime, Spinner, Error } from '@gated/ui/components';
import { useTrainings } from '@hooks/use-trainings.hook';

export const TrainedView = () => {
  const { search, searchResults, searchLoading, searchError } = useTrainings();

  useEffect(() => {
    search({ pagination: { last: 100 }, query: '' });
  }, []);

  if (searchLoading) {
    return <Spinner />;
  }

  if (searchError) {
    return <Error message={searchError.message} />;
  }

  const data = searchResults?.edges || [];

  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')({})}>
        <Tr>
          <Th whiteSpace="nowrap" scope="col">
            From
          </Th>
          <Th whiteSpace="nowrap" scope="col" textAlign="right">
            Rule
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map(({ node }) => {
          return (
            <Tr key={node.id}>
              <Td whiteSpace="nowrap">
                {node.username || '*'}@{node.domain} <br />
                <RelativeTime timestamp={node.createdAt} />
              </Td>

              <Td textAlign="right">
                <RulingBadge tooltip={node.origin} rule={node.rule} />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
