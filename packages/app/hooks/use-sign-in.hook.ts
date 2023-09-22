import { getAuth, signInWithCustomToken } from 'firebase/auth';
import nookies from 'nookies';
import { useState } from 'react';
import { useApp } from '../app/use-app.hook';

export const useSignIn = () => {
  const [error, setError] = useState<{ code: string; message: string } | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const { config } = useApp();

  const customToken = nookies.get()['auth_custom_token'];

  const canSignIn = Boolean(customToken);

  const auth = getAuth();
  auth.tenantId = config?.auth.firebase.tenant || '';

  const signIn = () => {
    if (!canSignIn) return;
    setError(null);
    setLoading(true);
    signInWithCustomToken(auth, customToken)
      .then(() => setComplete(true))
      .catch((error) => {
        setError({ code: error.code, message: error.message });
      })
      .finally(() => setLoading(false));
  };

  return { signIn, error, loading, complete, canSignIn };
};
