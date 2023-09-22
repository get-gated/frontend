import {
  Icon,
  Text,
  Textarea,
  TextareaProps,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { IoDocumentTextOutline as NoteIcon } from 'react-icons/io5';
import React, { memo } from 'react';

export const PersonalizedNote = memo<TextareaProps>((props) => (
  <VStack w="full">
    <HStack w="full">
      <Icon as={NoteIcon} />
      <Text textStyle="label">Add a note</Text>
    </HStack>
    <Textarea {...props} />
  </VStack>
));
