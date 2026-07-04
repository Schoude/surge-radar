import { defineQuery } from '@pinia/colada';
import type { ScreenerRow } from '../../../api/main';

const QUERY_KEY_SCREENER = {
  root: ['screener'] as const,
  fivePillars: () => [...QUERY_KEY_SCREENER.root, 'five-pillars'] as const,
  highestGainers: () => [...QUERY_KEY_SCREENER.root, 'highest-gainers'] as const,
};

export const fivePillarsQuery = defineQuery({
  key: QUERY_KEY_SCREENER.fivePillars(),
  query: async () => {
    const res = await fetch('http://localhost:8000/screener/pillars-momentum');

    return res.json() as unknown as ScreenerRow[];
  },
  placeholderData: [],
});

export const highestGainersQuery = defineQuery({
  key: QUERY_KEY_SCREENER.highestGainers(),
  query: async () => {
    const res = await fetch('http://localhost:8000/screener/highest-gainers');

    return res.json() as unknown as ScreenerRow[];
  },
  placeholderData: [],
});
