import React, { useRef, useState } from 'react';
import { Modal, ModalOverlay } from '@chakra-ui/react';

import { ChurnQuestionnaireContentProps } from './ChurnQuestionnaire.types';
import { ChurnReasonFormik } from './ChurnReasonContent';
import { ChurnExperienceFormik } from './ChurnExperienceContent';
import { ChurnContinueContent } from './ChurnContinueContent';
import CHURN_REASON_LABELS from './churn-reason-labels.json';
import { useStorage } from '@gated/app/hooks';

export interface ChurnQuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  onSubmit: (reasonText: string, experienceText: string) => void;
  email?: string;
}
export const ChurnQuestionnaire = (props: ChurnQuestionnaireProps) => {
  const { isOpen = false, onClose, onSubmit } = props;

  const [step, setStep] = useState<number>(1);
  const focusRef = useRef<any>();
  const { getItem, removeItem } = useStorage();

  const resetLocal = () => {
    removeItem('gated.churn.reason', 'local');
    removeItem('gated.churn.experience', 'local');
  };

  const close = () => {
    resetLocal();
    setStep(1);
    onClose();
  };

  const next = () => {
    setStep(step + 1);
  };

  const back = () => {
    step > 1 ? setStep(step - 1) : {};
  };

  const submit = () => {
    const localReason = JSON.parse(
      getItem('gated.churn.reason', 'local') ?? null,
    );
    const reasonText = CHURN_REASON_LABELS[localReason.churnReason];
    const localExperience = JSON.parse(
      getItem('gated.churn.experience', 'local') ?? null,
    );
    const experienceText = localExperience?.experienceText || '';
    onSubmit(reasonText, experienceText);
    resetLocal();
  };

  const contentProps: ChurnQuestionnaireContentProps = {
    leastDestructiveRef: focusRef,
    next,
    close,
    back,
  };

  let view;
  switch (step) {
    case 1:
      view = <ChurnReasonFormik {...contentProps} back={undefined} />;
      break;
    case 2:
      view = <ChurnExperienceFormik {...contentProps} />;
      break;
    case 3:
      view = <ChurnContinueContent {...contentProps} next={submit} />;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      size={'xl'}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      initialFocusRef={focusRef}
    >
      <ModalOverlay />
      {view}
    </Modal>
  );
};
