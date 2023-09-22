import React from 'react';
import { FaqAccordionItem } from '@components/faq-accordion-item';
import { useAtomValue } from 'jotai';
import { dataAtom } from '../../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';

export const FaqDonationSize = () => {
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;
  return (
    <FaqAccordionItem
      question="Does the size of my donation affect whether I get a response?"
      answer={
        <>
          Response rates are high on average because Gated inboxes only contain
          emails from known senders or those (like you) who make a donation.
          When you make a donation, {data.firstName} will be notified of the
          amount and will definitely see your email, though a response
          isn&apos;t guaranteed. Average reply rate<sup>†</sup> for messages
          with a donation was 46% but this varies by user. Larger donations do
          drive slightly higher response rates, with donations &gt; $15 seeing
          reply rates average above 50%
          <sup>†</sup>.
        </>
      }
    />
  );
};
