import {
  NonprofitNotFound,
  NonprofitPage as NonprofitDetails,
} from '../components';

import { useApi } from '@gated/app/hooks';
import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { nonprofitAtom } from '@components/Nonprofits.store';
import { Spinner } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

const NonprofitPage = ({ slug }: { slug: string }) => {
  const [call, { data, loading, error }] = useApi(
    `/api/nonprofits/${slug.toLowerCase()}`,
  );
  const setNonprofit = useSetAtom(nonprofitAtom as any);

  useEffect(() => {
    if (!data) return;
    setNonprofit(data);
  }, [data]);

  useEffect(() => {
    call();
  }, []);

  if (error) {
    return <NonprofitNotFound />;
  }

  if (loading || !data) {
    return <Spinner />;
  }

  return <NonprofitDetails />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;
  const slug = params.slug;
  return {
    props: { slug },
  };
};

export default NonprofitPage;
