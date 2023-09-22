import React, { memo, useEffect } from 'react';
import { ChurnQuestionnaireSuccess } from '@components/churn-questionnaire';
import { useAuth } from '@gated/app';
import { App, useAppLink } from '@gated/app/hooks';

const Offboarded = memo(() => {
  const { logout } = useAuth();
  const appLink = useAppLink();

  useEffect(() => {
    logout();
  });

  const onClose = () => {
    window.location.href = appLink(App.Signup, '/');
  };

  return (
    <>
      <ChurnQuestionnaireSuccess isOpen={true} onClose={onClose} />
    </>
  );
});

export default Offboarded;
