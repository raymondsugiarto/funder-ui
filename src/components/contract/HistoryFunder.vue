<template>
  <table class="full-width">
    <thead>
      <tr>
        <th class="tw-border tw-border-collapse q-pa-md">No</th>
        <th class="tw-border tw-border-collapse q-pa-md">Tgl Fund</th>
        <th class="tw-border tw-border-collapse q-pa-md">Nominal Fund</th>
        <th class="tw-border tw-border-collapse q-pa-md">Total Return</th>
        <th class="tw-border tw-border-collapse q-pa-md">Keterangan Pencairan</th>
        <th class="tw-border tw-border-collapse q-pa-md">Total Pokok + Total Return</th>
        <th class="tw-border tw-border-collapse q-pa-md">Tgl Jatuh Tempo</th>
        <th class="tw-border tw-border-collapse q-pa-md">Tgl Pencairan</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="row in rows" :key="row.id">
        <tr class="tw-border tw-border-collapse" v-if="row.contractPayments === undefined">
          <HistoryFunderContractInfo :row="row"></HistoryFunderContractInfo>
          <td class="tw-border tw-border-collapse q-pa-md"></td>
          <td class="tw-border tw-border-collapse q-pa-md text-right">
            Rp {{ formatCurrency(row.amount + row.returnAmount) }}
          </td>
          <td class="tw-border tw-border-collapse q-pa-md"></td>
          <td class="tw-border tw-border-collapse q-pa-md"></td>
        </tr>
        <tr
          class="tw-border tw-border-collapse"
          :key="idx"
          v-for="(payment, idx) in row.contractPayments"
        >
          <HistoryFunderContractInfo v-if="idx === 0" :row="row"></HistoryFunderContractInfo>
          <td class="tw-border tw-border-collapse q-pa-md">{{ payment.notes }}</td>
          <td class="tw-border tw-border-collapse q-pa-md text-right">
            Rp {{ formatCurrency(payment.paymentAmount) }}
          </td>
          <td class="tw-border tw-border-collapse q-pa-md">
            {{ date.formatDate(row.dueDate, DISPLAY_DATE_FORMAT) }}
          </td>
          <td class="tw-border tw-border-collapse q-pa-md">
            {{ date.formatDate(row.disbursementAt, DISPLAY_DATE_FORMAT) }}
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref } from 'vue';
import { date, useQuasar } from 'quasar';
import { usePagination } from 'src/composables/pagination/pagination';
import { api } from 'src/boot/axios';
import type {
  PageTableDto,
  QTablePropsOnRequest,
  QTablePropsOnRequestPagination,
} from 'src/types/pagination/pagination';
import type { DefaultResponse } from 'src/types/response';
import type { HistoryFunderFilter, HistoryFunderResponse } from './types/history-funder';
import { useDate } from 'src/composables/date';
import HistoryFunderContractInfo from './HistoryFunderContractInfo.vue';
import { useNumber } from 'src/composables/number';

interface Props {
  filter: HistoryFunderFilter;
}
const props = defineProps<Props>();

const $q = useQuasar();
const { formatCurrency } = useNumber();
const { paginationRequest } = usePagination(api);
const rows = ref([] as HistoryFunderResponse[]);
const { DISPLAY_DATE_FORMAT } = useDate();
const loading = ref(false);

const pagination: Ref<NonNullable<QTablePropsOnRequestPagination>> = ref({
  sortBy: 'created_at',
  descending: true,
  page: 0,
  rowsPerPage: 20,
  rowsNumber: -1,
});

const loadData = async () => {
  loading.value = true;

  const searchParams = new URLSearchParams();
  const tablePropsRequest: QTablePropsOnRequest = {
    pagination: pagination.value,
    getCellValue: () => true,
  };
  // loop props.filter and append to searchParams
  for (const key in props.filter) {
    const value = props.filter[key as keyof HistoryFunderFilter];
    if (value) {
      searchParams.append(key, value);
    }
  }
  tablePropsRequest.params = searchParams;

  await paginationRequest<HistoryFunderResponse>('/api/contracts', tablePropsRequest, pagination)
    .then((response: DefaultResponse<PageTableDto<HistoryFunderResponse>>) => {
      rows.value = response.data.contents;
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        message: 'Gagal memuat data',
      });
    });
  loading.value = false;
};

defineExpose({
  async refresh() {
    await loadData();
  },
});
</script>
