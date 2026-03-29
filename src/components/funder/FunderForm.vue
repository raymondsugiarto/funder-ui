<template>
  <q-form @submit="handleSubmit">
    <q-input
      label="Nama Funder"
      outlined
      dense
      v-model="model.name"
      type="text"
      name="funderName"
      autocomplete="off"
      lazy-rules
      :rules="[(val) => !!val || 'Nama Funder wajib diisi']"
  </q-form>
</template>

<script lang="ts" setup>

import { api } from 'src/boot/axios';
import { FunderDto, FunderResponse } from './types/funder';
import { DefaultResponse } from '@/types/response';

const model = defineModel<FunderDto>({
  required: true,
});

const handleSubmit = () => {
  api.post<DefaultResponse<FunderResponse>>('/funders', model.value)
    .then((response) => {
      console.log('Funder berhasil disimpan:', response.data);
    })
    .catch((error) => {
      console.error('Gagal menyimpan funder:', error);
    });
};
</script>
