import React from 'react';
import Head from 'next/head';
import { useAtomValue } from 'jotai';

import { slugify } from '@gated/utils';

import { colorModeAtom, nonprofitAtom } from './Nonprofits.store';

export const NonprofitMeta = () => {
  const nonprofit = useAtomValue(nonprofitAtom);
  const colorMode = useAtomValue(colorModeAtom);
  const isDev = Boolean(
    typeof window !== 'undefined' && window.location.hostname === 'localhost',
  );

  if (!nonprofit) return null;

  return (
    <Head>
      {/* HTML Meta Tags */}
      <title>{`Use Gated to Support ${nonprofit.name}`}</title>
      <meta
        name="description"
        content={`Use Gated to raise money and awareness for ${nonprofit.name}`}
      />

      {/* Facebook Meta Tags */}
      <meta
        property="og:url"
        content={`https://www.gated.com/nonprofits/${slugify(nonprofit.name)}`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`Use Gated to Support ${nonprofit.name}`}
      />
      <meta
        property="og:description"
        content={`Use Gated to raise money and awareness for ${nonprofit.name}`}
      />
      <meta
        property="og:image"
        content={
          isDev
            ? `./images/nonprofits/og-default.jpg`
            : `/nonprofits/images/nonprofits/og-default.jpg`
        }
      />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="gated.com" />
      <meta
        property="twitter:url"
        content={`https://www.gated.com/nonprofits/${slugify(nonprofit.name)}`}
      />
      <meta
        name="twitter:title"
        content={`Use Gated to Support ${nonprofit.name}`}
      />
      <meta
        name="twitter:description"
        content={`Use Gated to raise money and awareness for ${nonprofit.name}`}
      />
      <meta
        name="twitter:image"
        content={
          isDev
            ? `./images/nonprofits/og-default.jpg`
            : `/nonprofits/images/nonprofits/og-default.jpg`
        }
      />

      {/* Favicons */}
      <link
        rel="icon"
        href={
          isDev
            ? `./images/favicon/${colorMode}/favicon.ico`
            : `/nonprofits/images/favicon/${colorMode}/favicon.ico`
        }
      />
      <link
        rel="icon"
        href={
          isDev
            ? `./images/favicon/${colorMode}/favicon-32x32.png`
            : `/nonprofits/images/favicon/${colorMode}/favicon-32x32.png`
        }
        sizes="32x32"
        type="image/png"
      />
      <link
        rel="icon"
        href={
          isDev
            ? `./images/favicon/${colorMode}/favicon-16x16.png`
            : `/nonprofits/images/favicon/${colorMode}/favicon-16x16.png`
        }
        sizes="16x16"
        type="image/png"
      />
    </Head>
  );
};
