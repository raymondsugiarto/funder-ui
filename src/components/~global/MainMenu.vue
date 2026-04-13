<template>
  <q-list class="tw-text-[#697a8d]">
    <MainMenuItem :menus="getMenus"></MainMenuItem>
  </q-list>
</template>

<script lang="ts" setup>
import MainMenuItem from '@global/MainMenuItem.vue';
import type { MenuItem } from './menu';
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
    icon: 'grid_view',
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
    icon: 'handshake',
    to: '/contract',
  },
  {
    id: 'payment',
    label: 'Pembayaran',
    icon: 'attach_money',
    to: '/payment',
  },
  {
    id: 'contract-aging',
    label: 'Laporan Jatuh Tempo',
    icon: 'assignment_late',
    to: '/contract-aging',
  },
  {
    id: 'payment-paid',
    label: 'Laporan Pembayaran Funder',
    icon: 'price_check',
    to: '/payment-paid',
  },
  {
    id: 'history-funder',
    label: 'Riwayat Funder',
    icon: 'history',
    to: '/history-funder',
  },
];
</script>
