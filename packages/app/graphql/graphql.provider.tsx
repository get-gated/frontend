import { onError } from '@apollo/client/link/error';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  from,
  fromPromise,
  InMemoryCache,
  useApolloClient,
} from '@apollo/client';
import { useApp } from '../app/use-app.hook';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/use-auth.hook';
import { AuthStatus } from '../auth/auth.enums';

export default function GraphQLProvider({ children }) {
  const { config } = useApp();
  const { authToken, status, getAuthToken } = useAuth();

  const apiOrigin = config?.apiOrigin || '';

  const httpLink = createHttpLink({
    uri: `${apiOrigin}/graphql`,
  });

  const pendingRequests = useRef<(() => void)[]>([]);
  const isRefreshing = useRef(false);

  const addPendingRequest = (pendingRequest: () => void) => {
    pendingRequests.current.push(pendingRequest);
  };

  const setIsRefreshing = (value: boolean) => {
    isRefreshing.current = value;
  };

  const resolvePendingRequests = () => {
    pendingRequests.current.forEach((callback) => callback());
    pendingRequests.current = [];
  };

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors && graphQLErrors.length) {
      const [error] = graphQLErrors;
      if (
        error.extensions.code === 'FORBIDDEN' &&
        status === AuthStatus.SignedIn
      ) {
        // try to refetch token
        if (!isRefreshing) {
          setIsRefreshing(true);

          return fromPromise(
            getAuthToken(true).then(() => {
              setIsRefreshing(false);
              return forward(operation);
            }),
          ).flatMap(() => {
            resolvePendingRequests();
            setIsRefreshing(false);
            return forward(operation);
          });
        } else {
          return fromPromise(
            new Promise((resolve) => {
              addPendingRequest(() => resolve(true));
            }),
          ).flatMap(() => {
            return forward(operation);
          });
        }
      }
    }
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => {
      return {
        headers: {
          ...headers,
          authorization: authToken,
        },
      };
    });
    return forward(operation);
  });

  const client = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <>
        <LogOutHandler />
        {children}
      </>
    </ApolloProvider>
  );
}

function LogOutHandler() {
  const [status, setStatus] = useState<AuthStatus>();
  const { clearStore } = useApolloClient();

  const { status: newStatus } = useAuth();

  useEffect(() => {
    if (newStatus === AuthStatus.SignedOut && status === AuthStatus.SignedIn) {
      clearStore();
    }

    setStatus(newStatus);
  }, [status]);
  return null;
}
