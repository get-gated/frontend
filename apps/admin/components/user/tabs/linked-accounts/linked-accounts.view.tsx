import React, { memo, useEffect } from 'react';

import { useToast } from '@chakra-ui/react';
import {
  LinkAccountConnection,
  LinkedAccount,
} from './linked-account.component';
import {
  ActivateConnectionMutation,
  ActivateConnectionMutationVariables,
  DeactivateConnectionMutation,
  DeactivateConnectionMutationVariables,
  RemoveConnectionMutation,
  RemoveConnectionMutationVariables,
} from '@gated/graphql-types';
import { MutationTuple } from '@apollo/client';

interface LinkedAccountsViewProps {
  connections: LinkAccountConnection[];
  deactivateConnection: MutationTuple<
    DeactivateConnectionMutation,
    DeactivateConnectionMutationVariables
  >;
  activateConnection: MutationTuple<
    ActivateConnectionMutation,
    ActivateConnectionMutationVariables
  >;
  removeConnection: MutationTuple<
    RemoveConnectionMutation,
    RemoveConnectionMutationVariables
  >;
}
export const LinkedAccountsView = memo<LinkedAccountsViewProps>(
  ({
    removeConnection,
    activateConnection,
    deactivateConnection,
    connections = [],
  }) => {
    const onRemoveConnection = removeConnection[0];
    const onActivateConnection = activateConnection[0];
    const onDeactivateConnection = deactivateConnection[0];

    const errorToast = useToast({ status: 'error' });

    useEffect(() => {
      if (!deactivateConnection[1].error) return;

      errorToast({
        title: 'Error deactivating connection',
        description: deactivateConnection[1].error.message,
      });
    }, [deactivateConnection[1].error]);

    useEffect(() => {
      if (!activateConnection[1].error) return;

      errorToast({
        title: 'Error activating connection',
        description: activateConnection[1].error.message,
      });
    }, [activateConnection[1].error]);

    return (
      <>
        {connections.map((connection) => (
          <LinkedAccount
            key={connection.id}
            connection={connection}
            onRemoveConnection={() =>
              onRemoveConnection({
                variables: { input: { connectionId: connection.id } },
                optimisticResponse: {
                  connectionUnlink: {
                    __typename: 'Connection',
                    isDisabled: true,
                    id: connection.id,
                  },
                },
              })
            }
            onActivateConnection={() => {
              //alert('hey');
              onActivateConnection({
                variables: { input: { connectionId: connection.id } },
                optimisticResponse: {
                  connectionActivate: {
                    __typename: 'Connection',
                    isActivated: true,
                    id: connection.id,
                  },
                },
              });
            }}
            onDeactivateConnection={() =>
              onDeactivateConnection({
                variables: { input: { connectionId: connection.id } },
                optimisticResponse: {
                  connectionDeactivate: {
                    __typename: 'Connection',
                    isActivated: false,
                    id: connection.id,
                  },
                },
              })
            }
          />
        ))}
      </>
    );
  },
);
