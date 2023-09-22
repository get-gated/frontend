import React, { useEffect, useState } from 'react';

import { Heading, VStack } from '@chakra-ui/react';

import { TextareaControl } from 'formik-chakra-ui';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { QuestionnaireModalContent } from '../questionnaire-modal-content';
import { ChurnQuestionnaireContentProps } from './ChurnQuestionnaire.types';
import { useStorage } from '@gated/app/hooks';

interface ChurnExperienceValues {
  experienceText: string;
}

export const ChurnExperienceContent = ({
  leastDestructiveRef,
  close,
  back,
}: ChurnQuestionnaireContentProps) => {
  const { values } = useFormikContext<ChurnExperienceValues>();
  const [characterCount, setCharacterCount] = useState(0);

  const isDisabled = !values.experienceText;

  useEffect(() => {
    setCharacterCount(values.experienceText.length);
  }, [values]);

  const body = (
    <VStack align={'left'} gap={2}>
      <TextareaControl
        name="experienceText"
        textareaProps={{
          size: 'md',
          placeholder: 'Tell us about your experience with Gated...',
        }}
      />
      <Heading size={'xs'} fontWeight={'light'}>
        {characterCount}/500 characters
      </Heading>
    </VStack>
  );

  return (
    <QuestionnaireModalContent
      stepText={'2/3'}
      modalHeader={'Delete My Gated Account'}
      heading="Please share any other feedback on why Gated didn't work for you and how we could improve:"
      body={body}
      onClose={close}
      leastDestructiveRef={leastDestructiveRef}
      onLeft={back}
      rightDisabled={isDisabled}
    />
  );
};

export const ChurnExperienceFormik = (
  props: ChurnQuestionnaireContentProps,
) => {
  const { next } = props;

  const { getItem, setItem } = useStorage();
  const localExperience = JSON.parse(
    getItem('gated.churn.experience', 'local') ?? null,
  );

  const initialValues: ChurnExperienceValues = localExperience ?? {
    experienceText: '',
  };

  const validationSchema = Yup.object({
    experienceText: Yup.string().max(500, 'Please enter up to 500 characters.'),
  });

  const submit = (values: ChurnExperienceValues) => {
    setItem('gated.churn.experience', JSON.stringify(values), 'local');
    next();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      <Form>
        <ChurnExperienceContent {...props} />
      </Form>
    </Formik>
  );
};
