/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Spacer } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import { slugify } from '@gated/utils';
import { nonprofitAtom, styledBasePropsAtom } from '../Nonprofits.store';
import { Background, Container, Content, Root } from './NonprofitHero.styled';
import { Text } from '@chakra-ui/react';

const FEATURED_NONPROFITS = [
  'athlead-indy',
  'big-brothers-big-sisters',
  'citizens-of-our-planet',
  'david-sheldrick-wildlife-trust',
  'doctors-without-borders',
  'every-kid-sports',
  'headstrong-project',
  'planned-parenthood',
  'save-the-waves',
  'world-central-kitchen',
  'femtech-focus',
  'bright-water-foundation',
  'period',
];

const getHeroImage = (nonprofit) => {
  const isDev = Boolean(
    typeof window !== 'undefined' && window.location.hostname === 'localhost',
  );

  const category = slugify(nonprofit.category.name);

  if (FEATURED_NONPROFITS.includes(nonprofit.slug)) {
    return isDev
      ? `./images/nonprofits/${nonprofit.slug}.jpg`
      : `/nonprofits/images/nonprofits/${nonprofit.slug}.jpg`;
  }

  // Fallback to a category-level default image if not featured...
  return isDev
    ? `./images/categories/${category}.jpg`
    : `/nonprofits/images/categories/${category}.jpg`;
};

interface NonprofitHeroProps {
  explainerSectionRef: any;
}

export const NonprofitHero = ({ explainerSectionRef }: NonprofitHeroProps) => {
  const styledBaseProps = useAtomValue(styledBasePropsAtom);
  const nonprofit = useAtomValue(nonprofitAtom);

  if (!nonprofit) return null;

  const scrollIntoView = () =>
    explainerSectionRef.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <Root {...styledBaseProps}>
      <Container {...styledBaseProps}>
        <Content {...styledBaseProps}>
          <Spacer h={100} />
          <Text as="h1">
            Support <strong>{nonprofit.name}</strong> when you use email
          </Text>
          <h4>
            Gated is a free way to get a quieter inbox - and raise funds and
            awareness for a cause you love.
          </h4>
          <button onClick={scrollIntoView}>Learn How Gated works</button>
          <Spacer h={150} />
          <h3>A cause worth supporting</h3>
          <p>{nonprofit.description}</p>
        </Content>
        <Background {...styledBaseProps}>
          <img src={getHeroImage(nonprofit as any)} alt={nonprofit.name} />
        </Background>
      </Container>
    </Root>
  );
};
