import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE_NAMES } from './names';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: ROUTE_NAMES.SCREENERS,
      path: '/',
      component: () => import('@/views/Screeners.vue'),
    },
  ],
});

export default router;
