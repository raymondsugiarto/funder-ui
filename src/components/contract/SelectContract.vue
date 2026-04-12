<template>
  <t-select
    v-model="model"
    :api="api"
    :endpoint="getPrefixApiUrl('contracts')"
    label="Pilih Kontrak"
    :mapper="mapper"
    :url-params="urlParams"
  ></t-select>
</template>

<script lang="ts" setup>
import { QSelectValue } from '@/types/components/tselect';
import { api } from '@/boot/axios';
import TSelect from '@/components/~global/select/TSelect.vue';
import { useAppStore } from '@/stores/app/app-store';
import { ContractResponse } from './types/contract';
import { computed } from 'vue';

const model = defineModel<QSelectValue<ContractResponse>>();
const { getPrefixApiUrl } = useAppStore();
const props = defineProps<{
  funderId?: string;
  notYetPaidOff?: boolean;
}>();

const urlParams = computed(() => {
  const params: URLSearchParams = new URLSearchParams();
  if (props.funderId) {
    params.append('funderId', props.funderId);
  }
  if (props.notYetPaidOff) {
    params.append('notYetPaidOff', 'true');
  }
  return params;
});

const mapper = (args: unknown): QSelectValue => {
  const item = args as ContractResponse;
  return {
    value: item.id || '',
    label: `${item.contractCode} - ${item.contractNumber}`,
    object: item,
  };
};
</script>
