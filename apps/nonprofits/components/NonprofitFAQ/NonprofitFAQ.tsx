import { atom, useAtom } from 'jotai';
import React from 'react';

import {
  Root,
  Container,
  Question,
  Copy,
  Wrapper,
} from './NonprofitFAQ.styled';

interface QuestionAnswerProps {
  question: string;
  answer: string;
  excerpt: string;
}

const isExpandedAtom = atom(false);

const QuestionAnswer = ({ question, excerpt, answer }: QuestionAnswerProps) => {
  const [isExpanded, setIsExpanded] = useAtom(isExpandedAtom);
  return (
    <Container>
      <Question>{question}</Question>
      <Wrapper>
        <Copy>{isExpanded ? answer : excerpt}</Copy>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'See less' : 'See more'}
        </button>
      </Wrapper>
    </Container>
  );
};

export const NonprofitFAQ = () => {
  return (
    <Root>
      <QuestionAnswer
        question="How does Gated raise money and awareness for nonprofits?"
        answer="Gated challenges unknown email senders to donate in order to reach your inbox. 70% of every donation to reach your inbox goes directly to your charity of choice, via Change (change.io). The remainder covers the costs and fees used to provide Gated as a free service for everyone. We are always looking to lower Gated's costs and pass on more of your donations to nonprofits. For more information see our FAQ."
        excerpt="Gated challenges unknown email senders to donate in order to reach your inbox. 70% of every donation goes to the nonprofit of your choice."
      />
    </Root>
  );
};
