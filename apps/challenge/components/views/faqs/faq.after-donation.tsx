import React from 'react';
import { FaqAccordionItem } from '@components/faq-accordion-item';
import { useAtomValue } from 'jotai';
import { dataAtom } from '../../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';

export const FaqAfterDonation = () => {
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;
  return (
    <FaqAccordionItem
      question="What happens when I make a donation?"
      answer={
        <>
          Once you complete your payment, your email will immediately be moved
          to {data.firstName}&apos;s inbox. If it is relevant to them and they
          reply, future messages will arrive directly in their inbox.
        </>
      }
    />
  );
};
