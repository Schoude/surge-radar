<script setup lang="ts">
import { fivePillarsQuery, highestGainersQuery } from '@/data/screener.queries';
import { computed } from 'vue';
import TableScreener from '@/components/TableScreener.vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ScreenerRow } from '../../../api/main';

const { data, isLoading } = fivePillarsQuery();
const { data: gainersData, isLoading: isGainersLoading } = highestGainersQuery();

const loading = computed(() => isLoading.value || isGainersLoading.value);

function handleRowClick(row: ScreenerRow) {
  console.log('Row clicked:', row);
}
</script>

<template>
  <main class="m-10">
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
      <div>
        <h2 class="mb-2 text-lg">News</h2>
      </div>
    </div>
  </main>
</template>
