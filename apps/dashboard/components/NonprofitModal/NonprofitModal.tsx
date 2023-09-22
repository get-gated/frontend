/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  UseDisclosureProps,
  useBreakpointValue,
} from '@chakra-ui/react';

import {
  ProgressStepsProvider,
  useProgressSteps,
} from '@components/ProgressSteps';

import { useChallengeSettingsQuery } from '@gated/graphql-types';
import { gql } from '@apollo/client';
import { StepIntro } from '@components/NonprofitModal/step-intro';
import { StepChoose } from '@components/NonprofitModal/step-choose';
import { StepReason } from '@components/NonprofitModal/step-reason';
import {
  nonprofitContext,
  NonprofitPartial,
} from '@components/NonprofitModal/context';

interface NonprofitModalProps extends UseDisclosureProps {
  onChange?: () => void;
}

export interface NonprofitStepProps {
  onDone: () => void;
  onBack: () => void;
}

export const NonprofitModal = (props: NonprofitModalProps) => (
  <ProgressStepsProvider numberOfSteps={3}>
    <NonprofitModalView {...props} />
  </ProgressStepsProvider>
);

const FRAGMENT_CHALLENGE_USER_SETTING_FIELDS = gql`
  fragment ChallengeUserSettingFields on ChallengeUserSetting {
    id
    signature
    minimumDonation
    nonprofit {
      id
      slug
      category {
        id
        name
      }
      description
      name
      isFeatured
    }
  }
`;

gql`
  mutation UserChallengeSettings($input: ChallengeUserSettingsUpdateInput!) {
    ${FRAGMENT_CHALLENGE_USER_SETTING_FIELDS}
    challengeUserSettingsUpdate(input: $input) {
      ...ChallengeUserSettingFields
    }
  }
`;

gql`
  ${FRAGMENT_CHALLENGE_USER_SETTING_FIELDS}
  query ChallengeSettings {
    challengeSettings {
      ...ChallengeUserSettingFields
    }
  }
`;

const NonprofitModalView = ({
  isOpen = false,
  onClose = () => {},
  onChange,
}: NonprofitModalProps) => {
  const { onNext, onBack, onReset, activeStep } = useProgressSteps();

  const { data, loading: challengeSettingsLoading } =
    useChallengeSettingsQuery();

  const [currentId, setCurrentId] = useState('');
  const [selected, setSelected] = useState<NonprofitPartial>();
  const [categoryId, setCategoryId] = useState('');

  const steps = [
    <StepIntro onDone={onNext} key={1} />,
    <StepChoose
      onBack={onBack}
      onDone={() => {
        onNext();
        onChange && onChange();
      }}
      key={2}
    />,
    <StepReason onBack={onBack} onDone={onClose} key={3} />,
  ];

  const modalSize = useBreakpointValue({ base: 'mobile-full', md: '2xl' });

  useEffect(() => {
    if (!challengeSettingsLoading && data) {
      setCurrentId(data.challengeSettings.nonprofit.id);
      setSelected(data.challengeSettings.nonprofit);
      setCategoryId('popular');
    }
  }, [challengeSettingsLoading, data]);

  const providerValue = {
    currentId,
    selected,
    categoryId,
    setCategoryId: (id) => setCategoryId(id),
    setSelected: (nonprofit) => setSelected(nonprofit),
  };

  return (
    <nonprofitContext.Provider value={providerValue}>
      <Modal
        scrollBehavior="inside"
        onClose={onClose}
        onCloseComplete={onReset}
        isOpen={isOpen}
        isCentered
        size={modalSize}
      >
        <ModalOverlay />
        <ModalContent>
          <>
            <ModalCloseButton onClick={onClose} />
            {steps[activeStep - 1]}
          </>
        </ModalContent>
      </Modal>
    </nonprofitContext.Provider>
  );
};
