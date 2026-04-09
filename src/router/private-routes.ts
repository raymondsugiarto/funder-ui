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
      {
        name: 'contract',
        path: 'contract',
        component: () => import('@/pages/ContractPage.vue'),
        meta: { ...adminPrivateMeta },
      },
      {
        name: 'payment',
        path: 'payment',
        component: () => import('@/pages/PaymentPage.vue'),
        meta: { ...adminPrivateMeta },
      },
      {
        name: 'contract-aging',
        path: 'contract-aging',
        component: () => import('@/pages/ContractAgingReport.vue'),
        meta: { ...adminPrivateMeta },
      },
      {
        name: 'payment-paid',
        path: 'payment-paid',
        component: () => import('@/pages/PaymentPaidReport.vue'),
        meta: { ...adminPrivateMeta },
      },
      {
        name: 'history-funder',
        path: 'history-funder',
        component: () => import('@/pages/HistoryFunderReport.vue'),
        meta: { ...adminPrivateMeta },
      },
    ],
  },
];

export { privateRoutes };
