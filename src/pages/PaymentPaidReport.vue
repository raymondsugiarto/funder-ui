<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pa-none">
      <q-toolbar-title> Laporan Pembayaran Funder </q-toolbar-title>
    </q-toolbar>
    <q-card class="q-mb-md tw-rounded-lg">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col col-md-6">
            <SelectFunder
              v-model="funder"
              @update:model-value="(row) => (filter.funderId = row?.value ?? '')"
              lazy-rules
            ></SelectFunder>
          </div>
          <div class="col col-md-6">
            <DatePicker
              :range="true"
              v-model="filter.paymentAtRange"
              placeholder="Tanggal Pembayaran"
              :rules="[(val: Date) => !!val || 'Tanggal Pembayaran wajib diisi']"
            />
          </div>
        </div>
        <q-btn type="button" label="Filter" color="primary" no-caps @click="handleFilter" />
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md tw-rounded-lg">
      <PaymentPaidReport :filter="filter" ref="tableRef"></PaymentPaidReport>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import PaymentPaidReport from 'src/components/contract-payment/PaymentPaidReport.vue';
import type { PaymentPaidFilter } from 'src/components/contract-payment/types/payment-paid';
import SelectFunder from 'src/components/funder/SelectFunder.vue';
import DatePicker from 'src/components/~global/DatePicker.vue';
import type { Ref } from 'vue';
import { ref } from 'vue';

const tableRef = ref<typeof PaymentPaidReport>();
const funder = ref();
const filter: Ref<PaymentPaidFilter> = ref<PaymentPaidFilter>({
  funderId: '',
  paymentAtRange: {
    from: new Date(),
    to: new Date(),
  },
});

const handleFilter = () => {
  // trigger refresh on ContractAgingReport
  tableRef.value?.refresh();
};
</script>
