import React from 'react';
import { Box, Button, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { Spinner, FieldGroup } from '@gated/ui/components';
import { EmailEditModal } from './notifications.email.modal';
import { gql } from '@apollo/client';
import {
  useNotificationUserSettingsQuery,
  useUpdateNotificationUserSettingsMutation,
} from '@gated/graphql-types';

const FRAGMENT_NOTIFICATION_USER_SETTINGS_FIELDS = gql`
  fragment NotificationUserSettingsFields on NotificationUserSettings {
    id
    email
    updatedAt
  }
`;

gql`
  ${FRAGMENT_NOTIFICATION_USER_SETTINGS_FIELDS}
  mutation UpdateNotificationUserSettings(
    $input: NotificationUserSettingsUpdateInput!
  ) {
    notificationUserSettingsUpdate(input: $input) {
      ...NotificationUserSettingsFields
    }
  }
`;

gql`
  ${FRAGMENT_NOTIFICATION_USER_SETTINGS_FIELDS}
  query NotificationUserSettings {
    notificationUserSettings {
      ...NotificationUserSettingsFields
    }
  }
`;

export const NotificationsView = () => {
  const { data, loading } = useNotificationUserSettingsQuery();
  const [updateNotificationSettings, { loading: updateLoading }] =
    useUpdateNotificationUserSettingsMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveEmail = async (emailAddress: string) => {
    await updateNotificationSettings({
      variables: { input: { emailAddress } },
    });
  };

  if (loading) return <Spinner />;
  return (
    <>
      <EmailEditModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={saveEmail}
        loading={updateLoading}
        defaultEmail={data?.notificationUserSettings.email || ''}
      />

      <FieldGroup
        title="Communications"
        description="Manage your email preference"
      >
        <Stack spacing="3">
          <Box>
            <Text>{data?.notificationUserSettings.email}</Text>
            <Text color="gray.500" fontSize="sm">
              Your preferred email address for notifications
            </Text>
          </Box>
          {/* <FormControl display="flex" alignItems="center"> */}
          {/*   <FormLabel htmlFor="email-digest" flex="1" fontSize="sm" mb="0"> */}
          {/*     Weekly digest of activity */}
          {/*   </FormLabel> */}
          {/*   <Switch id="email-digest" value={1} /> */}
          {/* </FormControl> */}
        </Stack>
        <Button
          mt="5"
          size="sm"
          fontWeight="normal"
          colorScheme="gray"
          onClick={onOpen}
        >
          Change email
        </Button>
      </FieldGroup>
    </>
  );
};
