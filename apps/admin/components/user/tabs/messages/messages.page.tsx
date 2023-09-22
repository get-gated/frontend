import { gql } from '@apollo/client';

import { MessagesView } from './messages.view';
import React, { memo, useEffect, useRef } from 'react';
import { useUser } from '@hooks/use-user.hook';
import debounce from 'lodash/debounce';
import {
  MessageTypeEnum,
  useMessageLazyQuery,
  useMessagesLazyQuery,
} from '@gated/graphql-types';
import { useRouter } from 'next/router';

const pageSize = 10;

gql`
  query Messages($input: MessagesInput!) {
    messages(input: $input) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        totalResults
        endCursor
      }
      edges {
        cursor
        node {
          id
          type
          to {
            displayName
            emailAddress
          }
          from {
            displayName
            emailAddress
          }
          receivedAt
          decision {
            id
            decidedAt
            ruling
            verdict
          }
          challenge {
            id
            hasExpected
            hasDonation
          }
        }
      }
    }
  }
`;

gql`
  query Message($messageId: ID!) {
    message(id: $messageId) {
      id
      type
      to {
        displayName
        emailAddress
      }
      from {
        displayName
        emailAddress
      }
      cc {
        displayName
        emailAddress
      }
      bcc {
        displayName
        emailAddress
      }
      receivedAt
      decision {
        id
        decidedAt
        ruling
        verdict
        enforcedTraining {
          versionId
          origin
          createdAt
          domain
          username
        }
        enforcedOptOutAddress {
          id
          createdAt
          emailAddress
          deletedAt
        }
        enforcedPattern {
          id
          deletedAt
          createdAt
          expression
        }
        challenge {
          id
          createdAt
          nonprofit {
            id
            name
          }
          sentMessage {
            id
            createdAt
            thread {
              id
            }
          }
          interactions(input: {}) {
            edges {
              node {
                id
                paymentAmount
                performedAt
                interaction
              }
            }
          }
          mode
          hasDonation
          hasExpected
          withholdReason
          body
        }
      }
    }
  }
`;

const messageIdQueryParam = 'message-id';
const searchQueryParam = 'query';
const messageTypeParam = 'type';

export const MessagesPage = memo(() => {
  const loadedAt = useRef(new Date());
  const { context } = useUser();

  const [onMessages, messagesQuery] = useMessagesLazyQuery({
    context,
    variables: {
      input: {
        filter: { before: loadedAt },
        pagination: { first: pageSize },
      },
    },
  });

  const [onMessage, messageQuery] = useMessageLazyQuery({ context });

  const router = useRouter();

  const onSelectItem = (messageId: string) => {
    router.replace({
      pathname: router.pathname,
      query: Object.assign({}, router.query, {
        [messageIdQueryParam]: messageId,
      }),
    });
  };

  const onSearch = debounce(
    (query?: string) => {
      const newQuery = { ...router.query };
      if (query) {
        newQuery[searchQueryParam] = query;
      } else {
        delete newQuery[searchQueryParam];
      }

      delete newQuery[messageIdQueryParam];

      router.replace(
        { pathname: router.pathname, query: newQuery },
        undefined,
        { shallow: true, scroll: false },
      );
    },
    300,
    { trailing: true },
  );

  const onTypeChange = (type?: MessageTypeEnum) => {
    const newQuery = { ...router.query };
    if (type) {
      newQuery[messageTypeParam] = type;
    } else {
      delete newQuery[messageTypeParam];
    }

    delete newQuery[messageIdQueryParam];

    router.replace({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    });
  };

  const messageId = (router.query[messageIdQueryParam] as string) || '';
  const query = (router.query[searchQueryParam] as string) || '';
  const type = (router.query[messageTypeParam] as MessageTypeEnum) || undefined;

  useEffect(() => {
    onMessages();
  }, []);

  useEffect(() => {
    onMessages({
      variables: {
        input: {
          filter: { email: query, type },
          pagination: { first: pageSize },
        },
      },
    });
  }, [query, type]);

  useEffect(() => {
    if (!messageId) return;
    onMessage({ context, variables: { messageId } });
  }, [messageId]);

  const onPrevPage = (cursor: string) => {
    onMessages({
      variables: {
        input: {
          pagination: {
            before: cursor,
            first: pageSize,
          },
        },
      },
    });
  };

  const onNextPage = (cursor: string) => {
    onMessages({
      variables: {
        input: {
          pagination: {
            after: cursor,
            first: pageSize,
          },
        },
      },
    });
  };

  return (
    <MessagesView
      queryMessages={messagesQuery}
      queryMessage={messageQuery}
      onSearch={onSearch}
      onSelectItem={onSelectItem}
      selectedItem={messageId as string}
      query={query as string}
      type={type}
      onNextPage={onNextPage}
      onPrevPage={onPrevPage}
      onTypeChange={onTypeChange}
    />
  );
});
