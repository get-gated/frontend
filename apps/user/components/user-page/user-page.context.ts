import { createContext, useContext } from 'react';
import { FetchUserResponse } from '../../utils/fetch-user';
import { FetchDonationProfileResponse } from '../../utils/fetch-donation-profile';

export interface UserPageContextValue {
  user: FetchUserResponse;
  donationProfile: FetchDonationProfileResponse;
}

export const UserPageContext = createContext<UserPageContextValue>({
  user: {
    firstName: '',
    lastName: '',
    fullName: '',
    avatar: '',
    userId: '',
    referralCode: '',
  },
  donationProfile: {
    featured: [],
    nonprofit: {
      name: '',
      nonprofitId: '',
      description: '',
    },
    nonprofitReason: '',
  },
});

export const useUserPageContext = () => {
  return useContext(UserPageContext);
};
