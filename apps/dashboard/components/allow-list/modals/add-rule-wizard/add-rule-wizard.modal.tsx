import React, { useState } from 'react';
import {
  Stack,
  Box,
  ModalCloseButton,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react';
import { Steps } from './components/steps.component';
import { StepOneView } from './steps/step-one.view';
import { StepTwoView } from './steps/step-two.view';
import { StepThreeView } from './steps/step-three.view';
import { StepsCompleted } from './steps/completed.view';
import { TrainContext } from './use-add-rule-wizard.hook';
import { Address, useSteps } from './use-steps.hook';

import { TrainingType } from './add-rule-wizard.enums';
import { RuleEnum } from '@gated/graphql-types';
import { useTrainings } from '@hooks/use-trainings.hook';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface AddRuleWizardModalProps {
  onCompleted?: (data) => void;
}

interface AllProps extends ModalProps, AddRuleWizardModalProps {}

export const AddRuleWizardModal = (props: AllProps) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="xl"
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {props.isOpen && <Content {...props} />}
      </ModalContent>
    </Modal>
  );
};

const Content = ({ onClose, onCompleted }: AllProps) => {
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

  const {
    trainAddress,
    trainDomain,
    trainAddressLoading,
    trainDomainLoading,
    trainAddressError,
    trainDomainError,
  } = useTrainings();

  const [type, setType] = useState<TrainingType>(TrainingType.Domain);
  const [rule, setRule] = useState<RuleEnum>(RuleEnum.Allow);
  const [address, setAddress] = useState<Address>({
    username: '',
    domain: '',
  });

  const onSave = async () => {
    if (type === TrainingType.Domain) {
      await trainDomain(address.domain, rule, '', onCompleted);
    } else if (type === TrainingType.Address) {
      await trainAddress(
        `${address.username}@${address.domain}`,
        rule,
        '',
        onCompleted,
      );
    } else {
      return;
    }
    nextStep();
  };
  const onDone = () => {
    onClose();
  };

  return (
    <ModalBody>
      <Box maxW="xl" mx="auto">
        <Stack as="section" spacing="6">
          <TrainContext.Provider
            value={{
              type,
              onTypeChange: setType,
              rule,
              onRuleChange: setRule,
              address,
              onAddressChange: setAddress,
              onSave,
              onNext: nextStep,
              onPrev: prevStep,
              loading: trainAddressLoading || trainDomainLoading,
              onDone,
              error: trainAddressError || trainDomainError,
            }}
          >
            <Box
              mx="auto"
              maxW="2xl"
              py="10"
              px={{ base: '6', md: '8' }}
              minH="400px"
            >
              <Steps activeStep={activeStep}>
                <StepOneView />
                <StepTwoView />
                <StepThreeView />
              </Steps>
              <Box display={activeStep === 3 ? 'flex' : 'none'}>
                <StepsCompleted />
              </Box>
            </Box>
          </TrainContext.Provider>
        </Stack>
      </Box>
    </ModalBody>
  );
};
