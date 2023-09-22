import { Meta } from '@gated/ui/components';
import {
  UserPageContext,
  UserPageContextValue,
} from '@components/user-page/user-page.context';
import { UserPageView } from '@components/user-page/user-page.view';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { fetchDonationProfile } from '../../utils/fetch-donation-profile';
import { fetchUser } from '../../utils/fetch-user';

interface UserPageProps {
  data?: UserPageContextValue;
  error?: any;
  ogImage: string;
}

const UserPage = ({ data, error, ogImage }: UserPageProps) => {
  if (error || !data) {
    return <>{error.message}</>;
  }

  return (
    <UserPageContext.Provider value={data}>
      <Meta
        title={`${data.user.fullName} | Gated`}
        description={`${data.user.firstName}'s Gated Profile`}
        openGraph={{ image: ogImage }}
      />
      <UserPageView />
    </UserPageContext.Provider>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (
  context: GetServerSidePropsContext,
) => {
  const handle = context.params.handle as string;

  try {
    const user = await fetchUser(handle);
    const donationProfile = await fetchDonationProfile(user.userId);

    // const ogImage = new URL(
    //   `${process.env.REACT_APP_APP_ORIGIN}/u/api/request/og-image`,
    // );
    // ogImage.searchParams.set('amount', req.requestedAmount.toString());
    // ogImage.searchParams.set('nonprofit', req.nonprofitName);

    return {
      props: {
        data: {
          user,
          donationProfile,
        },
        ogImage: '',
      },
    };
  } catch (error) {
    return { props: { error, ogImage: '' } };
  }
};
