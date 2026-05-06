<template>
  <td
    class="tw-border tw-border-collapse q-pa-md vertical-top"
    :rowspan="row.contractPayments?.length"
  >
    {{ props.row.contractNumber }}
  </td>
  <td
    class="tw-border tw-border-collapse q-pa-md vertical-top"
    :rowspan="props.row.contractPayments?.length"
  >
    {{ date.formatDate(props.row.createdAt, DISPLAY_DATE_FORMAT) }} <br />
    {{ props.row.notes }}
  </td>
  <td
    class="tw-border tw-border-collapse q-pa-md vertical-top text-right"
    :rowspan="props.row.contractPayments?.length"
  >
    Rp {{ formatCurrency(props.row.amount) }}
  </td>
  <td
    class="tw-border tw-border-collapse q-pa-md vertical-top text-right"
    :rowspan="props.row.contractPayments?.length"
  >
    Rp {{ formatCurrency(props.row.returnAmount) }}
  </td>
</template>

<script lang="ts" setup>
import { useDate } from 'src/composables/date';
import type { HistoryFunderResponse } from './types/history-funder';
import { date } from 'quasar';
import { useNumber } from 'src/composables/number';

interface Props {
  row: HistoryFunderResponse;
}
const props = defineProps<Props>();
const { DISPLAY_DATE_FORMAT } = useDate();
const { formatCurrency } = useNumber();
</script>
