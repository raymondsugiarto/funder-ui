<template>
  <q-list class="tw-text-[#697a8d]">
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
    id: 'contract-aging',
    label: 'Laporan Jatuh Tempo',
    icon: 'shopping_bag',
    to: '/contract-aging',
  },
  {
    id: 'payment-paid',
    label: 'Laporan Pembayaran Funder',
    icon: 'shelves',
    to: '/payment-paid',
  },
  {
    id: 'history-funder',
    label: 'Riwayat Funder',
    icon: 'shelves',
    to: '/history-funder',
  },
];
</script>
