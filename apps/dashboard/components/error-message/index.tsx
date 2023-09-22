import React, { ReactNode } from 'react';
import {
  Box,
  BoxProps,
  Button,
  AlertIcon,
  AlertTitle,
  Alert,
  AlertDescription,
  Icon,
} from '@chakra-ui/react';

import { MdRefresh as RetryIcon } from 'react-icons/md';

interface ErrorMessageProps extends BoxProps {
  message: string | ReactNode;
  onRetry?: () => any;
}
export const ErrorMessage = ({
  message,
  onRetry,
  ...rest
}: ErrorMessageProps) => (
  <Alert
    status="error"
    variant="subtle"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    height="200px"
    {...rest}
  >
    <AlertIcon boxSize="40px" mr={0} />
    <AlertTitle mt={4} mb={1} fontSize="lg">
      Aw Shucks...
    </AlertTitle>
    <AlertDescription maxWidth="sm">
      <>{message}</>
      {onRetry && (
        <Box mt={2}>
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            leftIcon={<Icon as={RetryIcon} />}
          >
            Retry
          </Button>
        </Box>
      )}
    </AlertDescription>
  </Alert>
);
