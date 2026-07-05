import { createApp } from 'vue';
import type { Plugin } from 'vue';
import { createPinia } from 'pinia';
import { PiniaColada } from '@pinia/colada';
import i18n from '@/i18n.setup';

import '@/style.css';

import App from '@/App.vue';
import router from '@/router';

const app = createApp(App);

app.use(i18n);
const pinia = createPinia();
app.use(pinia as unknown as Plugin);
app.use(PiniaColada as unknown as Plugin);
app.use(router as unknown as Plugin);

app.mount('#app');
