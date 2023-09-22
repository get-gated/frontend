import { useEffect, useState } from 'react';
import { getAuth, ParsedToken, User } from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { AuthStatus, Role } from './auth.enums';
import { useApp } from '../app/use-app.hook';

interface ParsedTokenWithRoles extends ParsedToken {
  roles: string[];
}

interface UseFirebaseProps {
  onSignIn?: (authToken: string) => Promise<void>;
  onSignOut?: () => Promise<void>;
}
export function useFirebase({ onSignIn, onSignOut }: UseFirebaseProps = {}) {
  const [firebaseUser, setFirebaseUser] = useState<User | void>();
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | void>();
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.Loading);
  const [authToken, setAuthToken] = useState<string>();
  const [roles, setRoles] = useState<Role[]>([]);
  const { config } = useApp();

  const getRoles = (claims: ParsedTokenWithRoles): Role[] => {
    const roles: Role[] = [];

    if (claims.roles?.includes('admin')) {
      roles.push(Role.Admin);
    }
    if (claims.roles?.includes('user')) {
      roles.push(Role.User);
    }

    return roles;
  };

  useEffect(() => {
    if (!firebaseApp) return;
    const cancelListener = getAuth().onIdTokenChanged(async (user) => {
      if (!user) {
        setFirebaseUser();
        setStatus(AuthStatus.SignedOut);
        setAuthToken(undefined);
        return;
      }

      setFirebaseUser(user);
      const tokenResult = await user.getIdTokenResult();
      const { token } = tokenResult;
      setRoles(getRoles(tokenResult.claims as ParsedTokenWithRoles));
      setAuthToken(token);

      onSignIn && (await onSignIn(token));
      setStatus(AuthStatus.SignedIn);
    });

    return cancelListener;
  }, [firebaseApp]);

  useEffect(() => {
    if (!config) return;

    const app = initializeApp(config.auth.firebase);
    setFirebaseApp(app);
  }, [config]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === AuthStatus.SignedIn) getAuthToken(true);
    }, 1000 * 60 * 15); //every 15 minutes proactively refresh authtoken
    return () => {
      clearInterval(interval);
    };
  }, []);

  const signOut = async () => {
    await getAuth().signOut();
    onSignOut && (await onSignOut());
  };

  const getAuthToken = async (forceRefresh: boolean) => {
    const currentUser = getAuth().currentUser;
    if (!currentUser) return;

    return await currentUser.getIdToken(forceRefresh);
  };

  const isReady = Boolean(firebaseApp) && Boolean(status);

  return {
    signOut,
    firebaseApp,
    roles,
    status,
    isReady,
    getAuthToken,
    authToken,
    userId: (firebaseUser as User)?.uid,
  };
}
