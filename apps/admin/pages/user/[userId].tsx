import React, { memo } from 'react';

import { UserView } from '@components/user/user.view';

import { useRouter } from 'next/router';

const UserId = memo(() => {
  const router = useRouter();
  const { userId } = router.query;

  const viewProps = {
    userId: userId as string,
    onBack: () => {
      router.push('/');
    },
  };
  return <UserView {...viewProps} />;
});
export default UserId;
