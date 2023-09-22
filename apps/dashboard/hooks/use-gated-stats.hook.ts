import { ApolloError, gql } from '@apollo/client';
import { useGatedStatsQuery } from '@gated/graphql-types';

const FRAGMENT_VOLUME_STAT_FIELDS = gql`
  fragment VolumeStatFields on VolumeStat {
    id
    gatedMessages
    receivedMessages
  }
`;

gql`
  ${FRAGMENT_VOLUME_STAT_FIELDS}
  query gatedStats {
    stats {
      lastThirtyDays {
        totalCount
        gatedCount
      }
      previousThirtyDays {
        totalCount
        gatedCount
      }
    }
  }
`;

export interface IGatedStat {
  total: number;
  delta?: number;
}

export interface IGatedHistory {
  received: number[];
  gated: number[];
  months: Date[];
}

export interface IUseGatedStatsReturn {
  received?: IGatedStat;
  gated?: IGatedStat;
  percentGated?: IGatedStat;
  loading: boolean;
  error?: ApolloError;
}

export const useGatedStats = (): IUseGatedStatsReturn => {
  const { data, error, loading } = useGatedStatsQuery({});

  let received: IGatedStat,
    gated: IGatedStat,
    percentGated: IGatedStat,
    history: IGatedHistory;

  const percentage = (gated: number, total: number): number | void => {
    if (!total || total === 0) return;
    return gated / total;
  };

  const delta = (previous: number, current: number) => {
    if (!previous) return;
    return (current - previous) / previous;
  };

  if (data) {
    const { lastThirtyDays: last, previousThirtyDays: prev } = data.stats;
    const previousPercentGated =
      percentage(prev.gatedCount, prev.totalCount) || 0;
    const currentPercentGated =
      percentage(last.gatedCount, last.totalCount) || 0;

    percentGated = {
      total: currentPercentGated,
      delta: delta(previousPercentGated, currentPercentGated),
    };

    received = {
      total: last.totalCount,
      delta: delta(prev.totalCount, last.totalCount),
    };

    gated = {
      total: last.gatedCount,
      delta: delta(prev.gatedCount, last.gatedCount),
    };

    return { error, loading, percentGated, received, gated };
  }

  return { error, loading };
};
