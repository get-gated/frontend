import { CSSProperties } from 'react';

export type GatedClientLogo = {
  caption: string;
  image: string;
  // TODO: Following props will be implemented later when time allows...
  url?: string;
  style?: CSSProperties;
};

export const logos: Array<GatedClientLogo> = [
  {
    caption: 'Branch',
    image: '/images/logos/branch.png',
    url: '',
  },
  {
    caption: 'Calendly',
    image: '/images/logos/calendly.png',
    url: '',
  },

  {
    caption: 'Culture Amp',
    image: '/images/logos/culture-amp.png',
    url: '',
  },
  {
    caption: 'Demandbase',
    image: '/images/logos/demandbase.png',
    url: '',
  },
  {
    caption: 'G2',
    image: '/images/logos/g2.png',
    url: '',
  },
  {
    caption: 'gorgias',
    image: '/images/logos/gorgias.png',
    url: '',
  },
  {
    caption: 'Hootsuite',
    image: '/images/logos/hootsuite.png',
    url: '',
  },
  {
    caption: 'Groove',
    image: '/images/logos/groove.png',
    url: '',
  },

  {
    caption: 'Kiss Metrics',
    image: '/images/logos/kissmetrics.png',
    url: '',
  },
  {
    caption: 'LeanData',
    image: '/images/logos/leandata.png',
    url: '',
  },
  {
    caption: 'metadata.io',
    image: '/images/logos/metadata.png',
    url: '',
  },
  {
    caption: 'Postscript',
    image: '/images/logos/postscript.png',
    url: '',
  },
  {
    caption: 'Sendoso',
    image: '/images/logos/sendoso.png',
    url: '',
  },
  {
    caption: 'Chili',
    image: '/images/logos/chili.png',
    url: '',
  },
  {
    caption: 'Spekit',
    image: '/images/logos/spekit.png',
    url: '',
  },
  {
    caption: 'Syncari',
    image: '/images/logos/syncari.png',
    url: '',
  },
  {
    caption: 'ThoughtSpot',
    image: '/images/logos/thoughtspot.png',
    url: '',
  },
];
