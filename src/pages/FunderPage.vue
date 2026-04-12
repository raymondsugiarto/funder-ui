<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pa-none">
      <q-toolbar-title> Funder </q-toolbar-title>
      <q-btn label="Buat Funder" color="primary" @click="showForm = true"></q-btn>
    </q-toolbar>
    <q-slide-transition>
      <q-card class="q-mb-md tw-rounded-lg" v-if="showForm">
        <q-card-section>
          <FunderForm @cancel="handleCancel" @success="handleSuccess" v-model="form"></FunderForm>
        </q-card-section>
      </q-card>
    </q-slide-transition>
    <q-card class="q-mb-md tw-rounded-lg">
      <FunderTable ref="tableRef" @edit="handleEdit"></FunderTable>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { funderDto } from 'src/components/funder/funder';
import FunderForm from 'src/components/funder/FunderForm.vue';
import FunderTable from 'src/components/funder/FunderTable.vue';
import type { FunderDto, FunderResponse } from 'src/components/funder/types/funder';
import { ref } from 'vue';

const form = ref<FunderDto>({ ...funderDto });
const tableRef = ref<typeof FunderTable>();
const showForm = ref(false);
const handleSuccess = () => {
  tableRef.value?.refresh();
};
const handleCancel = () => {
  showForm.value = false;
};

const handleEdit = (row: FunderResponse) => {
  form.value = { ...row, password: '' };
  showForm.value = true;
};
</script>
