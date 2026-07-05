import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

import { defineConfig } from 'vite-plus';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  fmt: {
    singleQuote: true,
    semi: true,
    trailingComma: 'all',
    sortTailwindcss: {
      stylesheet: './src/style.css',
      functions: ['cn', 'clsx', 'cva', 'computed'],
    },
  },
  lint: {
    ignorePatterns: ['*/api/*'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'vue', 'vitest'],
    categories: {
      correctness: 'error',
    },
    env: {
      browser: true,
    },
  },
  run: {
    cache: true,
  },
  plugins: [vue(), vueDevTools(), tailwindcss()] as unknown as any,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
