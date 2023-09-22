import Head from 'next/head';
import { useApi } from '@gated/app/hooks';
import { useEffect } from 'react';
import { useApp } from '@gated/app';

const AllNonprofitsPage = () => {
  const [call, { data, loading, error }] = useApi(`/api/nonprofits`);
  const { config } = useApp();
  useEffect(() => {
    call();
  }, []);
  if (error) return <>An error occurred</>;
  if (loading || !data) return <>Loading...</>;

  const urls = data.map(
    (nonprofit) => `${config.origin}/nonprofits/${nonprofit.slug}`,
  );

  return (
    <div>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <ul>
        {urls.map((url) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noreferrer">
              {url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllNonprofitsPage;
