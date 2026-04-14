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
          v-model="funder"
          @update:model-value="(row) => (model.funderId = row?.value ?? '')"
          lazy-rules
          :rules="[(val: QSelectValue<FunderResponse>) => !!val || 'Funder wajib dipilih']"
        ></SelectFunder>

        <div class="row q-col-gutter-md">
          <div class="col">
            <DatePicker
              v-model="model.disbursementAt"
              placeholder="Tanggal Pencarian"
              :rules="[(val) => !!val || 'Tanggal Pencarian wajib diisi']"
              label="Tanggal Pencairan"
            />
          </div>
          <div class="col">
            <DatePicker
              v-model="model.dueDate"
              placeholder="Tanggal Jatuh Tempo"
              :rules="[(val) => !!val || 'Tanggal Jatuh Tempo wajib diisi']"
              label="Tanggal Jatuh Tempo"
            />
          </div>
        </div>

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

        <div class="row q-col-gutter-md">
          <div class="col">
            <q-input
              label="Tenor (bulan)"
              v-model="model.duration"
              type="number"
              suffix="bulan"
              lazy-rules
              :rules="[(val) => !!val || 'Tenor wajib diisi']"
            />
          </div>
          <div class="col">
            <q-input
              label="Return % per Bulan"
              v-model="model.returnPercentage"
              type="number"
              suffix="%"
              lazy-rules
              :rules="[(val) => !!val || 'Return per bulan wajib diisi']"
            />
          </div>
        </div>

        <q-input
          label="Rekening Tujuan"
          v-model="model.destinationAccount"
          type="textarea"
          autogrow
          lazy-rules
          :rules="[(val) => !!val || 'Rekening tujuan wajib diisi']"
        />

        <q-file
          v-model="model.attachFile"
          label="Lampiran"
          outlined
          clearable
          :rules="[
            model.id && model.id !== ''
              ? () => true
              : (val) => !!val || 'Lampiran wajib dilampirkan',
          ]"
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
import type { ContractFormDto, ContractResponse } from './types/contract';
import SelectFunder from '../funder/SelectFunder.vue';
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import type { QSelectValue } from 'src/types/components/tselect';
import type { FunderResponse } from '../funder/types/funder';
import type { DefaultResponse } from 'src/types/response';
import { api } from 'src/boot/axios';
import { contractFormDto } from './contract';

const model = defineModel<ContractFormDto>({
  required: true,
});

const funder = ref<QSelectValue<FunderResponse>>();
const $q = useQuasar();

interface Emit {
  (event: 'success', data: ContractResponse): void;
  (event: 'error', error: Error): void;
  (event: 'cancel'): void;
}

const emit = defineEmits<Emit>();

// when model.funderId is updated from select funder, update the funder ref to show the selected funder in select component
watch(
  () => model.value.funderId,
  (newFunderId: string) => {
    console.log('Watch triggered - funderId:', newFunderId, 'funder:', model.value.funder);
    if (!newFunderId || !model.value.funder) {
      funder.value = undefined;
      return;
    }
    funder.value = {
      value: newFunderId,
      label: model.value.funder?.name ?? '',
      object: model.value.funder,
    };
  },
  { immediate: true },
);

const onReset = () => {
  model.value = { ...contractFormDto };
  funder.value = undefined;
};

const handleSubmit = () => {
  const f = new FormData();
  f.append('contractCode', model.value.contractCode);
  f.append('funderId', model.value.funderId);
  f.append('disbursementAt', model.value.disbursementAt.toISOString());
  f.append('dueDate', model.value.dueDate.toISOString());
  f.append('amount', model.value.amount?.toString() ?? '');
  f.append('duration', model.value.duration?.toString() ?? '');
  f.append('returnPercentage', model.value.returnPercentage?.toString() ?? '');
  f.append('notes', model.value.notes);
  f.append('destinationAccount', model.value.destinationAccount);
  if (model.value.attachFile) {
    f.append('attachmentFile', model.value.attachFile);
  }

  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const apiMethod =
    model.value.id && model.value.id !== ''
      ? (url: string, data: FormData) =>
          api.put<DefaultResponse<ContractResponse>>(url, data, header)
      : (url: string, data: FormData) =>
          api.post<DefaultResponse<ContractResponse>>(url, data, header);

  apiMethod(
    '/api/contracts' + (model.value.id && model.value.id !== '' ? '/' + model.value.id : ''),
    f,
  )
    .then((response) => {
      $q.notify({
        type: 'positive',
        message: 'Kontrak berhasil disimpan',
      });
      emit('success', response.data);
      onReset();
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
