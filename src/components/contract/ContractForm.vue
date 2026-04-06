<template>
  <q-form @submit="handleSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          label="Nomor Perjanjian"
          v-model="model.contractCode"
          type="text"
          lazy-rules
          :rules="[(val) => !!val || 'Nominal wajib diisi']"
        />
        <SelectFunder
          v-model="funderId"
          @update:model-value="(row) => (model.funderId = row?.value ?? '')"
          lazy-rules
          :rules="[(val: QSelectValue<FunderDto>) => !!val || 'Funder wajib dipilih']"
        ></SelectFunder>

        <DatePicker
          v-model="model.disbursementAt"
          placeholder="Tanggal Pencarian"
          :rules="[(val) => !!val || 'Tanggal Pencarian wajib diisi']"
        />

        <q-input label="Keterangan" v-model="model.notes" type="textarea" autogrow lazy-rules />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          label="Nominal"
          v-model="model.amount"
          type="number"
          prefix="Rp"
          lazy-rules
          :rules="[(val) => !!val || 'Nominal wajib diisi']"
        />

        <q-input
          label="Tenor (bulan)"
          v-model="model.duration"
          type="number"
          suffix="bulan"
          lazy-rules
          :rules="[(val) => !!val || 'Tenor wajib diisi']"
        />

        <q-input
          label="Return % per Bulan"
          v-model="model.returnPercentage"
          type="number"
          suffix="%"
          lazy-rules
          :rules="[(val) => !!val || 'Return per bulan wajib diisi']"
        />

        <q-file
          v-model="model.attachFile"
          label="Lampiran"
          outlined
          clearable
          :rules="[(val) => !!val || 'Lampiran wajib dilampirkan']"
        >
          <template #prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
    </div>
    <q-btn type="submit" label="Simpan" color="primary" no-caps />
    <q-btn class="q-ml-sm" label="Batal" color="negative" no-caps flat @click="emit('cancel')" />
  </q-form>
</template>

<script lang="ts" setup>
import DatePicker from '@global/DatePicker.vue';
import { ContractFormDto, ContractResponse } from './types/contract';
import SelectFunder from '../funder/SelectFunder.vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { QSelectValue } from 'src/types/components/tselect';
import { FunderDto } from '../funder/types/funder';
import { DefaultResponse } from 'src/types/response';
import { api } from 'src/boot/axios';

const model = defineModel<ContractFormDto>({
  required: true,
});

const funderId = ref();
const $q = useQuasar();
const emit = defineEmits({
  success: (data: ContractResponse) => true,
  error: (error: Error) => true,
  cancel: () => true,
});

const handleSubmit = () => {
  const f = new FormData();
  f.append('contractCode', model.value.contractCode);
  f.append('funderId', model.value.funderId);
  f.append('disbursementAt', model.value.disbursementAt.toISOString());
  f.append('amount', model.value.amount?.toString() ?? '');
  f.append('duration', model.value.duration?.toString() ?? '');
  f.append('returnPercentage', model.value.returnPercentage?.toString() ?? '');
  f.append('notes', model.value.notes);
  if (model.value.attachFile) {
    f.append('attachmentFile', model.value.attachFile);
  }
  api
    .post<DefaultResponse<ContractResponse>>('/api/contracts', f, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      $q.notify({
        type: 'positive',
        message: 'Kontrak berhasil disimpan',
      });
      emit('success', response.data);
    })
    .catch((error) => {
      console.error('Gagal menyimpan kontrak:', error);
      $q.notify({
        type: 'negative',
        message: 'Gagal menyimpan kontrak',
      });
      emit('error', error);
    });
};
</script>
