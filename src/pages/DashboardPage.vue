<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pa-none">
      <q-toolbar-title> Dashboard </q-toolbar-title>
    </q-toolbar>
    <div>
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <dashboard-item-amount
            :loading="loading"
            class="tw-border-l-[#3695d9]"
            label="Data Pokok All Time"
            color=""
            :amount="data?.totalAmount ?? 0"
          ></dashboard-item-amount>
        </div>
        <div class="col-6">
          <dashboard-item-amount
            :loading="loading"
            class="tw-border-l-[#bc3acf]"
            label="Data Pokok Yang Sudah Cair"
            color=""
            :amount="data?.totalAmountDisbursed ?? 0"
          ></dashboard-item-amount>
        </div>
        <div class="col-4">
          <dashboard-item-amount
            :loading="loading"
            class="tw-border-l-[#2bd678]"
            label="Total Seluruh Return"
            color=""
            :amount="data?.totalReturnAmount ?? 0"
          ></dashboard-item-amount>
        </div>
        <div class="col-4">
          <dashboard-item-amount
            :loading="loading"
            class="tw-border-l-[#d8bf2a]"
            label="Data Return Yang Sudah Cair"
            color=""
            :amount="data?.totalReturnAmountReceived ?? 0"
          ></dashboard-item-amount>
        </div>
        <div class="col-4">
          <dashboard-item-amount
            :loading="loading"
            class="tw-border-l-[#d72f36]"
            label="Data Return Yang Akan Cair"
            color=""
            :amount="data?.totalReturnAmountPending ?? 0"
          ></dashboard-item-amount>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import DashboardItemAmount from 'src/components/dashboard/DashboardItemAmount.vue';
import type { DashboardResponse } from 'src/components/dashboard/types/dashboard';
import type { DefaultResponse } from 'src/types/response';
import { onMounted, ref } from 'vue';

const data = ref<DashboardResponse>();
const loading = ref(false);

const loadData = async () => {
  return api
    .get<DefaultResponse<DashboardResponse>>('/api/contracts/dashboard')
    .then((res) => {
      data.value = res.data;
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(async () => {
  await loadData();
});
</script>
