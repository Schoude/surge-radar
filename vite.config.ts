import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    singleQuote: true,
    semi: true,
    trailingComma: 'all',
    sortTailwindcss: {
      stylesheet: './apps/website/src/style.css',
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
});
