<template>
  <q-list>
    <MainMenuItem :menus="getMenus"></MainMenuItem>
  </q-list>
</template>

<script lang="ts" setup>
import MainMenuItem from '@global/MainMenuItem.vue';
import { MenuItem } from './menu';
import { computed } from 'vue';
import { useUserStore } from '@/stores/user/user-store';

const userStore = useUserStore();

const userType = computed(() => {
  return userStore.getUser?.userType || 'ADMIN';
});

const getMenus = computed(() => {
  if (userType.value === 'OWNER') {
    return menus;
  } else {
    return menus.filter((menu) => {
      const excludedMenus = ['labarugi', 'rekeningkoran', 'stockmanual'];
      return !excludedMenus.includes(menu.id);
    });
  }
});

const menus: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'inventory',
    to: '/dashboard',
  },
  {
    id: 'funder',
    label: 'Funder',
    icon: 'person',
    to: '/funder',
  },
  {
    id: 'contract',
    label: 'Perjanjian Kontrak',
    icon: 'paid',
    to: '/contract',
  },
  {
    id: 'payment',
    label: 'Pembayaran',
    icon: 'receipt',
    to: '/payment',
  },
  {
    id: 'report-aging',
    label: 'Laporan Jatuh Tempo',
    icon: 'shopping_bag',
    to: '/report-aging',
  },
  {
    id: 'report-payment',
    label: 'Laporan Pembayaran Funder',
    icon: 'shelves',
    to: '/report-payment',
  },
  {
    id: 'history-funder',
    label: 'Riwayat Funder',
    icon: 'shelves',
    to: '/history-funder',
  },
];
</script>
