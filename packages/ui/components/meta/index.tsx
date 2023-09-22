import Head from 'next/head';

interface MetaProps {
  title: string;
  description?: string;
  noindex?: boolean;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export const Meta = ({ title, description, noindex, openGraph }: MetaProps) => {
  const ogTitle = openGraph?.title ?? title;
  const ogDescription = openGraph?.description ?? description;
  const ogImage = openGraph?.image ?? '';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {noindex && <meta name="robots" content="noindex" />}

      {/* Facebook Meta Tags */}
      <meta property="og:url" content="" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="" />
      <meta property="twitter:url" content="" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};
