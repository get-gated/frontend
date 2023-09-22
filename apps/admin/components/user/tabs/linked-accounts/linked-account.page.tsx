import React, { memo } from 'react';
import { gql } from '@apollo/client';
import { LinkedAccountsView } from './linked-accounts.view';
import { useUser } from '@hooks/use-user.hook';
import {
  useActivateConnectionMutation,
  useDeactivateConnectionMutation,
  useRemoveConnectionMutation,
} from '@gated/graphql-types';
import { LinkAccountConnection } from '@components/user/tabs/linked-accounts/linked-account.component';

gql`
  mutation RemoveConnection($input: ConnectionUnlinkInput!) {
    connectionUnlink(input: $input) {
      id
      isDisabled
    }
  }
`;

gql`
  mutation ActivateConnection($input: ConnectionActivateInput!) {
    connectionActivate(input: $input) {
      id
      isActivated
    }
  }
`;

gql`
  mutation DeactivateConnection($input: ConnectionDeactivateInput!) {
    connectionDeactivate(input: $input) {
      id
      isActivated
    }
  }
`;
interface LinkedAccountPageProps {
  connections: LinkAccountConnection[];
}
export const LinkedAccountPage = memo<LinkedAccountPageProps>((props) => {
  const { context } = useUser();

  const removeConnection = useRemoveConnectionMutation({ context });

  const activateConnection = useActivateConnectionMutation({ context });

  const deactivateConnection = useDeactivateConnectionMutation({ context });

  const viewProps = {
    removeConnection,
    activateConnection,
    deactivateConnection,
  };
  return <LinkedAccountsView {...viewProps} {...props} />;
});
