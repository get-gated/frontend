import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Show,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import React from 'react';

interface PaginationProps {
  totalResults?: number;
  hasNextPage?: boolean;
  endCursor?: string | null;
  hasPreviousPage?: boolean;
  startCursor?: string | null;
  onNext: (cursor: string) => void;
  onPrev: (cursor: string) => void;
  pageSize?: number;
  isLoading: boolean;
}

export const Pagination = ({
  onPrev,
  onNext,
  endCursor,
  startCursor,
  totalResults,
  hasNextPage,
  hasPreviousPage,
  pageSize,
  isLoading,
}: PaginationProps) => {
  return (
    <Box pb="5" pt="5">
      <HStack spacing="3" justify="space-between">
        <Show above="md">
          <Skeleton isLoaded={!isLoading}>
            <Text textStyle="footnote">
              Showing {pageSize} of {totalResults} results
            </Text>
          </Skeleton>
        </Show>
        <ButtonGroup
          spacing="3"
          justifyContent="space-between"
          width={{ base: 'full', md: 'auto' }}
          variant="secondary"
        >
          <Skeleton isLoaded={!isLoading}>
            <Button
              disabled={!hasPreviousPage}
              onClick={() => startCursor && onPrev(startCursor)}
            >
              Previous
            </Button>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Button
              disabled={!hasNextPage}
              onClick={() => endCursor && onNext(endCursor)}
            >
              Next
            </Button>
          </Skeleton>
        </ButtonGroup>
      </HStack>
    </Box>
  );
};
