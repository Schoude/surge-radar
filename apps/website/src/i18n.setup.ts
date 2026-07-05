import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en',
  legacy: false,
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
      },
      percentage: {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
      abbreviated: {
        notation: 'compact',
        compactDisplay: 'short',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
    },
  },
});

export default i18n;
