import React from 'react';
import { FaqAccordionItem } from '@components/faq-accordion-item';
import { useAtomValue } from 'jotai';
import { dataAtom } from '../../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';

export const FaqDonationsWork = () => {
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;
  return (
    <FaqAccordionItem
      question="How do donations work with Gated?"
      answer={
        <>
          70% of your payment to reach {data.firstName} is sent (via Our Change{' '}
          Foundation) to {data.firstName}&apos;s personally-selected nonprofit:{' '}
          {data.nonprofitName}. The remainder covers fees and supports Gated as
          a free service.
        </>
      }
    />
  );
};
