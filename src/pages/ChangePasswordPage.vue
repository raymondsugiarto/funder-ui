<template>
  <q-page class="q-pa-md">
    <q-toolbar class="q-pa-none">
      <q-toolbar-title>Ganti Kata Sandi </q-toolbar-title>
    </q-toolbar>
    <q-card>
      <q-card-section>
        <q-form ref="qform" @submit="handleSubmit">
          <q-input
            v-model="password"
            label="Kata Sandi Baru"
            type="password"
            class="q-mb-md"
            :rules="[(val) => !!val || 'Kata sandi tidak boleh kosong']"
          ></q-input>
          <q-input
            v-model="confirmPassword"
            label="Konfirmasi Kata Sandi Baru"
            type="password"
            class="q-mb-md"
            :rules="[(val) => !!val || 'Kata sandi tidak boleh kosong']"
          ></q-input>
          <q-btn label="Simpan" color="primary" type="submit" class="q-mt-md"></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { api } from '@/boot/axios';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const password = ref<string>('');
const confirmPassword = ref<string>('');
const $q = useQuasar();
const qform = ref();

const handleSubmit = () => {
  if (password.value !== confirmPassword.value) {
    $q.notify({
      type: 'negative',
      message: 'Kata sandi tidak cocok',
    });
    return;
  }

  // Simulate API call
  api
    .put('/api/user-credential/password', {
      password: password.value,
    })
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Kata sandi berhasil diubah',
      });
      password.value = '';
      confirmPassword.value = '';
      qform.value.reset();
    })
    .catch((error) => {
      $q.notify({
        type: 'negative',
        message: error.response.data.message,
      });
    });
};
</script>
