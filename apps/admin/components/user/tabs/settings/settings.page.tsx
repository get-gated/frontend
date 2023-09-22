import React, { memo } from 'react';
import { gql } from '@apollo/client';
import { SettingsView } from './settings.view';
import { useUser } from '@hooks/use-user.hook';
import {
  OptOutAddress,
  useAddOptOutAddressMutation,
  useRemoveOptOutAddressMutation,
} from '@gated/graphql-types';

gql`
  mutation AddOptOutAddress($input: OptOutAddressAddInput!) {
    optOutAddressAdd(input: $input) {
      id
      emailAddress
      createdAt
    }
  }
`;

gql`
  mutation RemoveOptOutAddress($input: OptOutAddressRemoveInput!) {
    optOutAddressRemove(input: $input)
  }
`;

interface OptOutAddressesPageProps {
  addresses: OptOutAddress[];
}

export const SettingsPage = memo<OptOutAddressesPageProps>((props) => {
  const { userId, context } = useUser();

  const removeOptOutAddress = useRemoveOptOutAddressMutation({
    context,
    update: (cache, _result, options) => {
      cache.writeFragment({
        id: `OptOutAddress:${options?.variables?.input.optOutId}`,
        fragment: gql`
          fragment DeletedOptOutAddress on OptOutAddress {
            deletedAt
          }
        `,
        data: {
          deletedAt: new Date().toISOString(),
        },
      });
    },
  });

  const addOptOutAddress = useAddOptOutAddressMutation({
    context,
    update: (cache, { data }) => {
      const cacheId = cache.identify({
        __typename: 'User',
        id: userId,
      });
      cache.modify({
        id: cacheId,
        fields: {
          optOutAddresses(existing = []) {
            const ref = cache.writeFragment({
              data: data.optOutAddressAdd,
              fragment: gql`
                fragment NewOptOutAddress on OptOutAddress {
                  id
                  emailAddress
                  createdAt
                }
              `,
            });
            return [...existing, ref];
          },
        },
      });
    },
  });

  const viewProps = {
    removeOptOutAddress,
    addOptOutAddress,
  };
  return <SettingsView {...viewProps} {...props} />;
});
