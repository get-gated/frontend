import React from 'react';

import { Radio } from '@chakra-ui/react';

import { RadioGroupControl } from 'formik-chakra-ui';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';

import { ChurnQuestionnaireContentProps } from './ChurnQuestionnaire.types';
import { QuestionnaireModalContent } from '../questionnaire-modal-content';
import REASON_LABELS from './churn-reason-labels.json';
import { useStorage } from '@gated/app/hooks';

enum ChurnReasonEnum {
  Expectations = 'Expectations',
  Needs = 'Needs',
  Difficulty = 'Difficulty',
  Job = 'Job',
  Other = 'Other',
}

interface ChurnReasonValues {
  churnReason: string;
}

interface ChurnReasonOption {
  value: string;
  label: string;
}

export const ChurnReasonContent = ({
  leastDestructiveRef,
  close,
}: ChurnQuestionnaireContentProps) => {
  const { values } = useFormikContext<ChurnReasonValues>();

  const isDisabled = !values.churnReason;

  const reasonOptions = [
    {
      value: ChurnReasonEnum.Expectations,
      label: REASON_LABELS[ChurnReasonEnum.Expectations],
    },
    {
      value: ChurnReasonEnum.Needs,
      label: REASON_LABELS[ChurnReasonEnum.Needs],
    },
    {
      value: ChurnReasonEnum.Difficulty,
      label: REASON_LABELS[ChurnReasonEnum.Difficulty],
    },
    {
      value: ChurnReasonEnum.Job,
      label: REASON_LABELS[ChurnReasonEnum.Job],
    },
    {
      value: ChurnReasonEnum.Other,
      label: REASON_LABELS[ChurnReasonEnum.Other],
    },
  ];

  const body = (
    <RadioGroupControl
      name="churnReason"
      pl={6}
      stackProps={{
        direction: 'column',
        gap: { base: 4, md: 8 },
      }}
    >
      {reasonOptions.map((reasonOption: ChurnReasonOption) => {
        return (
          <Radio key={reasonOption.value} value={reasonOption.value}>
            {reasonOption.label}
          </Radio>
        );
      })}
    </RadioGroupControl>
  );

  return (
    <QuestionnaireModalContent
      stepText={'1/3'}
      modalHeader={'Delete My Gated Account'}
      heading={
        'We are sorry to see you go. What’s the main reason you want to delete your Gated account? *'
      }
      body={body}
      leastDestructiveRef={leastDestructiveRef}
      onClose={close}
      rightDisabled={isDisabled}
    />
  );
};

export const ChurnReasonFormik = (props: ChurnQuestionnaireContentProps) => {
  const { next } = props;

  const { getItem, setItem } = useStorage();
  const localReason = JSON.parse(
    getItem('gated.churn.reason', 'local') ?? null,
  );

  const initialValues: ChurnReasonValues = localReason ?? {
    churnReason: '',
  };

  const validationSchema = Yup.object({
    churnReason: Yup.string().required('Please select a reason'),
  });

  const submit = (values: ChurnReasonValues) => {
    setItem('gated.churn.reason', JSON.stringify(values), 'local');
    next();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      <Form>
        <ChurnReasonContent {...props} />
      </Form>
    </Formik>
  );
};
