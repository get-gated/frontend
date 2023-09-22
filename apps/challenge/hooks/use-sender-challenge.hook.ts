import { useApi } from '@gated/app/hooks';
import { useEffect } from 'react';

export interface IUseSenderChallengeResponse {
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  referralCode: string;
  minimumDonationInCents: number;
  isActive: boolean;
  hasDonation: boolean;
  hasExpected: boolean;
  nonprofitName: string;
  senderEmail: string;
  donationAmountInCents: number;
  nonprofitArt: string;
  nonprofitReason?: string;
}

interface IUseSenderChallenge {
  error: any;
  loading: boolean;
  data: IUseSenderChallengeResponse;
}

export const useSenderChallenge = (token: string): IUseSenderChallenge => {
  const init = {
    method: 'post',
    body: JSON.stringify({
      token,
    }),
    headers: { 'Content-Type': 'application/json' },
  };

  const [exec, { data, error }] = useApi(`/api/sender-challenge`, init);

  useEffect(() => {
    if (!token) return;
    exec();
  }, [token]);
  return {
    data,
    loading: !error && !data,
    error,
  };
};
