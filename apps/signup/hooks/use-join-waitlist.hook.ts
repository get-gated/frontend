import { useApi } from '@gated/app/hooks/use-api.hook';

interface IUseJoinWaitlist {
  joinWaitlist: () => Promise<any>;
  error: any;
  loading: boolean;
}

export const useJoinWaitlist = (emailAddress: string): IUseJoinWaitlist => {
  const [joinWaitlist, { loading, error }] = useApi(`/api/user/waitlist`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    body: JSON.stringify({
      emailAddress,
    }),
  });

  return { joinWaitlist, error, loading };
};
