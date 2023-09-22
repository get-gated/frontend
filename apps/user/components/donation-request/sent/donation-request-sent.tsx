import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Center,
  Text,
  VStack,
} from '@chakra-ui/react';
import { formatCurrencyUtil } from '@gated/utils';
import { useCreditCard } from '@gated/ui/components';
import { useDonationRequestContext } from '@components/donation-request/donation-request.context';
import { useUserPageContext } from '@components/user-page/user-page.context';
import { AmountCard } from '@components/amount-card';

interface DonationRequestPageViewProps {
  showThankYou: boolean;
}
export default function DonationRequestSentView({
  showThankYou,
}: DonationRequestPageViewProps) {
  const { amountInCents, nonprofitName, memo, isCompleted, completedAt } =
    useDonationRequestContext();
  const { user } = useUserPageContext();
  const { CreditCard, isFormComplete, onSubmit, loading, error } =
    useCreditCard();
  return (
    <VStack
      maxW={400}
      bgColor="bg-surface"
      px={8}
      pb={4}
      mx="auto"
      mt={100}
      borderRadius="lg"
      shadow="lg"
      spacing={4}
      borderWidth={1}
      borderColor="gray.100"
    >
      <Avatar src={user.avatar} name={user.fullName} size="lg" mt={-6} />
      <Text fontSize="lg" textAlign="center">
        {user.firstName} has requested a donation from you.
      </Text>
      <AmountCard amountInCents={amountInCents} nonprofitName={nonprofitName} />

      <Box w="full" color="muted" borderRadius="sm">
        <strong>Memo:</strong> {memo}
      </Box>

      {error && (
        <Alert status="error" as={VStack} spacing={0}>
          <AlertIcon mb={2} />
          <AlertTitle>Error Processing Donation</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!showThankYou && !isCompleted && (
        <>
          <CreditCard amountCents={amountInCents} />
          <Button
            variant="primary"
            disabled={!isFormComplete || loading}
            onClick={onSubmit}
            isLoading={loading}
            w="full"
          >
            Send Donation
          </Button>
        </>
      )}
      {showThankYou && (
        <Alert status="success" as={VStack} spacing={0}>
          <AlertIcon mb={2} />
          <AlertTitle>Thanks!</AlertTitle>
          <AlertDescription>
            Your donation was successfully sent.
          </AlertDescription>
        </Alert>
      )}

      {isCompleted && (
        <>
          <Text textAlign="center">
            A donation for this request was successfully sent on{' '}
            {new Date(completedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            .
          </Text>
        </>
      )}
    </VStack>
  );
}
