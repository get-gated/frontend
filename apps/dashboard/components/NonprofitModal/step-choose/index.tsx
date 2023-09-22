import React, { useMemo } from 'react';

import {
  Text,
  ModalBody,
  Spacer,
  Flex,
  ModalHeader,
  ModalFooter,
  Button,
  Box,
  Show,
} from '@chakra-ui/react';

import { useUserChallengeSettingsMutation } from '@gated/graphql-types';
import { CategorySelector } from './category-selector';
import { NonprofitStepProps } from '@components/NonprofitModal';
import { useNonprofit } from '@components/NonprofitModal/context';
import { List } from '@components/NonprofitModal/step-choose/list';
import { Popular } from '@components/NonprofitModal/step-choose/popular';
import { useMe } from '@gated/app';

export const StepChoose = ({ onDone, onBack }: NonprofitStepProps) => {
  const { selected, currentId, categoryId } = useNonprofit();

  const { user } = useMe();

  const [updateChallengeSettings, { loading: updateLoading }] =
    useUserChallengeSettingsMutation();

  const isExisting = selected?.id === currentId;

  const handleNonprofitChange = async () => {
    if (!selected.id) return;

    if (isExisting) {
      return onDone();
    }

    await updateChallengeSettings({
      variables: {
        input: {
          nonprofitId: selected.id,
          nonprofitReason: '',
        },
      },
    }).then(() => {
      onDone();
    });
  };

  const link = useMemo(() => {
    if (user) {
      return `https://xv3fk5mmmbo.typeform.com/to/mBD4fLbX#userid=${user.id}&email=${user.notificationEmail}`;
    } else {
      return `https://xv3fk5mmmbo.typeform.com/to/vd42omFv`;
    }
  }, [user]);

  return (
    <>
      <ModalHeader>
        Select Your Nonprofit
        <Flex
          fontSize="sm"
          alignItems={{ base: 'end', md: 'baseline' }}
          direction={{ base: 'column-reverse', md: 'row' }}
        >
          <Text
            textOverflow="ellipsis"
            noOfLines={{ base: 2, md: 1 }}
            maxH={{ base: 12, md: 6 }}
            pr={2}
            color="default"
            w={{ base: 'full', sm: 'auto' }}
            pt={{ base: '2', sm: '0' }}
          >
            <Text textStyle="label" as="span">
              Currently Selected:{' '}
            </Text>
            <Text as="span" display="inline-block">
              {selected?.name}
            </Text>
          </Text>
          <Spacer />

          <CategorySelector />
        </Flex>
      </ModalHeader>
      <ModalBody p="0" position="relative" overflow="scroll" maxH="100vh">
        <Box
          height={{ base: '100%', md: '600px' }}
          overflow="scroll"
          p="20px"
          scrollSnapType="y mandatory"
        >
          {categoryId === 'popular' ? (
            <Popular />
          ) : (
            <>
              <List />
              <Text w="full" p="8" textAlign="center" textStyle="caption">
                Not finding your favorite nonprofit?{' '}
                <Button
                  as="a"
                  variant="tertiary"
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Request it
                </Button>
              </Text>
            </>
          )}
        </Box>
      </ModalBody>
      <ModalFooter as={Flex}>
        <Spacer />
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button
          variant="primary"
          disabled={!selected || updateLoading}
          isLoading={updateLoading}
          onClick={handleNonprofitChange}
          ml={2}
        >
          {isExisting ? 'Keep Current Nonprofit' : 'Update Nonprofit'}
        </Button>
      </ModalFooter>
    </>
  );
};
