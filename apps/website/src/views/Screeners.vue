<script setup lang="ts">
import { fivePillarsQuery, highestGainersQuery } from '@/data/screener.queries';
import { computed } from 'vue';

const { data, isLoading } = fivePillarsQuery();
const { data: gainersData, isLoading: isGainersLoading } = highestGainersQuery();

const loading = computed(() => isLoading.value || isGainersLoading.value);
</script>

<template>
  <h1 class="text-xl">Day Trading Screeners</h1>

  <div v-if="loading">Loading...</div>
  <div v-else>
    <h2>Five Pillars</h2>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <pre>
        {{ item }}
        </pre>
      </li>
    </ul>

    <h2>Highest Gainers</h2>
    <ul>
      <li v-for="(item, index) in gainersData" :key="index">
        <pre>{{ JSON.stringify(item, null, 2) }}</pre>
      </li>
    </ul>
  </div>
</template>
