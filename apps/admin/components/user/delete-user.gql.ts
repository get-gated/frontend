import { gql } from '@apollo/client';

gql`
  mutation DeleteUser($userId: String!) {
    disableUser(userId: $userId) {
      id
      disabledAt
      isDisabled
    }
  }
`;
