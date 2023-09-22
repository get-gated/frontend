export interface FetchUserResponse {
  userId: string;
  handle?: string;
  referralCode: string;
  avatar: string;
  lastName: string;
  firstName: string;
  fullName: string;
}

export const fetchUser = async (handle: string): Promise<FetchUserResponse> => {
  return fetch(`${process.env.REACT_APP_API_ORIGIN}/api/user/${handle}`).then(
    (r) => {
      if (r.status >= 300) {
        throw new Error('Error getting user info');
      }
      return r.json();
    },
  );
};
