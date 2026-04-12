<template>
  <t-select
    v-model="model"
    :api="api"
    :endpoint="getPrefixApiUrl('funders')"
    label="Pilih Funder"
    :mapper="mapper"
  ></t-select>
</template>

<script lang="ts" setup>
import type { QSelectValue } from '@/types/components/tselect';
import { api } from '@/boot/axios';
import TSelect from '@/components/~global/select/TSelect.vue';
import { useAppStore } from '@/stores/app/app-store';
import type { FunderResponse } from './types/funder';

const model = defineModel<QSelectValue<FunderResponse>>();
const { getPrefixApiUrl } = useAppStore();

const mapper = (args: unknown): QSelectValue => {
  const item = args as FunderResponse;
  return {
    value: item.id || '',
    label: `${item.name}`,
    object: item,
  };
};
</script>
