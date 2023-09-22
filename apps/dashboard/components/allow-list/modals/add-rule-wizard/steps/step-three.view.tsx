import { Button, HStack, Stack, Tag, Text } from '@chakra-ui/react';
import React from 'react';
import { Step } from '../components/step.component';
import { StepContent } from '../components/step-content.component';
import { useTrain } from '../use-add-rule-wizard.hook';
import { RuleTag } from '@components/rule-tag';

export const StepThreeView = () => {
  const { onSave, onPrev, address, rule, error, loading } = useTrain();
  return (
    <Step title="Review & apply">
      <StepContent>
        <Stack shouldWrapChildren spacing="4">
          <Text>
            Great! We have all the information we need to make Gated work even
            better for you. Please make sure everything looks correct.
          </Text>
          <Stack direction="column" spacing={2}>
            <Text fontWeight="bold">New Rule:</Text>
            <Text fontSize="md" pb={2}>
              <RuleTag rule={rule} /> all new message from{' '}
              <Tag fontSize="md" colorScheme="gray">
                {address.username || '*'}@{address.domain}
              </Tag>
            </Text>
          </Stack>

          {error && (
            <>
              <Text>Oh No!</Text>
              <Text>{error.message}</Text>
            </>
          )}

          <HStack>
            <Button
              size="sm"
              onClick={onPrev}
              variant="ghost"
              disabled={loading}
            >
              Back
            </Button>
            <Button
              size="sm"
              onClick={onSave}
              isLoading={loading}
              disabled={loading}
            >
              Save
            </Button>
          </HStack>
        </Stack>
      </StepContent>
    </Step>
  );
};
