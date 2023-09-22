import { Meta } from '@gated/ui/components';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { UserPageContext } from '@components/user-page/user-page.context';
import {
  fetchRequest,
  FetchRequestResponse,
} from '../../../utils/fetch-request';
import { fetchUser, FetchUserResponse } from '../../../utils/fetch-user';
import {
  fetchDonationProfile,
  FetchDonationProfileResponse,
} from '../../../utils/fetch-donation-profile';
import DonationRequestPageView from '@components/donation-request/page/donation-request-page.view';
import { DonationRequestContext } from '@components/donation-request/donation-request.context';

interface DonationRequestPageProps {
  data: {
    request: FetchRequestResponse;
    user: FetchUserResponse;
    donationProfile: FetchDonationProfileResponse;
    ogImage: string;
  };
}

export default function DonationRequestPage({
  data,
}: DonationRequestPageProps) {
  return (
    <UserPageContext.Provider
      value={{ user: data.user, donationProfile: data.donationProfile }}
    >
      <DonationRequestContext.Provider value={data.request}>
        <Meta
          title="Donation Request | Gated"
          description=""
          openGraph={{ image: data.ogImage }}
        />

        <DonationRequestPageView />
      </DonationRequestContext.Provider>
    </UserPageContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps<
  DonationRequestPageProps
> = async (context: GetServerSidePropsContext) => {
  const id = context.params.id as string;
  const handle = context.params.handle as string;

  const [request, user] = await Promise.all([
    fetchRequest(id),
    fetchUser(handle),
  ]);

  const donationProfile = await fetchDonationProfile(user.userId);

  if (request.type !== 'LONG_LIVING') {
    return { notFound: true };
  }

  //todo: make og image for this type of request
  const ogImage = '';

  return {
    props: {
      data: { user, request, donationProfile, ogImage },
    },
  };
};
