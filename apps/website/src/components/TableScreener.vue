<script setup lang="ts">
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

defineProps<{
  data: ScreenerRow[];
}>();

defineEmits<{
  rowClick: [ScreenerRow];
}>();
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow class="bg-muted">
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
      <TableRow v-for="item in data" :key="item?.ticker" @click="$emit('rowClick', item)">
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
</template>
