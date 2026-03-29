import type { RouteRecordRaw } from 'vue-router';
import { adminPrivateMeta } from './app-type';
import MainLayout from 'src/layouts/MainLayout.vue';

const privateRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('@/pages/DashboardPage.vue'),
        meta: { ...adminPrivateMeta },
      },
      {
        name: 'funder',
        path: 'funder',
        component: () => import('@/pages/FunderPage.vue'),
        meta: { ...adminPrivateMeta },
      },
    ],
  },
];

export { privateRoutes };
