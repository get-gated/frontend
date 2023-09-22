import React from 'react';
import { FaqAccordionItem } from '@components/faq-accordion-item';
import { useAtomValue } from 'jotai';
import { dataAtom } from '../../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';

export const FaqAfterExemption = () => {
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;
  return (
    <FaqAccordionItem
      question={`If I request exemption from a donation, what happens?`}
      answer={`Please only request a donation exemption if you know ${data.firstName}
                or they are expecting to hear from you. Once you make the request, ${data.firstName} 
                is informed and they must approve your request before your message is delivered. 
                If your requests are repeatedly denied, you may lose the opportunity to have future
                messages delivered to all Gated users.`}
    />
  );
};
