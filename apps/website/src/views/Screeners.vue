<script setup lang="ts">
import { fivePillarsQuery, highestGainersQuery } from '@/data/screener.queries';
import { computed } from 'vue';
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

const { data, isLoading } = fivePillarsQuery();
const { data: gainersData, isLoading: isGainersLoading } = highestGainersQuery();

const loading = computed(() => isLoading.value || isGainersLoading.value);
</script>

<template>
  <main class="m-10">
    <h1 class="text-2xl">Day Trading Screeners</h1>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <h2 class="text-lg">Five Pillars</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Last ($)</TableHead>
            <TableHead>Pre-Market Change</TableHead>
            <TableHead>Pre-Market Volume</TableHead>
            <TableHead>Float</TableHead>
            <TableHead>Relative Volume (1d)</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in data" :key="item?.ticker">
            <TableCell>
              <div class="flex h-full items-center gap-2">
                <img v-if="item.logoUrl" :src="item.logoUrl" alt="Logo" />
                {{ item.ticker }}
              </div>
            </TableCell>
            <TableCell>{{ item.name }}</TableCell>
            <TableCell>{{ item.close }}</TableCell>
            <TableCell>{{ item.premarketChange }}</TableCell>
            <TableCell>{{ item.premarketVolume }}</TableCell>
            <TableCell>{{ item.float }}</TableCell>
            <TableCell>{{ item.relativeVolume10d }}</TableCell>
            <TableCell>{{ item.sector }}</TableCell>
            <TableCell>
              <div class="flex h-full items-center gap-2">
                <img :src="item.flagUrl" alt="Flag" />
                {{ item.country }}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h2 class="text-lg">Highest Gainers</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Last ($)</TableHead>
            <TableHead>Pre-Market Change</TableHead>
            <TableHead>Pre-Market Volume</TableHead>
            <TableHead>Float</TableHead>
            <TableHead>Relative Volume (1d)</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in gainersData" :key="item?.ticker">
            <TableCell>
              <div class="flex h-full items-center gap-2">
                <img v-if="item.logoUrl" :src="item.logoUrl" alt="Logo" />
                {{ item.ticker }}
              </div>
            </TableCell>
            <TableCell>{{ item.name }}</TableCell>
            <TableCell>{{ item.close }}</TableCell>
            <TableCell>{{ item.premarketChange }}</TableCell>
            <TableCell>{{ item.premarketVolume }}</TableCell>
            <TableCell>{{ item.float }}</TableCell>
            <TableCell>{{ item.relativeVolume10d }}</TableCell>
            <TableCell>{{ item.sector }}</TableCell>
            <TableCell>
              <div class="flex h-full items-center gap-2">
                <img :src="item.flagUrl" alt="Flag" />
                {{ item.country }}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
</template>
