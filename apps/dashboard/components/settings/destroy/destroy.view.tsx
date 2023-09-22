import React, { useEffect } from 'react';

import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import { gql } from '@apollo/client';
import { ChurnQuestionnaire } from '@components/churn-questionnaire';
import { FieldGroup } from '@gated/ui/components';
import { useRouter } from 'next/router';
import { useOffboardMutation } from '@gated/graphql-types';

gql`
  mutation Offboard($input: DeleteAccountRequest!) {
    offboard(input: $input) {
      id
    }
  }
`;

export const DestroyView = () => {
  const removeDialog = useDisclosure();
  const router = useRouter();

  const [onOffboard, { error, loading }] = useOffboardMutation();
  const toast = useToast();

  useEffect(() => {
    if (!error) return;
    toast({
      title: 'Error deleting account',
      description:
        'We encountered an error trying to delete your account. Please try again or contact support for help.',
    });
  }, [error]);

  const onDeleteAccount = async (
    reasonText: string,
    experienceText: string,
  ) => {
    const { errors } = await onOffboard({
      variables: { input: { reasonText, experienceText } },
    });
    if (errors && errors.length > 0) return;

    return router.push('/offboarded');
  };

  return (
    <FieldGroup
      title="Delete Account"
      description="Permanently delete your Gated account"
    >
      <ChurnQuestionnaire
        isOpen={removeDialog.isOpen}
        onClose={removeDialog.onClose}
        onSubmit={onDeleteAccount}
      />
      <Button
        size="sm"
        colorScheme="destroy"
        variant="outline"
        onClick={removeDialog.onOpen}
        isLoading={loading}
      >
        Delete My Account
      </Button>
    </FieldGroup>
  );
};
