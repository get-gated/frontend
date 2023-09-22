import { useRouter } from 'next/router';

import { useState } from 'react';
import { Meta, OnChargeProps } from '@gated/ui/components';

import CreditCardProvider from '@gated/ui/components/credit-card/credit-card.provider';
import { Header } from '@components/header';
import { Container } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { formatCurrencyUtil } from '@gated/utils';
import { useDonateMutation } from '@gated/graphql-types';
import {
  fetchRequest,
  FetchRequestResponse,
} from '../../../utils/fetch-request';
import { fetchUser, FetchUserResponse } from '../../../utils/fetch-user';
import { DonationRequestContext } from '@components/donation-request/donation-request.context';
import DonationRequestSentView from '@components/donation-request/sent/donation-request-sent';
import { UserPageContext } from '@components/user-page/user-page.context';
import {
  fetchDonationProfile,
  FetchDonationProfileResponse,
} from '../../../utils/fetch-donation-profile';

interface DonationRequestPageProps {
  data: {
    ogImage: string;
    request: FetchRequestResponse;
    user: FetchUserResponse;
    donationProfile: FetchDonationProfileResponse;
  };
}

export default function DonationRequestPage({
  data,
}: DonationRequestPageProps) {
  const router = useRouter();
  const donationRequestId = router.query.id as string;

  const [showThankYou, setShowThankYou] = useState(false);

  const [charge] = useDonateMutation();

  const Layout = ({ children }) => (
    <Container w="full">
      <Header />
      <Meta
        title="Donation Requested"
        description={`${
          data.user.firstName
        } has requested a ${formatCurrencyUtil(
          data.request.amountInCents,
        )} to ${data.request.nonprofitName}.`}
        openGraph={{ image: data.ogImage }}
      />
      {children}
    </Container>
  );

  const handleCharge = async ({
    chargeToken,
    paymentProvider: chargeProvider,
  }: OnChargeProps) => {
    await charge({
      variables: {
        input: {
          donationRequestId,
          chargeProvider: chargeProvider,
          chargeToken,
          amountInCents: data.request.amountInCents,
        },
      },
    });
  };

  return (
    <Layout>
      <UserPageContext.Provider
        value={{ user: data.user, donationProfile: data.donationProfile }}
      >
        <DonationRequestContext.Provider value={data.request}>
          <CreditCardProvider
            onSuccess={() => setShowThankYou(true)}
            onCharge={handleCharge}
          >
            <DonationRequestSentView showThankYou={showThankYou} />
          </CreditCardProvider>
        </DonationRequestContext.Provider>
      </UserPageContext.Provider>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<
  DonationRequestPageProps
> = async (context: GetServerSidePropsContext) => {
  const { handle, id } = context.params;

  const [user, request] = await Promise.all([
    fetchUser(handle as string),
    fetchRequest(id as string),
  ]);

  const donationProfile = await fetchDonationProfile(user.userId);
  console.log(request);
  if (request.type !== 'SINGLE_USE') {
    return { notFound: true };
  }

  const url = new URL(
    `${process.env.REACT_APP_APP_ORIGIN}/u/api/request/og-image`,
  );
  url.searchParams.set('amount', request.amountInCents.toString());
  url.searchParams.set('nonprofit', request.nonprofitName);
  const ogImage = url.toString();

  return {
    props: {
      data: { user, request, ogImage, donationProfile },
    },
  };
};
