<template>
  <q-card flat class="tw-rounded-lg tw-border-l-8">
    <q-card-section class="text-secondary text-body1"> {{ props.label }} </q-card-section>
    <q-card-section class="text-h3 q-pt-none" v-if="!loading">
      {{ amountFormatted }}
    </q-card-section>
    <div v-else class="q-pl-md">
      <q-spinner-dots color="primary" size="3em"></q-spinner-dots>
    </div>
  </q-card>
</template>

<script lang="ts" setup>
import { useNumber } from 'src/composables/number';
import { computed } from 'vue';

interface Props {
  loading?: boolean;
  label: string;
  amount: number;
}
const props = defineProps<Props>();
const { formatCurrency } = useNumber();

const amountFormatted = computed(() => {
  return formatCurrency(props.amount);
});
</script>
