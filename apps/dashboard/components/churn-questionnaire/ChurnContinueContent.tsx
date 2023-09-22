import React from 'react';
import { Heading, VStack } from '@chakra-ui/react';

import { QuestionnaireModalContent } from '../questionnaire-modal-content';
import { ChurnQuestionnaireContentProps } from './ChurnQuestionnaire.types';

export const ChurnContinueContent = ({
  leastDestructiveRef,
  close,
  next,
  back,
}: ChurnQuestionnaireContentProps) => {
  const body = (
    <VStack gap={2} align={'left'} pb={10}>
      <Heading size="sm" pb={4}>
        You are about to permanently delete your Gated account (including all
        linked accounts). This action cannot be undone.
      </Heading>
      <Heading size="sm">
        <b>Are you sure you want to continue?</b>
      </Heading>
    </VStack>
  );

  return (
    <QuestionnaireModalContent
      stepText={'3/3'}
      modalHeader={'Delete My Gated Account'}
      body={body}
      onClose={close}
      onLeft={back}
      onRight={next}
      rightText={'Yes, delete account'}
      rightMobileText={'Yes, delete'}
      rightChevron={false}
      leastDestructiveRef={leastDestructiveRef}
      rightScheme={'destroy'}
    />
  );
};
