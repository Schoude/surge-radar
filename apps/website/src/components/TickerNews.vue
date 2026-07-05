<script setup lang="ts">
import { newsQuery } from '@/data/screener.queries';
import {
  ItemGroup,
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemMedia,
} from '@/components/ui/item';
import Button from './ui/button/Button.vue';
import { HugeiconsIcon } from '@hugeicons/vue';
import { Share01Icon, FlashIcon } from '@hugeicons/core-free-icons';

const { data, isLoading, ticker } = newsQuery();

function formatDate(epochSeconds: number): string {
  const epochMilliseconds = epochSeconds * 1000;
  // @ts-expect-error - not yet in TS
  const instant = Temporal.Instant.fromEpochMilliseconds(epochMilliseconds);
  const zonedDateTime = instant.toZonedDateTimeISO('Europe/Berlin');
  const formattedDate = zonedDateTime.toLocaleString('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  return formattedDate;
}
</script>
<template>
  <aside>
    <h2 class="mb-2 text-lg">News for {{ ticker }}</h2>
    <div v-if="isLoading">Loading...</div>

    <ItemGroup v-else>
      <Item v-for="item in data?.items" :key="item.id" variant="outline">
        <ItemContent>
          <ItemTitle>
            <HugeiconsIcon
              v-if="item.is_flash"
              class="shrink-0 text-purple-400"
              :icon="FlashIcon"
              :size="18"
              :strokeWidth="1.5"
            />
            {{ item.title }}
            <Button
              v-if="item.link"
              as="a"
              :href="item.link"
              target="_blank"
              rel="noopener noreferer"
              size="icon"
              variant="link"
            >
              <HugeiconsIcon :icon="Share01Icon" :strokeWidth="1.5" />
            </Button>
          </ItemTitle>
          <ItemDescription>
            @ {{ formatDate(item.published) }} by {{ item.provider.name }}
          </ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  </aside>
</template>
