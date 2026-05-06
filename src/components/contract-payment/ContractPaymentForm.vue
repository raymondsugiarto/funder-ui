<template>
  <q-form @submit="handleSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4">
        <SelectFunder
          v-model="funder"
          @update:model-value="handleUpdateFunder"
          lazy-rules
          :notYetPaidOff="true"
          :rules="[(val: QSelectValue<FunderDto>) => !!val || 'Funder wajib dipilih']"
        ></SelectFunder>

        <div>
          <div v-if="funder">
            <SelectContract
              v-model="contract"
              @update:model-value="(row) => (model.contractId = row?.value ?? '')"
              lazy-rules
              :rules="[(val: QSelectValue<ContractResponse>) => !!val || 'Kontrak wajib dipilih']"
              :funder-id="funder?.value"
            ></SelectContract>
          </div>
          <div v-else>
            <p class="text-primary q-mb-md">
              Pilih funder terlebih dahulu untuk menampilkan daftar kontrak
            </p>
          </div>
        </div>

        <DatePicker
          v-model="model.paymentAt"
          placeholder="Tanggal Pembayaran"
          label="Tanggal Pembayaran"
          :rules="[(val) => !!val || 'Tanggal Pembayaran wajib diisi']"
        />
      </div>
      <div class="col-12 col-md-4">
        <q-card v-if="contract" class="tw-rounded-lg">
          <q-card-section>
            <p class="text-body1 q-mb-md text-primary text-bold">Informasi Kontrak</p>
            <div class="row">
              <div class="col-6">
                <p>
                  <span class="text-weight-bold">Nomor Urut:</span>
                  {{ contract.object.contractNumber }}
                </p>
                <p>
                  <span class="text-weight-bold">Nomor Perjanjian:</span>
                  {{ contract.object.contractCode }}
                </p>
                <p>
                  <span class="text-weight-bold">Nama Funder:</span>
                  {{ contract.object.funderName }}
                </p>
              </div>
              <div class="col-6">
                <p>
                  <span class="text-weight-bold">Nominal:</span>
                  Rp {{ contract.object.amount }}
                </p>
                <p>
                  <span class="text-weight-bold">Tenor:</span>
                  {{ contract.object.duration }} bulan
                </p>
                <p>
                  <span class="text-weight-bold">Return % per Bulan:</span>
                  {{ contract.object.returnPercentage }}%
                </p>
                <p>
                  <span class="text-weight-bold">Return Amount</span>
                  {{ contract.object.returnAmount }}%
                </p>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-card v-else class="bg-grey-4 text-center tw-min-h-[150px] tw-rounded-lg q-pa-xl">
          <q-icon name="warning" size="2em" color="primary" class="q-mb-sm"></q-icon>
          <p class="text-primary">
            Pilih kontrak terlebih dahulu untuk menampilkan informasi kontrak
          </p>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-input
          label="Nominal"
          v-model="model.paymentAmount"
          type="number"
          prefix="Rp"
          lazy-rules
          :rules="[(val) => !!val || 'Nominal wajib diisi']"
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
        <q-input label="Keterangan" v-model="model.notes" type="textarea" autogrow lazy-rules />
      </div>
    </div>

    <q-btn type="submit" label="Simpan" color="primary" no-caps />
    <q-btn class="q-ml-sm" label="Batal" color="negative" no-caps flat @click="emit('cancel')" />
  </q-form>
</template>

<script lang="ts" setup>
import DatePicker from '@global/DatePicker.vue';
import SelectFunder from '../funder/SelectFunder.vue';
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import type { QSelectValue } from 'src/types/components/tselect';
import type { FunderDto, FunderResponse } from '../funder/types/funder';
import type { DefaultResponse } from 'src/types/response';
import { api } from 'src/boot/axios';
import type { ContractPaymentDto, ContractPaymentResponse } from './types/contract-payment';
import SelectContract from '../contract/SelectContract.vue';
import type { ContractResponse } from '../contract/types/contract';
import { contractPaymentDto } from './contract-payment';

const model = defineModel<ContractPaymentDto>({
  required: true,
});

const funder = ref();
const contract = ref();
const $q = useQuasar();
interface Emit {
  (event: 'success', data: ContractPaymentResponse): void;
  (event: 'error', error: Error): void;
  (event: 'cancel'): void;
}
const emit = defineEmits<Emit>();

// when model.funderId is updated from select funder, update the funder ref to show the selected funder in select component
watch(
  () => model.value.funderId,
  (newFunderId: string) => {
    if (!model.value.id) {
      return;
    }
    console.log('model.funderId updated:', model.value.id);
    if (!newFunderId || !model.value.funder) {
      funder.value = undefined;
      return;
    }
    funder.value = {
      value: newFunderId,
      label: model.value.funder?.name ?? '',
      object: model.value.funder,
    };
    contract.value = {
      value: model.value.contractId,
      label:
        (model.value.contract?.contractCode ?? '') +
        ' - ' +
        (model.value.contract?.contractNumber ?? ''),
      object: model.value.contract,
    };
  },
  { immediate: true },
);

const handleUpdateFunder = (row: QSelectValue<FunderResponse> | undefined) => {
  model.value.funderId = row?.value ?? '';
  contract.value = null;
};

const onReset = () => {
  model.value = { ...contractPaymentDto };
  funder.value = null;
  contract.value = null;
};

const handleSubmit = () => {
  const f = new FormData();
  f.append('contractId', model.value.contractId);
  f.append('paymentAt', model.value.paymentAt.toISOString());
  f.append('paymentAmount', model.value.paymentAmount?.toString() ?? '');
  f.append('notes', model.value.notes);
  if (model.value.attachFile) {
    f.append('attachmentFile', model.value.attachFile);
  }

  const apiMethod =
    model.value.id && model.value.id !== ''
      ? (url: string, data: FormData) =>
          api.put<DefaultResponse<ContractPaymentResponse>>(url, data)
      : (url: string, data: FormData) =>
          api.post<DefaultResponse<ContractPaymentResponse>>(url, data);

  apiMethod(
    `/api/contracts/${model.value.contractId}/payments` +
      (model.value.id && model.value.id !== '' ? '/' + model.value.id : ''),
    f,
  )
    .then((response) => {
      $q.notify({
        type: 'positive',
        message: 'Pembayaran berhasil disimpan',
      });
      emit('success', response.data);
      onReset();
    })
    .catch((error) => {
      $q.notify({
        type: 'negative',
        message: 'Gagal menyimpan Pembayaran',
      });
      emit('error', error);
    });
};
</script>
