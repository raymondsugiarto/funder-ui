<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pa-none">
      <q-toolbar-title> Riwayat Funder </q-toolbar-title>
    </q-toolbar>
    <q-card class="q-mb-md tw-rounded-lg">
      <q-card-section>
        <SelectFunder
          v-model="funder"
          @update:model-value="(row) => (filter.funderId = row?.value ?? '')"
          lazy-rules
          :rules="[(val: QSelectValue<FunderDto>) => !!val || 'Funder wajib dipilih']"
        ></SelectFunder>
        <q-btn type="button" label="Filter" color="primary" no-caps @click="handleFilter" />
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md tw-rounded-lg">
      <HistoryFunder :filter="filter" ref="tableRef"></HistoryFunder>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import HistoryFunder from 'src/components/contract/HistoryFunder.vue';
import { ContractAgingFilter } from 'src/components/contract/types/contract-aging';
import SelectFunder from 'src/components/funder/SelectFunder.vue';
import { FunderDto } from 'src/components/funder/types/funder';
import { QSelectValue } from 'src/types/components/tselect';
import { ref } from 'vue';

const tableRef = ref<typeof HistoryFunder>();
const funder = ref();
const filter: ContractAgingFilter = {
  funderId: '',
};

const handleFilter = () => {
  // trigger refresh on ContractAgingReport
  tableRef.value?.refresh();
};
</script>
