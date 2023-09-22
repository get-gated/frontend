import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import { InputControl } from 'formik-chakra-ui';
import React from 'react';
import { Address } from '../use-steps.hook';
import { TrainingType } from '../add-rule-wizard.enums';
import { useTrain } from '../use-add-rule-wizard.hook';
import { Step } from '../components/step.component';
import { StepContent } from '../components/step-content.component';
import { RuleRadioGroup } from '../../../components/rule-radio-group.component';
import { RuleEnum } from '@gated/graphql-types';

type FormValues = Address;

const domainRegEx =
  /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;

export const StepTwoView = () => {
  const { onPrev, onNext, type, rule, onRuleChange, address, onAddressChange } =
    useTrain();

  const isDomain = type === TrainingType.Domain;

  let typeNoun, typeDemonstrative;
  if (isDomain) {
    typeNoun = 'domain';
    typeDemonstrative = 'these senders';
  } else {
    typeNoun = 'address';
    typeDemonstrative = 'this sender';
  }

  const initialValues = {
    username: address.username || '',
    domain: address.domain || '',
  };

  const yupSchema: { [key in keyof FormValues]: any } = {
    domain: Yup.string()
      .matches(domainRegEx, 'Invalid Domain')
      .required('Domain is required.'),
    username: Yup.string(),
  };

  if (!isDomain) {
    yupSchema.username = Yup.string().required('Address Required');
  }

  const save = (values) => {
    onAddressChange(values);
    onNext();
  };

  return (
    <Step title="Create the rule">
      <Formik
        initialValues={{ initialValues }}
        validationSchema={Yup.object(yupSchema)}
        onSubmit={save}
      >
        {({ handleSubmit }) => (
          <StepContent>
            <form onSubmit={handleSubmit}>
              <Stack shouldWrapChildren spacing="4">
                <Text>
                  What is the {typeNoun} you want to creat a rule for, and what
                  rule should be applied when you receive new messages from{' '}
                  {typeDemonstrative}?
                </Text>
                <HStack pb={3}>
                  <>
                    <InputControl
                      name="username"
                      errorMessageProps={{ position: 'absolute' }}
                      inputProps={{
                        isDisabled: isDomain,
                        placeholder: isDomain ? 'everyone' : 'joe.smith',
                      }}
                      width="180"
                    />
                    <Text>@</Text>
                    <InputControl
                      name="domain"
                      errorMessageProps={{
                        position: 'absolute',
                        fontSize: 'xs',
                      }}
                      inputProps={{
                        placeholder: 'company.com',
                      }}
                      width="180"
                    />
                  </>
                </HStack>
                <RuleRadioGroup
                  value={rule}
                  onChange={(value) => onRuleChange(value as RuleEnum)}
                />
                <HStack>
                  <Button
                    size="sm"
                    onClick={onPrev}
                    variant="ghost"
                    colorScheme="gray"
                  >
                    Back
                  </Button>
                  <Button size="sm" onClick={() => handleSubmit()}>
                    Next
                  </Button>
                </HStack>
              </Stack>
            </form>
          </StepContent>
        )}
      </Formik>
    </Step>
  );
};
