import type { RouteRecordRaw } from 'vue-router';
import { publicRoutes } from './public-routes';
import { privateRoutes } from './private-routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [...publicRoutes, ...privateRoutes],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
