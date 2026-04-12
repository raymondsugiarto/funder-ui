<template>
  <q-form ref="formRef" @submit="handleSubmit">
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
          label="Pilih Leader"
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
import type { FunderDto, FunderResponse } from './types/funder';
import type { DefaultResponse } from '@/types/response';
import SelectFunder from './SelectFunder.vue';
import { ref } from 'vue';
import { QForm, useQuasar } from 'quasar';

const model = defineModel<FunderDto>({
  required: true,
});

const funderIdParent = ref();
const $q = useQuasar();
const formRef = ref<QForm>();

interface Emit {
  (event: 'success', data: FunderResponse): void;
  (event: 'error', error: Error): void;
  (event: 'cancel'): void;
}
const emit = defineEmits<Emit>();

const onReset = () => {
  formRef.value?.resetValidation();
  model.value = {
    id: '',
    name: '',
    phoneNumber: '',
    password: '',
    funderIdParent: '',
  };
  funderIdParent.value = null;
};

const handleSubmit = () => {
  const apiMethod =
    model.value.id == ''
      ? (url: string, data: FunderDto) => api.post<DefaultResponse<FunderResponse>>(url, data)
      : (url: string, data: FunderDto) => api.put<DefaultResponse<FunderResponse>>(url, data);

  apiMethod('/api/funders' + (model.value.id ? '/' + model.value.id : ''), model.value)
    .then((response) => {
      $q.notify({
        type: 'positive',
        message: 'Funder berhasil disimpan',
      });
      emit('success', response.data);
      onReset();
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
