import { gql } from '@apollo/client';

gql`
  query User($userId: ID!) {
    user(id: $userId) {
      connections {
        id
        isDisabled
        createdAt
        emailAddress
        isActivated
        status
        isSyncing
      }
      id
      fullName
      joinedAt
      disabledAt
      isDisabled
      avatar
      notificationSettings {
        id
        email
      }
      optOutAddresses {
        id
        emailAddress
        createdAt
        deletedAt
      }
    }
  }
`;
