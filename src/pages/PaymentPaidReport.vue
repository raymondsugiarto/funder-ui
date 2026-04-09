<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pa-none">
      <q-toolbar-title> Laporan Pembayaran Funder </q-toolbar-title>
    </q-toolbar>
    <q-card class="q-mb-md tw-rounded-lg">
      <q-card-section>
        <SelectFunder
          v-model="funder"
          @update:model-value="(row) => (filter.funderId = row?.value ?? '')"
          lazy-rules
          :rules="[(val: QSelectValue<FunderDto>) => !!val || 'Funder wajib dipilih']"
        ></SelectFunder>
        <DatePicker
          v-model="filter.disbursementAt"
          placeholder="Tanggal Pencarian"
          :rules="[(val: Date) => !!val || 'Tanggal Pencarian wajib diisi']"
        />
        <q-btn type="button" label="Filter" color="primary" no-caps @click="handleFilter" />
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md tw-rounded-lg">
      <ContractAgingReport :filter="filter" ref="tableRef"></ContractAgingReport>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { PaymentPaidFilter } from 'src/components/contract-payment/types/payment-paid';
import ContractAgingReport from 'src/components/contract/ContractAgingReport.vue';
import { ContractAgingFilter } from 'src/components/contract/types/contract-aging';
import SelectFunder from 'src/components/funder/SelectFunder.vue';
import { FunderDto } from 'src/components/funder/types/funder';
import { QSelectValue } from 'src/types/components/tselect';
import { Ref, ref } from 'vue';

const tableRef = ref<typeof ContractAgingReport>();
const funder = ref();
const filter: Ref<PaymentPaidFilter> = ref<PaymentPaidFilter>({
  funderId: '',
  disbursementAt: new Date(),
});

const handleFilter = () => {
  // trigger refresh on ContractAgingReport
  tableRef.value?.refresh();
};
</script>
