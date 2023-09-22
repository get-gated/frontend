import { useRouter } from 'next/router';
import { useAnalytics } from '@gated/app';
import { useEffect } from 'react';
import { ExperimentConfig } from './middleware';

export function useVariant<VariantTypes>(
  experimentConfig: ExperimentConfig,
): VariantTypes {
  const router = useRouter();
  const { page } = useAnalytics();
  const variant = router.query.variant as string;
  useEffect(() => {
    page(experimentConfig.route, {
      experimentVariant: `${experimentConfig.name}/${variant}`,
    });
  }, []);

  return variant as VariantTypes;
}
