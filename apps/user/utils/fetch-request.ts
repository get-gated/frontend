export interface FetchRequestResponse {
  amountInCents: number;
  allowExemptionRequest: boolean;
  nonprofitName: string;
  isCompleted: boolean;
  completedAt: Date;
  thankYouMessage: string;
  memo: string;
  createdAt: Date;
  donationRequestId: string;
  type: 'SINGLE_USE' | 'LONG_LIVING';
  userId: string;
}
export const fetchRequest = async (
  id: string,
): Promise<FetchRequestResponse> => {
  return fetch(
    `${process.env.REACT_APP_API_ORIGIN}/api/donation-request/${id}`,
  ).then((r) => {
    if (r.status >= 300) {
      throw new Error('Error getting user request profile');
    }
    return r.json();
  });
};
