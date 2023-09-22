import { useEffect, useState } from 'react';
import { MdBlock as NoResultsIcon } from 'react-icons/md';
import { Button, Stack, StackDivider } from '@chakra-ui/react';
import { TypeAheadResultItem } from './type-ahead-result-item.component';

interface TypeAheadResultsProps {
  results: React.ReactNode[];
  isLoading: boolean;
  onAdd?: (any) => void;
}

export const TypeAheadResults = ({
  results,
  onAdd,
  isLoading,
}: TypeAheadResultsProps) => {
  const [content, setContent] = useState<React.ReactNode | React.ReactNode[]>();

  useEffect(() => {
    if (isLoading) return; //allow previous results to persist beteween loads
    if (results?.length === 0) {
      const newContent = [
        <TypeAheadResultItem
          key="no-results"
          label="No Results Found."
          icon={<NoResultsIcon />}
        />,
      ];
      onAdd &&
        newContent.push(
          <TypeAheadResultItem
            key="add-rule"
            label={<Button variant="link">Add new rule</Button>}
            icon={null}
            onClick={onAdd}
          />,
        );
      setContent(newContent);
    } else {
      setContent(results);
    }
  }, [results]);

  return (
    <Stack
      zIndex={20}
      transition="height 135ms ease-in-out"
      divider={<StackDivider />}
      position="absolute"
      _light={{ bgColor: 'white' }}
      _dark={{ bgColor: 'gray.800' }}
      borderColor="gray.30"
      borderWidth="1px"
      borderTop="none"
      w="full"
      p={1}
      borderBottomRadius="md"
    >
      {content}
    </Stack>
  );
};
