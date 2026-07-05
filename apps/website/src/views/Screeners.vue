<script setup lang="ts">
import { fivePillarsQuery, highestGainersQuery, newsQuery } from '@/data/screener.queries';
import { computed } from 'vue';
import TableScreener from '@/components/TableScreener.vue';
import type { ScreenerRow } from '../../../api/main';
import TickerNews from '@/components/TickerNews.vue';

const { ticker } = newsQuery();
const { data, isLoading } = fivePillarsQuery();
const { data: gainersData, isLoading: isGainersLoading } = highestGainersQuery();

const loading = computed(() => isLoading.value || isGainersLoading.value);

function handleRowClick(row: ScreenerRow) {
  ticker.value = `${row.exchange}:${row.ticker}`;
}
</script>

<template>
  <main class="m-7">
    <h1 class="mb-4 text-2xl">Day Trading Screeners</h1>

    <div v-if="loading">Loading...</div>
    <div v-else class="grid grid-cols-[4fr_1fr] gap-4">
      <div>
        <h2 class="mb-2 text-lg">Five Pillars</h2>
        <TableScreener
          class="mb-4"
          :data="data as unknown as ScreenerRow[]"
          @rowClick="handleRowClick"
        />

        <h2 class="mb-2 text-lg">Highest Gainers</h2>
        <TableScreener :data="gainersData as unknown as ScreenerRow[]" @rowClick="handleRowClick" />
      </div>

      <TickerNews />
    </div>
  </main>
</template>
