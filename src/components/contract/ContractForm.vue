<template>
  <q-form @submit="handleSubmit">
    <DatePicker
      v-model="model.searchDate"
      placeholder="Pilih tanggal pencarian"
      :rules="[(val) => !!val || 'Tanggal Pencarian wajib diisi']"
    />

    <q-input
      label="Nominal"
      v-model="model.nominal"
      type="number"
      prefix="Rp"
      lazy-rules
      :rules="[(val) => !!val || 'Nominal wajib diisi']"
    />

    <q-input
      label="Tenor (bulan)"
      v-model="model.tenor"
      type="number"
      suffix="bulan"
      lazy-rules
      :rules="[(val) => !!val || 'Tenor wajib diisi']"
    />

    <q-input
      label="Return % per Bulan"
      v-model="model.returnPercentPerMonth"
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

    <q-input label="Keterangan" v-model="model.description" type="textarea" autogrow lazy-rules />

    <q-btn class="q-mt-md" type="submit" label="Simpan" color="primary" />
  </q-form>
</template>

<script lang="ts" setup>
import DatePicker from '@global/DatePicker.vue';
import { ContractFormDto } from './types/contract';

const model = defineModel<ContractFormDto>({
  required: true,
});

const handleSubmit = () => {
  console.log('Contract form submitted:', model.value);
};
</script>
