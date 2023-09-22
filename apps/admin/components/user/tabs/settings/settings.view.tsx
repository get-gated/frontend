import React, { memo, useEffect, useState } from 'react';
import {
  ButtonGroup,
  Divider,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
  StackDivider,
  Text,
  useToast,
} from '@chakra-ui/react';
import { HiPlus } from 'react-icons/hi';
import { OptOutAddress } from './opt-out-addresses.component';
import { MutationTuple } from '@apollo/client';

import {
  AddOptOutAddressMutation,
  AddOptOutAddressMutationVariables,
  OptOutAddress as OptOutAddressType,
  RemoveOptOutAddressMutation,
  RemoveOptOutAddressMutationVariables,
} from '@gated/graphql-types';
import { NotificationSettingsComponent } from '@components/user/tabs/settings/notification-settings.component';

interface OptOutAddressesProps {
  addresses?: OptOutAddressType[];
  removeOptOutAddress: MutationTuple<
    RemoveOptOutAddressMutation,
    RemoveOptOutAddressMutationVariables
  >;
  addOptOutAddress: MutationTuple<
    AddOptOutAddressMutation,
    AddOptOutAddressMutationVariables
  >;
}

export const SettingsView = memo<OptOutAddressesProps>(
  ({ addresses, removeOptOutAddress, addOptOutAddress }) => {
    const [addAddress, setAddAddress] = useState('');
    const errorToast = useToast({ status: 'error' });

    useEffect(() => {
      if (!removeOptOutAddress[1].error) return;

      errorToast({
        title: 'Error removing opt out address',
        description: removeOptOutAddress[1].error.message,
      });
    }, [removeOptOutAddress[1].error]);

    useEffect(() => {
      if (!addOptOutAddress[1].error) return;

      errorToast({
        title: 'Error removing opt out address',
        description: addOptOutAddress[1].error.message,
      });
    }, [addOptOutAddress[1].error]);

    const onAddAddress = (emailAddress: string) => {
      const createdAt = new Date();
      addOptOutAddress[0]({
        variables: { input: { emailAddress } },
        optimisticResponse: {
          optOutAddressAdd: {
            __typename: 'OptOutAddress',
            id: createdAt.getTime().toString(),
            emailAddress,
            createdAt,
          },
        },
      });
    };
    const onRemoveAddress = (optOutId: string) => {
      removeOptOutAddress[0]({
        variables: { input: { optOutId } },
        optimisticResponse: {
          optOutAddressRemove: true,
        },
      });
    };

    const onAdd = () => {
      onAddAddress(addAddress);
      setAddAddress('');
    };

    return (
      <>
        <Heading size="md">Opt Out Addresses</Heading>
        <Stack divider={<StackDivider borderColor="gray.100" />}>
          {addresses?.length === 0 && (
            <Text>User has not opted out of any addresses.</Text>
          )}
          {addresses?.map((address) => (
            <OptOutAddress
              key={address.id}
              address={address}
              onRemoveAddress={onRemoveAddress}
            />
          ))}
          <InputGroup>
            <InputLeftAddon>Address</InputLeftAddon>
            <Input
              onChange={(e) => setAddAddress(e.target.value)}
              value={addAddress}
              placeholder="opt-out@mydomain.com"
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                onAdd();
              }}
            />
            <InputRightElement pr="1rem">
              <ButtonGroup
                size="sm"
                isAttached
                onClick={onAdd}
                isDisabled={addAddress.length === 0}
                colorScheme="create"
              >
                <IconButton
                  aria-label="Add to friends"
                  icon={<HiPlus />}
                  h="1.75rem"
                />
              </ButtonGroup>
            </InputRightElement>
          </InputGroup>
        </Stack>
        <Divider my={10} />
        <Heading size="md">Notifications</Heading>
        <NotificationSettingsComponent />
      </>
    );
  },
);
