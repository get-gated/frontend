import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Text,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface FaqAccordionItemProps {
  question: string | ReactNode;
  answer: string | ReactNode;
}

export const FaqAccordionItem = ({
  question,
  answer,
}: FaqAccordionItemProps) => (
  <AccordionItem mt={5}>
    <AccordionButton>
      <Text size="sm" color="subtle">
        {question}
      </Text>

      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel pb={4}>{answer}</AccordionPanel>
    <Divider borderColor="gray.100" />
  </AccordionItem>
);
