<template>
  <q-form @submit="handleSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          label="Nama"
          v-model="model.name"
          type="text"
          lazy-rules
          :rules="[(val) => !!val || 'Nama Funder wajib diisi']"
        ></q-input>
        <SelectFunder
          v-model="funderIdParent"
          @update:model-value="(row) => (model.funderIdParent = row?.value ?? '')"
          class="q-mb-md"
        ></SelectFunder>
      </div>
      <div class="col-12 col-md-6">
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
      </div>
    </div>
    <q-btn type="submit" label="Simpan" color="primary" no-caps></q-btn>
    <q-btn class="q-ml-sm" label="Batal" color="negative" no-caps flat @click="emit('cancel')" />
  </q-form>
</template>

<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { FunderDto, FunderResponse } from './types/funder';
import { DefaultResponse } from '@/types/response';
import SelectFunder from './SelectFunder.vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const model = defineModel<FunderDto>({
  required: true,
});

const funderIdParent = ref();
const $q = useQuasar();
const emit = defineEmits({
  success: (data: FunderResponse) => true,
  error: (error: Error) => true,
  cancel: () => true,
});

const handleSubmit = () => {
  api
    .post<DefaultResponse<FunderResponse>>('/api/funders', model.value)
    .then((response) => {
      $q.notify({
        type: 'positive',
        message: 'Funder berhasil disimpan',
      });
      emit('success', response.data);
    })
    .catch((error) => {
      $q.notify({
        type: 'negative',
        message: 'Gagal menyimpan funder',
      });
      emit('error', error);
    });
};
</script>
