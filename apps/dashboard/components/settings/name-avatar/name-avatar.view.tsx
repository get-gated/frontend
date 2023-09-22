import {
  Avatar,
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { Spinner, FieldGroup } from '@gated/ui/components';
import { NameEditModal } from './name-avatar.name.modal';
import { AvatarEditModal } from './name-avatar.avatar.modal';
import {
  useNameAvatarQuery,
  useUpdateProfileMutation,
} from '@gated/graphql-types';
import { gql } from '@apollo/client';

gql`
  query NameAvatar {
    me {
      id
      firstName
      lastName
      fullName
      joinedAt
      avatar
    }
  }
  mutation UpdateProfile($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      id
      avatar
      firstName
      lastName
      fullName
    }
  }
`;

export const NameAvatarView = () => {
  const {
    isOpen: nameIsOpen,
    onOpen: onNameOpen,
    onClose: onNameClose,
  } = useDisclosure();
  const {
    isOpen: avatarIsOpen,
    onOpen: onAvatarOpen,
    onClose: onAvatarClose,
  } = useDisclosure();

  const { data, loading } = useNameAvatarQuery({ fetchPolicy: 'cache-first' });
  const [updateProfile, { loading: updateProfileLoading }] =
    useUpdateProfileMutation();

  const me = data?.me;

  const [joinDate, setJoinDate] = useState('');
  useEffect(() => {
    if (!me?.joinedAt) return;
    setJoinDate(
      new Date(me.joinedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    );
  }, [me?.joinedAt]);

  const saveAvatar = async (avatar: string) => {
    await updateProfile({
      variables: {
        input: {
          avatar,
          firstName: me?.firstName || '',
          lastName: me?.lastName || '',
        },
      },
    });
  };

  const saveName = async (firstName: string, lastName: string) => {
    await updateProfile({
      variables: {
        input: { firstName, lastName, avatar: me?.avatar },
      },
    });
  };

  if (loading || !me) return <Spinner />;

  return (
    <>
      <NameEditModal
        isOpen={nameIsOpen}
        onClose={onNameClose}
        onSave={saveName}
        loading={updateProfileLoading}
        defaultFirstName={me.firstName}
        defaultLastName={me.lastName}
      />

      <AvatarEditModal
        isOpen={avatarIsOpen}
        onClose={onAvatarClose}
        onSave={saveAvatar}
        loading={updateProfileLoading}
      />

      <FieldGroup
        title="Name & Avatar"
        description="Update your name and picture"
      >
        <HStack spacing="4">
          <Avatar src={me.avatar as string} name={me.fullName} />
          <Box>
            <Text>{me.fullName}</Text>
            <Text color="gray.500" fontSize="sm">
              Gated since {joinDate}
            </Text>
          </Box>
        </HStack>
        <HStack mt="5">
          <Button
            size="sm"
            fontWeight="normal"
            colorScheme="gray"
            onClick={onNameOpen}
          >
            Change name
          </Button>
          <Button
            size="sm"
            fontWeight="normal"
            colorScheme="gray"
            onClick={onAvatarOpen}
          >
            Change photo
          </Button>
        </HStack>
      </FieldGroup>
    </>
  );
};
