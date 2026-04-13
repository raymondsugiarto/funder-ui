<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pa-none">
      <q-toolbar-title> Perjanjian Kontrak </q-toolbar-title>
      <q-btn label="Buat Perjanjian Kontrak" color="primary" @click="handleCreate"></q-btn>
    </q-toolbar>
    <q-slide-transition>
      <q-card class="q-mb-md tw-rounded-lg" v-if="showForm">
        <q-card-section>
          <ContractForm
            @cancel="handleCancel"
            @success="handleSuccess"
            v-model="form"
          ></ContractForm>
        </q-card-section>
      </q-card>
    </q-slide-transition>
    <q-card class="q-mb-md tw-rounded-lg">
      <ContractTable ref="tableRef" @edit="handleEdit"></ContractTable>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { contractFormDto } from 'src/components/contract/contract';
import ContractForm from 'src/components/contract/ContractForm.vue';
import ContractTable from 'src/components/contract/ContractTable.vue';
import type { ContractResponse } from 'src/components/contract/types/contract';
import { ref } from 'vue';

const form = ref({ ...contractFormDto });
const tableRef = ref<typeof ContractTable>();
const showForm = ref(false);

const handleCreate = () => {
  form.value = { ...contractFormDto };
  showForm.value = true;
};

const handleSuccess = () => {
  tableRef.value?.refresh();
};

const handleCancel = () => {
  showForm.value = false;
};

const handleEdit = (row: ContractResponse) => {
  const baseForm = {
    id: row.id,
    contractCode: row.contractCode,
    funderId: row.funderId,
    disbursementAt: new Date(row.disbursementAt),
    dueDate: new Date(row.dueDate),
    destinationAccount: row.destinationAccount,
    amount: row.amount,
    duration: row.duration,
    returnPercentage: row.returnPercentage,
    attachFile: null,
    notes: row.notes,
  };

  form.value = row.funder
    ? {
        ...baseForm,
        funder: {
          id: row.funder.id,
          name: row.funder.name,
          phoneNumber: row.funder.phoneNumber,
          password: '',
          ...(row.funder.funderIdParent !== undefined && {
            funderIdParent: row.funder.funderIdParent,
          }),
        },
      }
    : baseForm;
  showForm.value = true;
};
</script>
