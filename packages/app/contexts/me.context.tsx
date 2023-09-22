import React, { ReactNode, useContext, useEffect, useMemo } from 'react';
import { gql } from '@apollo/client';
import { useMeUserContextLazyQuery } from '@gated/graphql-types';
import { useAuth } from '../auth/use-auth.hook';
import { AuthStatus } from '../auth/auth.enums';

gql`
  query MeUserContext {
    challengeSettings {
      id
      nonprofit {
        name
        id
        slug
      }
    }
    me {
      firstName
      lastName
      fullName
      handle
      referralCode
      id
      avatar
      joinedAt
      notificationSettings {
        email
      }
    }
  }
`;

export interface MeContextValue {
  isReady: boolean;
  user: {
    firstName: string;
    lastName: string;
    fullName: string;
    handle: string;
    avatar: string;
    referralCode: string;
    id: string;
    joinedAt: Date;
    isNewUser: boolean;
    notificationEmail: string;
    nonprofit: {
      name: string;
      slug: string;
      id: string;
    };
  };
}

export const MeContext = React.createContext<MeContextValue>({
  isReady: false,
  user: {
    firstName: '',
    lastName: '',
    fullName: '',
    avatar: '',
    referralCode: '',
    handle: '',
    id: '',
    joinedAt: new Date(),
    isNewUser: false,
    notificationEmail: '',
    nonprofit: {
      name: '',
      slug: '',
      id: '',
    },
  },
});

export const MeProvider = ({ children }: { children: ReactNode }) => {
  const [getMe, { data, loading }] = useMeUserContextLazyQuery();
  const { status } = useAuth();

  useEffect(() => {
    if (status !== AuthStatus.SignedIn) return;
    getMe();
  }, [status]);

  const isNewUser = useMemo(() => {
    return (
      data &&
      (new Date().getTime() - new Date(data.me.joinedAt).getTime()) / 86400000 <
        30
    );
  }, [data]);

  const value = useMemo<MeContextValue>(
    () => ({
      isReady: data && !loading,
      user: {
        firstName: data?.me.firstName,
        lastName: data?.me.lastName,
        fullName: data?.me.fullName,
        avatar: data?.me.avatar,
        handle: data?.me.handle,
        id: data?.me.id,
        notificationEmail: data?.me.notificationSettings.email,
        referralCode: data?.me.referralCode,
        joinedAt: new Date(data?.me.joinedAt),
        isNewUser,
        nonprofit: {
          name: data?.challengeSettings.nonprofit.name,
          slug: data?.challengeSettings.nonprofit.slug,
          id: data?.challengeSettings.nonprofit.id,
        },
      },
    }),
    [data, loading],
  );

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>;
};

export const useMe = () => {
  const context = useContext(MeContext);
  if (!context) {
    throw Error('Hook can only be used in the MeContext');
  } else {
    return context;
  }
};
