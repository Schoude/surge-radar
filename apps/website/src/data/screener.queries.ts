import { defineQuery, useQuery } from '@pinia/colada';
import type { ScreenerRow } from '../../../api/main';
import { ref } from 'vue';

const API_URL = import.meta.env.VITE_API_URL;

export const QUERY_KEY_SCREENER = {
  root: ['screener'] as const,
  fivePillars: () => [...QUERY_KEY_SCREENER.root, 'five-pillars'] as const,
  highestGainers: () => [...QUERY_KEY_SCREENER.root, 'highest-gainers'] as const,
  news: (ticker: string) => [...QUERY_KEY_SCREENER.root, 'news', ticker] as const,
};

export const fivePillarsQuery = defineQuery({
  key: QUERY_KEY_SCREENER.fivePillars(),
  query: async () => {
    const res = await fetch(`${API_URL}/screener/pillars-momentum`);

    return res.json() as unknown as ScreenerRow[];
  },
  placeholderData: [],
});

export const highestGainersQuery = defineQuery({
  key: QUERY_KEY_SCREENER.highestGainers(),
  query: async () => {
    const res = await fetch(`${API_URL}/screener/highest-gainers`);

    return res.json() as unknown as ScreenerRow[];
  },
  placeholderData: [],
});

export const newsQuery = defineQuery(() => {
  const ticker = ref('');

  const { data, isLoading } = useQuery({
    key: () => QUERY_KEY_SCREENER.news(ticker.value),
    query: async () => {
      const res = await fetch(`${API_URL}/news/${ticker.value}`);

      return res.json() as unknown as ScreenerRow[];
    },
    placeholderData: [],
    enabled: () => ticker.value !== '',
  });

  return {
    ticker,
    data,
    isLoading,
  };
});
