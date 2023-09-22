import { Box, Icon, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { MdSearch as SearchIcon } from 'react-icons/md';

import { AllowListTile } from '../components/tile.component';
import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { formatSenderFromPartsUtil } from '@gated/utils';
import { TypeAheadResults } from '../components/type-ahead-results.component';
import { TypeAheadResultItem } from '../components/type-ahead-result-item.component';
import { useDashboard } from '@hooks/use-dashboard.hook';
import { useTrainings } from '@hooks/use-trainings.hook';
import { SenderAvatar } from '@gated/ui/components';

interface ReviewRulesTileViewProps {
  onViewDetails: (value: string) => void;
}
export const ReviewRulesTileView = ({
  onViewDetails,
}: ReviewRulesTileViewProps) => {
  const { search, searchResults, searchLoading } = useTrainings();
  const [query, setQuery] = useState('');
  const { onAddRule } = useDashboard();

  useEffect(() => {
    onSearch();
  }, [query]);

  const onSearch = debounce(
    () => {
      search({ query, pagination: { first: 10 } });
    },
    300,
    { trailing: true },
  );

  const onChangeQuery = (value) => {
    setQuery(value);
  };

  const results = searchResults?.edges.map(({ node }) => {
    const label = formatSenderFromPartsUtil(node.username, node.domain);
    const icon = <SenderAvatar sender={label} />;
    return (
      <TypeAheadResultItem
        key={node.id}
        label={label}
        icon={icon}
        onClick={() => onViewDetails(label)}
      />
    );
  });

  const showResults = query.length > 0;

  return (
    <AllowListTile
      heading="Search for an Address"
      description="Quickly find any email address or domain, to check or update its status."
    >
      <Box position="relative">
        <InputGroup>
          <InputLeftAddon borderBottomLeftRadius={showResults ? 'none' : 'md'}>
            <Icon as={SearchIcon} />
          </InputLeftAddon>
          <Input
            borderBottomRightRadius={showResults ? 'none' : 'md'}
            onChange={(e) => onChangeQuery(e.target.value)}
            placeholder="Domain or Address"
            _focus={{
              boxShadow: 'none',
            }}
          />
        </InputGroup>
        {showResults && (
          <TypeAheadResults
            isLoading={searchLoading}
            results={results}
            onAdd={onAddRule}
          />
        )}
      </Box>
    </AllowListTile>
  );
};
