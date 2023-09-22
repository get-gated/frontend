import { useMemo } from 'react';
import { useRouter } from 'next/router';

export const useUser = () => {
  const { query } = useRouter();
  const userId = query.userId as string;
  const context = useMemo(
    () => ({
      headers: { 'x-gated-request-for-user': userId },
    }),
    [userId],
  );
  return {
    context,
    userId,
  };
};
