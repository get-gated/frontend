import { ApolloError, FetchResult, gql } from '@apollo/client';
import {
  Connection,
  MutationActivateConnectionMutation,
  MutationDeactivateConnectionMutation,
  MutationUnlinkConnectionMutation,
  useMutationActivateConnectionMutation,
  useMutationDeactivateConnectionMutation,
  useMutationUnlinkConnectionMutation,
  useQueryConnectionsQuery,
} from '@gated/graphql-types';

const FRAGMENT_CONNECTION_FIELD = gql`
  fragment ConnectionField on Connection {
    id
    isActivated
    isSyncing
    emailAddress
    status
    provider
    createdAt
  }
`;

gql`
  ${FRAGMENT_CONNECTION_FIELD}
  query QueryConnections {
    me {
      id
      connections {
        ...ConnectionField
      }
    }
  }
`;

gql`
  ${FRAGMENT_CONNECTION_FIELD}
  mutation MutationActivateConnection($input: ConnectionActivateInput!) {
    connectionActivate(input: $input) {
      ...ConnectionField
    }
  }
`;

gql`
  ${FRAGMENT_CONNECTION_FIELD}
  mutation MutationDeactivateConnection($input: ConnectionDeactivateInput!) {
    connectionDeactivate(input: $input) {
      ...ConnectionField
    }
  }
`;

gql`
  mutation MutationUnlinkConnection($input: ConnectionUnlinkInput!) {
    connectionUnlink(input: $input) {
      id
    }
  }
`;

export interface IUseConnections {
  connections: Partial<Connection>[];
  loading: boolean;
  error: ApolloError | void;
  activateLoading: boolean;
  activateError: ApolloError | void;
  activate: (
    connectionId: string,
    onCompleted?,
    onError?,
  ) => Promise<FetchResult<MutationActivateConnectionMutation>>;
  unlink: (
    connectionId: string,
    onCompleted?,
    onError?,
  ) => Promise<FetchResult<MutationUnlinkConnectionMutation>>;
  unlinkLoading: boolean;
  unlinkError: ApolloError | void;
  deactivateLoading: boolean;
  deactivateError: ApolloError | void;
  deactivate: (
    connectionId: string,
    onCompleted?,
    onError?,
  ) => Promise<FetchResult<MutationDeactivateConnectionMutation>>;
}

export const useConnections = (): IUseConnections => {
  const { data, loading, error } = useQueryConnectionsQuery({
    fetchPolicy: 'cache-first',
  });

  const [activateMutation, { loading: activateLoading, error: activateError }] =
    useMutationActivateConnectionMutation();

  const activate = async (connectionId: string, onCompleted?, onError?) => {
    return activateMutation({
      variables: { input: { connectionId: connectionId } },
      onCompleted,
      onError,
    });
  };

  const [
    deactivateMutation,
    { loading: deactivateLoading, error: deactivateError },
  ] = useMutationDeactivateConnectionMutation();

  const deactivate = async (connectionId: string, onCompleted?, onError?) => {
    return deactivateMutation({
      variables: { input: { connectionId: connectionId } },
      onCompleted,
      onError,
    });
  };

  const [unlinkMutation, { loading: unlinkLoading, error: unlinkError }] =
    useMutationUnlinkConnectionMutation();

  const unlink = async (
    connectionId: string,
    reasonText: string,
    experienceText: string,
    onCompleted?,
    onError?,
  ) => {
    return unlinkMutation({
      variables: {
        input: {
          connectionId: connectionId,
          reasonText: reasonText,
          experienceText: experienceText,
        },
      },
      onCompleted,
      onError,
      optimisticResponse: {
        connectionUnlink: {
          __typename: 'Connection',
          id: connectionId,
        },
      },
      update(cache) {
        const normalizedId = cache.identify({
          id: connectionId,
          __typename: 'Connection',
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
  };

  return {
    connections: data?.me.connections || [],
    loading,
    error,
    activateLoading,
    activateError,
    activate,
    unlink,
    unlinkLoading,
    unlinkError,
    deactivate,
    deactivateLoading,
    deactivateError,
  };
};
