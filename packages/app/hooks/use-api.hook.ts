import { useMemo, useState } from 'react';
import * as Sentry from '@sentry/react';
import { useApp } from '../app/use-app.hook';

type ApiResponse<T> = {
  data: T;
  error: any;
  loading: boolean;
};

type IUseApiReturn<T> = [
  (extendFetchOptions?: RequestInit) => Promise<ApiResponse<T>>,
  ApiResponse<T>,
  string,
];

export const useApi = <T = any>(
  endpoint: string,
  fetchOptions: RequestInit = {},
): IUseApiReturn<T> => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { config } = useApp();
  const url = useMemo(() => {
    if (!config) return '';
    return `${config.apiOrigin}${endpoint}`;
  }, [config, endpoint]);
  const execute = async (extendFetchOptions: RequestInit = {}) => {
    if (!config) {
      await new Promise((res) => setTimeout(() => res, 25));
      return execute(extendFetchOptions);
    }

    setData(null);
    setError(null);
    setLoading(true);

    let fetchData, fetchError;
    try {
      const res = await fetch(
        url,
        Object.assign({}, fetchOptions, extendFetchOptions),
      );
      const json = await res.json();
      if (!res.ok) {
        fetchError = json;
      } else {
        fetchData = json;
      }
    } catch (error) {
      Sentry.captureException(error);
      fetchError = error;
    } finally {
      setLoading(false);
      setError(fetchError);
      setData(fetchData);
    }
    return { data: fetchData, error: fetchError };
  };

  return [execute, { data, loading, error }, url];
};
