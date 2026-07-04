<script setup lang="ts">
import { PiniaColadaDevtools } from '@pinia/colada-devtools';
import Button from './components/ui/button/Button.vue';
</script>

<template>
  <RouterView />

  <PiniaColadaDevtools />
</template>
