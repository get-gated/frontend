import React from 'react';
import { FaqAccordionItem } from '@components/faq-accordion-item';
import { useAtomValue } from 'jotai';
import { dataAtom } from '../../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';

export const FaqReceiveChallenge = () => {
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;
  return (
    <FaqAccordionItem
      question={`Why was my message to ${data.firstName} not delivered?`}
      answer={`${data.firstName} is using Gated to automatically keep messages from unknown senders out of their inbox.  
               Your email “${data.senderEmail}” is not an address that ${data.firstName} recognized, so you’ll have to take 
               one more action to reach their inbox.  You can move your message to the inbox by making a donation 
               to ${data.firstName}’s chosen nonprofit.  If they are expecting your message or you know them personally,
               you may bypass the donation.
              `}
    />
  );
};
