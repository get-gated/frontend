import { useDonationRequestContext } from '@components/donation-request/donation-request.context';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { formatCurrencyUtil } from '@gated/utils';
import { OnChargeProps, useCreditCard } from '@gated/ui/components';

import React, { useState } from 'react';

import { IoLockClosed as SecureIcon } from 'react-icons/io5';
import Image from 'next/image';
import poweredByStripeImage from '@gated/assets/images/powered-by-stripe.svg';

import CreditCardProvider from '@gated/ui/components/credit-card/credit-card.provider';
import { useDonateMutation } from '@gated/graphql-types';
import { Layout } from '@components/layout';
import { useUserPageContext } from '@components/user-page/user-page.context';
import { AmountCard } from '@components/amount-card';

export default function DonationRequestPageView() {
  const { amountInCents, memo, donationRequestId, nonprofitName } =
    useDonationRequestContext();
  const { user } = useUserPageContext();
  const [message, setMessage] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>();
  const [requestInteractionId, setRequestInteractionId] = useState<string>();
  const [thankYouMessage, setThankYouMessage] = useState<string>();

  const [donate] = useDonateMutation();

  const isValid = message.length > 0;

  const heroContent = (
    <>
      <Avatar
        src={user.avatar}
        name={user.fullName}
        size="xl"
        borderWidth={3}
        borderColor="white"
      />
      <Heading size="lg" maxW="50%" textAlign="center">
        {memo}
      </Heading>
    </>
  );
  return (
    <Layout heroContent={heroContent}>
      <CreditCardProvider
        onCharge={async (charge: OnChargeProps) => {
          const { data } = await donate({
            variables: {
              input: {
                note: message,
                chargeToken: charge.chargeToken,
                chargeProvider: charge.paymentProvider,
                amountInCents: charge.amountCents,
                donationRequestId,
              },
            },
          });

          setRequestInteractionId(data.donate.donatedInteraction.id);
          setThankYouMessage(data.donate.thankYouMessage);
        }}
        onSuccess={(donationAmountInCents: number) => {
          setDonationAmount(donationAmountInCents);
          setIsComplete(true);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        {isComplete ? (
          <>
            <Text w="full">{thankYouMessage || 'Thanks!'}</Text>
            <Divider />
            <Text>
              Your donation of {formatCurrencyUtil(donationAmount)} has been
              received.
            </Text>
            <VStack alignItems="left" w="full">
              <Text textStyle="label">Transaction ID:</Text>
              <Text>{requestInteractionId}</Text>
              <Text textStyle="label">Charge Amount:</Text>
              <Text>{formatCurrencyUtil(amountInCents)}</Text>
              <Text textStyle="label">Message:</Text>
              <Text>{message}</Text>
            </VStack>
          </>
        ) : (
          <>
            <AmountCard
              amountInCents={amountInCents}
              nonprofitName={nonprofitName}
            />
            <Box w="full"></Box>
            <Box w="full">
              <Text textStyle="label">Leave a Message For Me</Text>

              <Textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder={`Hi ${user.firstName}...`}
              />
            </Box>

            <Payment isValid={isValid} />
          </>
        )}
      </CreditCardProvider>
    </Layout>
  );
}

const Payment = ({ isValid }) => {
  const { nonprofitName, amountInCents } = useDonationRequestContext();

  const { loading, isFormComplete, error, onSubmit, CreditCard } =
    useCreditCard();

  return (
    <VStack spacing={4}>
      <Box w="full">
        <Text textStyle="label">Your Payment Details</Text>

        <CreditCard amountCents={amountInCents} />
      </Box>
      {error && <Text color="error">{error}</Text>}

      <Button
        onClick={onSubmit}
        w="100%"
        variant="primary"
        disabled={!isFormComplete || !isValid}
        isLoading={loading}
      >
        Make Donation
      </Button>
      <Flex w="full" align="center">
        <Icon as={SecureIcon} mr={{ base: '1', lg: '3' }} />
        <Text fontSize="xs">
          Guaranteed <strong>safe & secure</strong> checkout
        </Text>
        <Spacer />
        <Image
          src={poweredByStripeImage.src}
          alt="Powered by Stripe"
          height="30"
          width="70"
        />
      </Flex>
      <Divider />
      <Text textStyle="caption" textAlign="center">
        All donations (less Gated fees) are processed via Our Change Foundation
        and granted 100% to {nonprofitName}.
      </Text>
    </VStack>
  );
};
