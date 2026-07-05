<script setup lang="ts">
import { newsQuery } from '@/data/screener.queries';

const { data, isLoading, ticker } = newsQuery();
</script>
<template>
  <aside>
    <h2 class="mb-2 text-lg">News</h2>
    <div v-if="isLoading">Loading...</div>
    <p v-else>{{ ticker }}</p>
  </aside>
</template>
