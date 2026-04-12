<template>
  <td
    class="tw-border tw-border-collapse q-pa-md vertical-top"
    :rowspan="row.contractPayments?.length"
  >
    {{ row.contractNumber }}
  </td>
  <td
    class="tw-border tw-border-collapse q-pa-md vertical-top"
    :rowspan="row.contractPayments?.length"
  >
    {{ date.formatDate(row.createdAt, DISPLAY_DATE_FORMAT) }} <br />
    {{ row.notes }}
  </td>
  <td
    class="tw-border tw-border-collapse q-pa-md vertical-top text-right"
    :rowspan="row.contractPayments?.length"
  >
    Rp {{ row.amount }}
  </td>
  <td
    class="tw-border tw-border-collapse q-pa-md vertical-top text-right"
    :rowspan="row.contractPayments?.length"
  >
    Rp {{ row.returnAmount }}
  </td>
</template>

<script lang="ts" setup>
import { useDate } from 'src/composables/date';
import { HistoryFunderResponse } from './types/history-funder';
import { date } from 'quasar';

interface Props {
  row: HistoryFunderResponse;
}
const props = defineProps<Props>();
const { DISPLAY_DATE_FORMAT } = useDate();
</script>
