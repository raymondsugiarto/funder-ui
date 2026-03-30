<template>
  <q-form @submit="handleSubmit">
    <q-input
      label="Nama"
      v-model="model.name"
      type="text"
      lazy-rules
      :rules="[(val) => !!val || 'Nama Funder wajib diisi']"
    ></q-input>
    <q-input
      label="Leader"
      v-model="model.funderIdParent"
      type="text"
      lazy-rules
      :rules="[(val) => !!val || 'Leader wajib diisi']"
    ></q-input>
    <q-input
      label="No Whatsapp"
      v-model="model.phoneNumber"
      type="text"
      lazy-rules
      :rules="[(val) => !!val || 'No Whatsapp wajib diisi']"
    ></q-input>
    <q-input
      label="Kata Sandi"
      v-model="model.password"
      type="password"
      lazy-rules
      :rules="[(val) => !!val || 'Kata Sandi wajib diisi']"
    ></q-input>
    <q-btn type="submit" label="Simpan" color="primary"></q-btn>
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
  api
    .post<DefaultResponse<FunderResponse>>('/api/funders', model.value)
    .then((response) => {
      console.log('Funder berhasil disimpan:', response.data);
    })
    .catch((error) => {
      console.error('Gagal menyimpan funder:', error);
    });
};
</script>
