import { FieldGroup } from '@gated/ui/components/field-group';
import {
  Box,
  Button,
  Center,
  HStack,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { formatCurrencyUtil } from '@gated/utils';
import { NonprofitModal } from '@components/NonprofitModal';
import { MinDonationModal } from './challenge.min-donation.modal';
import { SignatureEditModal } from './challenge.signature.modal';
import { Spinner } from '@gated/ui/components';
import {
  useChallengeSettingsQuery,
  useUserChallengeSettingsMutation,
} from '@gated/graphql-types';

export const ChallengeView = () => {
  const {
    onClose: onMinDonationClose,
    onOpen: onMinDonationOpen,
    isOpen: minDonationIsOpen,
  } = useDisclosure();

  const {
    onClose: onSignatureClose,
    onOpen: onSignatureOpen,
    isOpen: signatureIsOpen,
  } = useDisclosure();

  const {
    onClose: onNonprofitClose,
    onOpen: onNonprofitOpen,
    isOpen: nonprofitIsOpen,
  } = useDisclosure();

  const [updateChallengeSettings, { loading: updateLoading }] =
    useUserChallengeSettingsMutation();
  const { data, loading } = useChallengeSettingsQuery({
    fetchPolicy: 'cache-first',
  });

  const updateMinDonation = async (minDonation: number) => {
    await updateChallengeSettings({
      variables: {
        input: {
          nonprofitId: data.challengeSettings.nonprofit.id,
          minimumDonation: minDonation,
          signature: data.challengeSettings.signature,
        },
      },
    });
  };

  const updateSignature = async (signature: string) => {
    await updateChallengeSettings({
      variables: {
        input: {
          nonprofitId: data.challengeSettings.nonprofit.id,
          signature,
          minimumDonation: data.challengeSettings.minimumDonation,
        },
      },
    });
  };

  const { colorMode } = useColorMode();

  if (loading) return <Spinner />;
  return (
    <>
      <MinDonationModal
        defaultMinDonation={data?.challengeSettings.minimumDonation}
        isOpen={minDonationIsOpen}
        onClose={onMinDonationClose}
        onSave={updateMinDonation}
        loading={updateLoading}
      />
      <SignatureEditModal
        defaultSignature={data?.challengeSettings.signature}
        isOpen={signatureIsOpen}
        onClose={onSignatureClose}
        onSave={updateSignature}
        loading={updateLoading}
      />
      <NonprofitModal isOpen={nonprofitIsOpen} onClose={onNonprofitClose} />
      <FieldGroup
        title="Challenge & Nonprofit"
        description="Customize the challenge to reach your inbox"
      >
        <Stack direction="column" spacing="4">
          <Box
            p={5}
            borderWidth="1px"
            borderRadius="md"
            color="white"
            backgroundColor={colorMode === 'light' && 'gray.300'}
            maxWidth={200}
          >
            <Center
              verticalAlign="center"
              textAlign="center"
              fontWeight="semibold"
            >
              <Text>{data?.challengeSettings.nonprofit.name}</Text>
            </Center>
          </Box>

          <Box>
            <Text>
              {formatCurrencyUtil(data?.challengeSettings.minimumDonation)}
            </Text>
            <Text color="gray.500" fontSize="sm">
              Minimum requested donation
            </Text>
          </Box>

          <Box>
            <Text>{data?.challengeSettings.signature}</Text>
            <Text color="gray.500" fontSize="sm">
              Challenge email signature
            </Text>
          </Box>
          <HStack mt="5" wrap="wrap">
            <Button
              size="sm"
              fontWeight="normal"
              colorScheme="gray"
              onClick={onNonprofitOpen}
            >
              Change nonprofit
            </Button>
            <Button
              size="sm"
              fontWeight="normal"
              colorScheme="gray"
              onClick={onMinDonationOpen}
            >
              Change donation
            </Button>
            <Button
              size="sm"
              fontWeight="normal"
              colorScheme="gray"
              onClick={onSignatureOpen}
            >
              Change signature
            </Button>
          </HStack>
        </Stack>
      </FieldGroup>
    </>
  );
};
