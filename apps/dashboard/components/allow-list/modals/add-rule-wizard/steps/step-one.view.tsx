import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import {
  IoMdBusiness as DomainIcon,
  IoMdPerson as AddressIcon,
} from 'react-icons/io';
import React from 'react';
import { TrainingType } from '../add-rule-wizard.enums';
import { StepContent } from '../components/step-content.component';
import { Step } from '../components/step.component';
import { ButtonRadioGroup } from '../components/button-radio-group.component';
import { useTrain } from '../use-add-rule-wizard.hook';

export const StepOneView = () => {
  const { type, onTypeChange, onNext } = useTrain();
  return (
    <Step title="Select rule type">
      <StepContent>
        <Stack shouldWrapChildren spacing="4">
          <Text>
            Ensure messages from certain senders always (or never!) arrive in
            your inbox. There are two types rules you can create.
          </Text>
          <ButtonRadioGroup
            onChange={(value) => onTypeChange(value as TrainingType)}
            defaultValue={type}
            options={[
              {
                icon: <DomainIcon />,
                label: 'Domain',
                description:
                  'Every sender at the specified domain will be effected. Good for creating rules for an entire organization.',
                value: TrainingType.Domain,
              },
              {
                icon: <AddressIcon />,
                label: 'Address',
                description:
                  'A sender with the specified email address will be effected. Good for creating a rule for a single individual.',
                value: TrainingType.Address,
              },
            ]}
          />
          <HStack>
            <Button size="sm" onClick={onNext}>
              Next
            </Button>
          </HStack>
        </Stack>
      </StepContent>
    </Step>
  );
};
