import type { RouteRecordRaw } from 'vue-router';
import { adminPublicMeta } from './app-type';
import { CenterLayout } from './layout';

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: CenterLayout,
    children: [
      {
        name: 'sign-in-index',
        path: '',
        component: () => import('@/pages/authentication/SignInPage.vue'),
        meta: { ...adminPublicMeta },
      },
      {
        name: 'sign-in',
        path: 'sign-in',
        component: () => import('@/pages/authentication/SignInPage.vue'),
        meta: { ...adminPublicMeta },
      },
    ],
  },
];

export { publicRoutes };
