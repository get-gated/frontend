import { Accordion, Box, Heading } from '@chakra-ui/react';
import { FaqReceiveChallenge } from '@components/views/faqs/faq.receive-challenge';
import { FaqDonationsWork } from '@components/views/faqs/faq.donations-work';
import { FaqDonationSize } from '@components/views/faqs/faq.donation-size';
import { FaqAfterDonation } from '@components/views/faqs/faq.after-donation';
import { FaqAfterExemption } from '@components/views/faqs/faq.after-exemption';
import React, { useMemo, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { dataAtom } from '../../../store';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';
import { useAnalytics } from '@gated/app';

export function FrequentlyAskedQuestions() {
  const data = useAtomValue(dataAtom) as IUseSenderChallengeResponse;

  const { track } = useAnalytics();

  const expandedItems = useRef([]);

  const accordionItems = useMemo(() => {
    let items = [
      { name: 'HOW_DONATIONS_WORK', view: <FaqDonationsWork /> },
      { name: 'DONATION_SIZE', view: <FaqDonationSize /> },
      { name: 'AFTER_DONATION', view: <FaqAfterDonation /> },
      { name: 'AFTER_BYPASS', view: <FaqAfterExemption /> },
    ];

    if (!(data.hasDonation || data.hasExpected)) {
      items = [
        { name: 'NOT_DELIVERED', view: <FaqReceiveChallenge /> },
        ...items,
      ];
    }
    return items;
  }, [data]);

  const accordionChange = (expandedIndexes: number[]) => {
    expandedIndexes.forEach((i) => {
      if (expandedItems.current.includes(i)) return;
      expandedItems.current = [i, ...expandedItems.current];
      track('challenge_faq_viewed', { faq: accordionItems[i].name });
    });
  };

  return (
    <Box alignItems="start" pt="16">
      <Heading size={{ base: 'md', lg: 'lg' }} color="muted">
        Frequently Asked Questions
      </Heading>
      <Accordion allowMultiple onChange={accordionChange}>
        {accordionItems.map(({ view, name }) => (
          <React.Fragment key={name}>{view}</React.Fragment>
        ))}
      </Accordion>
    </Box>
  );
}
