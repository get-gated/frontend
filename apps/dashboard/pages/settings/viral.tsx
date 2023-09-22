import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  AuthProviderType,
  AuthType,
  useApp,
  useAuthPopup,
  useMe,
} from '@gated/app';
import { CopyInput } from '@gated/ui/components';
import { emailPartsUtil } from '@gated/utils';
import { gql } from '@apollo/client';
import {
  useCheckHandleLazyQuery,
  useHandleMutation,
} from '@gated/graphql-types';
import debounce from 'lodash/debounce';

import {
  IoCheckmarkCircleSharp as AvailableIcon,
  IoCloseCircleSharp as UnavailableIcon,
  IoEllipsisHorizontalSharp as LoadingIcon,
} from 'react-icons/io5';
import { App, useAppLink } from '@gated/app/hooks';

gql`
  query CheckHandle($input: UserHandleAvailableQueryInput!) {
    userHandleAvailable(input: $input)
  }

  mutation Handle($input: UserHandleInput!) {
    userHandle(input: $input) {
      id
      handle
    }
  }
`;

const Viral = () => {
  const { user } = useMe();
  const { config } = useApp();
  const toast = useToast();
  const appLink = useAppLink();
  const signature = `<a href="${config.origin}?ref=${user.referralCode}&utm_channel=product&utm_medium=email&utm_source=user-signature"><img src="${config.origin}/u/api/signature/banner?handle=${user.handle}" width="550" style="max-width: 90%" /></a><img src="${config.apiOrigin}/api/impression/${user.id}/${user.nonprofit.id}/USER_SIGNATURE/load.gif" width="0" height="0" style='display: none;' />`;
  const { popupAuth } = useAuthPopup({
    authProvider: AuthProviderType.Google,
    authType: AuthType.Signature,
    additionalReqParams: {
      signature,
    },
    redirectPath: '/loading',
    onSuccess: () => {
      toast({
        title: 'Signature Updated!',
        status: 'success',
        description:
          'The signature has successfully been added to your selected Google account.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error Adding Signature',
        status: 'error',
        description: error,
      });
    },
  });

  const profileUrl = appLink(App.User, `/u/${user.handle}`);

  return (
    <>
      <Head>
        <title>Viral Playground</title>
      </Head>
      <VStack bg="bg-surface" p={8} spacing={8}>
        <Heading size="md">Signature</Heading>
        <Box>
          <Text textStyle="label">Preview</Text>
          <div dangerouslySetInnerHTML={{ __html: signature }} />
        </Box>

        <Box>
          <CopyInput value={signature} label="Signature HTML" type="code" />
        </Box>
        <Button onClick={popupAuth}>Add Signature To Gmail Account</Button>

        <Heading size="md">Profile Page</Heading>
        <Box>
          <CopyInput value={profileUrl} label="Your Profile" />
        </Box>

        <Button as="a" href={profileUrl} target="_blank">
          View Your Profile
        </Button>
      </VStack>
    </>
  );
};

function formatHandle(val: string): string {
  return val
    .replace(/[^a-z0-9@]*/gi, '')
    .toLowerCase()
    .substring(0, 15);
}

const SetHandle = () => {
  const { user } = useMe();
  const { username } = emailPartsUtil(user.notificationEmail);

  const [updateHandle, { loading: updateLoading, error: updateError }] =
    useHandleMutation();
  const [checkHandle, { data, loading, error }] = useCheckHandleLazyQuery();

  const [handle, setHandle] = useState(formatHandle(username));

  useEffect(() => {
    onCheckHandle(handle);
  }, []);

  const onHandleChange = (newHandle: string) => {
    const formatted = formatHandle(newHandle);
    setHandle(formatted);
    onCheckHandle(formatted);
  };

  const onCheckHandle = debounce(
    (handleToCheck: string) => {
      checkHandle({ variables: { input: { handle: handleToCheck } } });
    },
    300,
    { trailing: true },
  );

  const onSave = () => {
    if (!data.userHandleAvailable) return;
    updateHandle({ variables: { input: { handle } } });
  };

  let StatusIcon = null;
  let statusColor = null;

  if (loading) {
    StatusIcon = LoadingIcon;
    statusColor = 'muted';
  } else if (data?.userHandleAvailable) {
    StatusIcon = AvailableIcon;
    statusColor = 'success';
  } else {
    StatusIcon = UnavailableIcon;
    statusColor = 'warn';
  }

  return (
    <VStack maxW={500} mx="auto">
      <Text textStyle="label">Choose your handle</Text>
      <InputGroup>
        <InputLeftAddon>@</InputLeftAddon>
        <Input
          value={handle}
          onChange={(e) => onHandleChange(e.target.value)}
          pattern="[a-z0-9]+"
          maxLength={15}
          minLength={3}
        />
        <InputRightAddon>
          <Icon as={StatusIcon} color={statusColor} />
        </InputRightAddon>
      </InputGroup>
      <Button
        onClick={onSave}
        isLoading={loading}
        disabled={updateLoading || !data?.userHandleAvailable}
      >
        Save
      </Button>
    </VStack>
  );
};

export default function () {
  const { isReady, user } = useMe();

  if (!isReady) {
    return null;
  }
  if (!user.handle) {
    return <SetHandle />;
  }

  return <Viral />;
}
