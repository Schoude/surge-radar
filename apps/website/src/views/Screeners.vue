<script setup lang="ts">
import {
  fivePillarsQuery,
  highestGainersQuery,
  newsQuery,
  QUERY_KEY_SCREENER,
} from '@/data/screener.queries';
import { computed, ref } from 'vue';
import TableScreener from '@/components/TableScreener.vue';
import type { ScreenerRow } from '../../../api/main';
import TickerNews from '@/components/TickerNews.vue';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useIntervalFn } from '@vueuse/core';
import { useQueryCache } from '@pinia/colada';
import Button from '@/components/ui/button/Button.vue';
import { storeToRefs } from 'pinia';
import { useScreenersStore } from '@/stores/screeners.store';

const { ticker } = newsQuery();
const { data, isLoading } = storeToRefs(useScreenersStore());
const { data: gainersData, isLoading: isGainersLoading } = highestGainersQuery();

const loading = computed(() => isLoading.value || isGainersLoading.value);

const selectedInterval = ref<number>(15);
const intervalTime = computed(() => selectedInterval.value * 1000);
const { pause, resume, isActive } = useIntervalFn(
  () => {
    const queryCache = useQueryCache();
    void queryCache.invalidateQueries({ key: QUERY_KEY_SCREENER.root });
  },
  intervalTime,
  {
    immediate: true,
    immediateCallback: true,
  },
);

function toggleInterval() {
  if (isActive.value) {
    pause();

    return;
  }

  resume();
}

function handleRowClick(row: ScreenerRow) {
  ticker.value = `${row.exchange}:${row.ticker}`;
}
</script>

<template>
  <main class="m-7">
    <h1 class="mb-4 flex w-full items-center justify-between text-2xl">
      Day Trading Screeners

      <RadioGroup v-model="selectedInterval" :default-value="60" class="inline-flex w-max">
        <Button @click="toggleInterval">{{ isActive ? 'Pause' : 'Resume' }}</Button>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r1" :value="60" />
          <Label for="r1">1m</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r2" :value="30" />
          <Label for="r2">30s</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r3" :value="15" />
          <Label for="r3">15s</Label>
        </div>
      </RadioGroup>
    </h1>

    <div v-if="loading">Loading...</div>
    <div v-else class="grid grid-cols-[4fr_1fr] gap-4">
      <div>
        <h2 class="mb-2 text-lg">Five Pillars</h2>
        <TableScreener
          class="mb-4"
          :data="data as unknown as ScreenerRow[]"
          :selectedTicker="ticker"
          @rowClick="handleRowClick"
        />

        <h2 class="mb-2 text-lg">Highest Gainers</h2>
        <TableScreener
          :data="gainersData as unknown as ScreenerRow[]"
          :selectedTicker="ticker"
          @rowClick="handleRowClick"
        />
      </div>

      <TickerNews />
    </div>
  </main>
</template>
