export interface FetchDonationProfileResponse {
  featured: {
    donationRequestId: string;
    cta: string;
  }[];
  nonprofit: {
    name: string;
    description: string;
    nonprofitId: string;
  };
  nonprofitReason: string;
}

export const fetchDonationProfile = async (
  userId: string,
): Promise<FetchDonationProfileResponse> => {
  return fetch(
    `${process.env.REACT_APP_API_ORIGIN}/api/donation-requests/user/${userId}`,
  ).then((r) => {
    if (r.status >= 300) {
      throw new Error('Error getting user request profile');
    }
    return r.json();
  });
};
