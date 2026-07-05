import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useScreenersStore = defineStore('screeners', () => {
  const newsTicker = ref('');

  return {
    newsTicker,
  };
});
