import { memo, useEffect, useState } from 'react';
import {
  TransactionEnum,
  useAdminNotificationUserSettingsQuery,
  useAdminUpdateNotificationUserSettingsMutation,
} from '@gated/graphql-types';
import {
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { gql } from '@apollo/client';
import { useUser } from '@hooks/use-user.hook';
import { difference } from 'lodash';

gql`
  query AdminNotificationUserSettings {
    notificationUserSettings {
      id
      email
      disableTxEmail
    }
  }

  mutation AdminUpdateNotificationUserSettings(
    $input: NotificationUserSettingsUpdateAdminInput!
  ) {
    notificationUserSettingsAdminUpdate(input: $input) {
      email
      disableTxEmail
      id
    }
  }
`;

export const NotificationSettingsComponent = memo(() => {
  const { userId, context } = useUser();
  const { data, loading } = useAdminNotificationUserSettingsQuery({ context });
  const [update, { loading: updateLoading, error: updateError }] =
    useAdminUpdateNotificationUserSettingsMutation();

  const [disabled, setDisabled] = useState<TransactionEnum[]>([]);
  const [email, setEmail] = useState<string>();

  const errorToast = useToast({ status: 'error' });

  useEffect(() => {
    if (!data) return;
    setDisabled(data.notificationUserSettings.disableTxEmail || []);
    setEmail(data.notificationUserSettings.email);
  }, [data]);

  useEffect(() => {
    if (!updateError) return;
    errorToast({
      title: 'Error updating notification settings',
      description: updateError.message,
    });
  }, [updateError]);

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setDisabled(disabled.filter((i) => i !== e.target.value));
    } else {
      setDisabled([...disabled, e.target.value as TransactionEnum]);
    }
  };

  console.log(disabled);

  const handleUpdate = () => {
    update({
      variables: {
        input: { userId, emailAddress: email, disableTxEmail: disabled },
      },
    });
  };

  const isDirty = () => {
    return (
      difference(disabled, data?.notificationUserSettings.disableTxEmail)
        .length > 0 || email !== data?.notificationUserSettings.email
    );
  };

  return (
    <VStack alignItems="start">
      {Object.keys(TransactionEnum).map((tx) => (
        <Checkbox
          key={tx}
          value={tx}
          isChecked={disabled.includes(tx as TransactionEnum) === false}
          onChange={handleCheckChange}
          disabled={loading || updateLoading}
        >
          {tx}
        </Checkbox>
      ))}

      <InputGroup>
        <InputLeftAddon>Send To</InputLeftAddon>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>

      <Button
        onClick={handleUpdate}
        disabled={!isDirty() || loading || updateLoading}
      >
        Save
      </Button>
    </VStack>
  );
});
