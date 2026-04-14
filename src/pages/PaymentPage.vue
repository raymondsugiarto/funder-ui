<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pa-none">
      <q-toolbar-title> Perjanjian Kontrak </q-toolbar-title>
      <q-btn label="Buat Perjanjian Kontrak" color="primary" @click="showForm = true"></q-btn>
    </q-toolbar>
    <q-slide-transition>
      <q-card class="q-mb-md tw-rounded-lg" v-if="showForm">
        <q-card-section>
          <ContractPaymentForm
            @cancel="handleCancel"
            @success="handleSuccess"
            v-model="form"
          ></ContractPaymentForm>
        </q-card-section>
      </q-card>
    </q-slide-transition>
    <q-card class="q-mb-md tw-rounded-lg">
      <ContractPaymentTable ref="tableRef" @edit="handleEdit"></ContractPaymentTable>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { contractPaymentDto } from 'src/components/contract-payment/contract-payment';
import ContractPaymentForm from 'src/components/contract-payment/ContractPaymentForm.vue';
import ContractPaymentTable from 'src/components/contract-payment/ContractPaymentTable.vue';
import type { ContractPaymentResponse } from 'src/components/contract-payment/types/contract-payment';
import { ref } from 'vue';

const form = ref({ ...contractPaymentDto });
const tableRef = ref<typeof ContractPaymentTable>();
const showForm = ref(false);
const handleSuccess = () => {
  tableRef.value?.refresh();
};
const handleCancel = () => {
  showForm.value = false;
};

const handleEdit = (row: ContractPaymentResponse) => {
  const baseForm = {
    id: row.id,
    funderId: row.contract.funder.id,
    contractId: row.contractId,
    paymentAt: new Date(row.paymentAt),
    paymentAmount: row.paymentAmount,
    attachFile: null,
    notes: row.notes,
    contract: row.contract,
  };

  form.value = row.contract.funder
    ? {
        ...baseForm,
        funder: {
          id: row.contract.funder.id,
          name: row.contract.funder.name,
          phoneNumber: row.contract.funder.phoneNumber,
          password: '',
          ...(row.contract.funder.funderIdParent !== undefined && {
            funderIdParent: row.contract.funder.funderIdParent,
          }),
        },
      }
    : baseForm;
  showForm.value = true;
};
</script>
