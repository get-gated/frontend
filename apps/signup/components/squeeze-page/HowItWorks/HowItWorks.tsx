/* eslint-disable react/no-children-prop */
import { Box, Container, Heading, Spacer } from '@chakra-ui/react';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { useAtomValue } from 'jotai';

import sectionInboxImage from '@assets/images/squeeze-page/gated-inbox.svg';
import sectionAllowListImage from '@assets/images/squeeze-page/labels.svg';
import sectionChallengeEmailImage from '@assets/images/squeeze-page/challenge.svg';
import { colorModeAtom, viewportAtom } from '@/store';
import { Section } from '../Section';

import { Callout, Root } from './HowItWorks.styled';
import arrowSquiggle from './assets/arrow-squiggle.svg';
import arrowCallout from './assets/arrow-callout.svg';

const sectionInboxBody = `
* See those messages anytime - or not at all 
* Works in your existing inbox (nothing to download)
* ~43% reduction in inbox volume, on average
`;

const sectionAllowListBody = `
* Simply drag and drop to update the list of people who can reach you
* Allow any domain you trust
`;

const sectionChallengeEmailBody = `
* Anyone that's not on your Allow List will get an automatic reply that gives them a choice to donate
* If they know you personally, they can bypass the donation
`;

const calloutText = `You choose the nonprofit, donation amount, and text of this **custom, automated** message `;

export const HowItWorks = () => {
  const colorMode = useAtomValue(colorModeAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = { colorMode, viewport };

  return (
    <Root>
      <Container>
        <Box scrollSnapAlign="start" pt="100px">
          <Heading size="xl" as="h2">
            How it works
          </Heading>
          <Image
            src={arrowSquiggle.src}
            width={arrowSquiggle.width}
            height={arrowSquiggle.height}
            alt=""
          />
          <Box scrollSnapAlign={{ base: 'start', md: 'initial' }} pt="100px">
            <Section
              heading="### Emails from people you don't know skip your inbox and go to your **Gated folder**."
              body={sectionInboxBody}
              image={sectionInboxImage}
              imageAlt=""
              alignment="right"
            />
          </Box>
        </Box>
        <Spacer height={48} />
        <Box scrollSnapAlign="start" pt="100px">
          <Section
            heading="### Your **Allow List** is created automatically from people you know"
            body={sectionAllowListBody}
            image={sectionAllowListImage}
            imageAlt=""
          />
        </Box>
        <Spacer height={48} />
        <Box scrollSnapAlign="start" pt="100px">
          <Section
            heading="### People you don't know can donate to your **Chosen Nonprofit** in order to reach you."
            body={sectionChallengeEmailBody}
            image={sectionChallengeEmailImage}
            imageAlt=""
            alignment="right"
          />
        </Box>
        <Box scrollSnapAlign="end" pb="100px">
          <Callout {...styledBaseProps}>
            <Image
              src={arrowCallout.src}
              width={arrowCallout.width}
              height={arrowCallout.height}
              alt=""
            />

            <Spacer height={8} />
            <Markdown className="callout-text" children={calloutText} />
          </Callout>
        </Box>
      </Container>
    </Root>
  );
};
