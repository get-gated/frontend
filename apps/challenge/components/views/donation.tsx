import { useAtom, useAtomValue } from 'jotai';
import { dataAtom, tokenAtom } from '../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { AmountPicker } from '@gated/ui/components/amount-picker';
import { PersonalizedNote } from '@components/personalized-note';
import { IoLockClosed as SecureIcon } from 'react-icons/io5';
import Image from 'next/image';
import poweredByStripeImage from '@gated/assets/images/powered-by-stripe.svg';

import { OnChargeProps, useCreditCard } from '@gated/ui/components/credit-card';
import CreditCardProvider from '@gated/ui/components/credit-card/credit-card.provider';
import {
  PaymentProviderEnum,
  useSenderDonateMutation,
} from '@gated/graphql-types';
import { gql } from '@apollo/client';
import { useAnalytics } from '@gated/app';
import { useChallenge } from '@components/views/challenge.view';

gql`
  mutation SenderDonate($input: ChallengeSenderDonateInput!) {
    challengeSenderDonate(input: $input)
  }
`;

export function Donation() {
  const [senderDonate] = useSenderDonateMutation();
  const [note, setNote] = useState('');
  const { track } = useAnalytics();
  const [, setData] = useAtom(dataAtom);
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;
  const { scrollToTop } = useChallenge();

  return (
    <CreditCardProvider
      onCharge={async (charge: OnChargeProps) => {
        console.log(charge);
        await senderDonate({
          variables: {
            input: {
              chargeToken: charge.chargeToken,
              amountInCents: charge.amountCents,
              paymentToken: charge.paymentToken,
              chargeProvider: charge.paymentProvider,
              personalizedNote: note,
            },
          },
        });
      }}
      onSuccess={(donationAmountInCents: number) => {
        track(`challenge_donate_completed`, {
          donationAmountInCents,
          minimumDonationInCents: data.minimumDonationInCents,
        });
        setData({ ...data, hasDonation: true, donationAmountInCents });
        scrollToTop();
      }}
    >
      <DonationView note={note} setNote={setNote} />
    </CreditCardProvider>
  );
}

function DonationView({ note, setNote }) {
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;
  const token = useAtomValue(tokenAtom);

  const [amount, setAmount] = useState<number>(data.minimumDonationInCents);

  const { loading, isFormComplete, onSubmit, error, CreditCard } =
    useCreditCard();

  return (
    <>
      <Box textAlign={{ base: 'center', lg: 'left' }} w="full">
        <Heading size="md">Make a Donation</Heading>

        <Text fontSize="lg">
          to{' '}
          <Text as="span" fontWeight="semibold" color="emphasized">
            {data.nonprofitName}
          </Text>{' '}
          to reach {data.firstName}’s inbox.
        </Text>
      </Box>

      <AmountPicker
        onChange={setAmount}
        minimumAmountInCents={data.minimumDonationInCents}
      />

      <CreditCard amountCents={amount} paymentToken={token as string} />
      {error && <Text color="error">{error}</Text>}
      <Text color="subtle">
        <strong>Tip:</strong> Larger donations get more attention and a higher
        likelihood of a reply.
      </Text>

      <PersonalizedNote
        onChange={(e) => setNote(e.target.value)}
        value={note}
        placeholder={`Hi ${data.firstName}. I love ${data.nonprofitName} too! Looking forward to connecting...`}
      />

      <Tooltip
        label={
          !isFormComplete
            ? 'Please fill out payment info above first.'
            : 'Please add a note above first.'
        }
      >
        <Button
          onClick={onSubmit}
          w="100%"
          variant="primary"
          disabled={!isFormComplete || note.length === 0}
          isLoading={loading}
        >
          Donate & Deliver My Message
        </Button>
      </Tooltip>
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
        and granted 100% to {data.nonprofitName}.
      </Text>
    </>
  );
}
