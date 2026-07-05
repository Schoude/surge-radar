import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { fivePillarsQuery } from '@/data/screener.queries';
import type { ScreenerRow } from '../../apps/api/main';

let newEntryAudio: HTMLAudioElement | null = null;
let gainerAudio: HTMLAudioElement | null = null;

function playAudio(audio: HTMLAudioElement | null, src: string) {
  if (typeof window === 'undefined') {
    return null;
  }

  if (audio == null) {
    const audioElement = new Audio(src);
    audioElement.preload = 'auto';

    return audioElement;
  }

  audio.currentTime = 0;
  void audio.play().catch(() => {
    // Ignore autoplay restrictions in the browser.
  });

  return audio;
}

function playNewEntrySound() {
  if (newEntryAudio == null) {
    newEntryAudio = playAudio(newEntryAudio, '/alerts/new-entry.mp3') as HTMLAudioElement | null;
  }

  if (newEntryAudio != null) {
    void newEntryAudio.play().catch(() => {
      // Ignore autoplay restrictions in the browser.
    });
  }
}

function playGainerSound() {
  if (gainerAudio == null) {
    gainerAudio = playAudio(gainerAudio, '/alerts/gainer.mp3') as HTMLAudioElement | null;
  }

  if (gainerAudio != null) {
    void gainerAudio.play().catch(() => {
      // Ignore autoplay restrictions in the browser.
    });
  }
}

export const useScreenersStore = defineStore('screeners', () => {
  const fivePillarsBefore = ref<ScreenerRow[]>([]);
  const { data, isLoading } = fivePillarsQuery();

  watch(
    () => data.value,
    (newFivePillars) => {
      if (newFivePillars == null) {
        return;
      }

      const previousFivePillars = fivePillarsBefore.value;
      const previousFivePillarsByTicker = new Map(
        previousFivePillars.map((entry) => [entry.ticker, entry]),
      );

      const hasNewEntries =
        previousFivePillars.length > 0 &&
        newFivePillars.some((entry) => !previousFivePillarsByTicker.has(entry.ticker));

      const hasMomentumGainers =
        previousFivePillars.length > 0 &&
        newFivePillars.some((entry) => {
          const previousEntry = previousFivePillarsByTicker.get(entry.ticker);

          return (
            previousEntry != null && entry.premarketChange - previousEntry.premarketChange >= 5
          );
        });

      if (hasNewEntries) {
        playNewEntrySound();
      } else if (hasMomentumGainers) {
        playGainerSound();
      }

      fivePillarsBefore.value = newFivePillars;
    },
    { deep: true },
  );

  return {
    fivePillarsBefore,
    data,
    isLoading,
  };
});
