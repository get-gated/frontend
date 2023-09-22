import { createContext, useContext } from 'react';
import { FetchRequestResponse } from '../../utils/fetch-request';

export const DonationRequestContext = createContext<FetchRequestResponse>({
  userId: '',
  amountInCents: 0,
  isCompleted: false,
  memo: '',
  type: 'LONG_LIVING',
  thankYouMessage: '',
  donationRequestId: '',
  createdAt: new Date(),
  allowExemptionRequest: false,
  completedAt: new Date(),
  nonprofitName: '',
});

export const useDonationRequestContext = () => {
  return useContext(DonationRequestContext);
};
