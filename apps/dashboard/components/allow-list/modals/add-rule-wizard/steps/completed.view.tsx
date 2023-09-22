import { Button, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { IoIosColorWand as WandIcon } from 'react-icons/io';
import React from 'react';
import { useTrain } from '../use-add-rule-wizard.hook';

export const StepsCompleted = () => {
  const { onDone } = useTrain();
  return (
    <VStack mt="10" spacing="4" shouldWrapChildren>
      <Icon as={WandIcon} boxSize={10} color="primary.500" />
      <Heading>Success!</Heading>
      <Text>
        Gated is now customized and is actively using your new training.
      </Text>
      <Button
        size="sm"
        variant="outline"
        verticalAlign="baseline"
        onClick={onDone}
      >
        Done
      </Button>
    </VStack>
  );
};
