<template>
  <my-table
    ref="tableRef"
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    :loading="loading"
    separator="cell"
    class="sticky-table"
    v-model:filter="filterSearch"
    @request="onRequest"
  >
  </my-table>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref } from 'vue';
import MyTable from '@global/MyTable.vue';
import type { QTable, QTableColumn, QTableProps } from 'quasar';
import { date, useQuasar } from 'quasar';
import { usePagination } from 'src/composables/pagination/pagination';
import { api } from 'src/boot/axios';
import type {
  PageTableDto,
  QTablePropsOnRequest,
  QTablePropsOnRequestPagination,
} from 'src/types/pagination/pagination';
import type { DefaultResponse } from 'src/types/response';
import type { ContractAgingFilter, ContractAgingResponse } from './types/contract-aging';
import { useDate } from 'src/composables/date';

interface Props {
  filter: ContractAgingFilter;
}
const props = defineProps<Props>();

const $q = useQuasar();
const { paginationRequest } = usePagination(api);
const rows = ref([] as ContractAgingResponse[]);
const { DISPLAY_DATE_FORMAT } = useDate();
const tableRef = ref() as Ref<QTable>;
const loading = ref(false);
const filterSearch = ref('');

const columns: QTableColumn[] = [
  {
    name: 'contractNumber',
    label: 'No Urut Perjanjian',
    align: 'left',
    field: 'contractNumber',
    sortable: false,
  },
  {
    name: 'contractCode',
    label: 'Nomor Perjanjian',
    align: 'left',
    field: 'contractCode',
    sortable: false,
  },
  {
    name: 'disbursementAt',
    label: 'Tanggal Pencarian',
    align: 'left',
    field: (row) => date.formatDate(row.disbursementAt, DISPLAY_DATE_FORMAT),
    sortable: false,
  },
  {
    name: 'amount',
    label: 'Nominal',
    align: 'right',
    field: 'amount',
    sortable: false,
  },
  {
    name: 'duration',
    label: 'Tenor (bulan)',
    align: 'right',
    field: 'duration',
    sortable: false,
  },
  {
    name: 'returnPercentage',
    label: 'Return % per Bulan',
    align: 'right',
    field: 'returnPercentage',
    sortable: false,
  },
  // {
  //   name: 'attachFile',
  //   label: 'Lampiran',
  //   align: 'left',
  //   field: 'attachFile', // TODO: file
  //   sortable: false,
  // },
  {
    name: 'notes',
    label: 'Keterangan',
    align: 'left',
    field: 'notes',
    sortable: false,
  },
];
const pagination: Ref<NonNullable<QTablePropsOnRequestPagination>> = ref({
  sortBy: 'created_at',
  descending: true,
  page: 0,
  rowsPerPage: 20,
  rowsNumber: 0,
});

const onRequest: QTableProps['onRequest'] = (tableProps) => {
  loading.value = true;

  const searchParams = new URLSearchParams();
  searchParams.append('view', 'aging');
  const tablePropsRequest: QTablePropsOnRequest = tableProps;
  if (filterSearch.value) {
    searchParams.append('query', filterSearch.value);
  }
  // loop props.filter and append to searchParams
  for (const key in props.filter) {
    const value = props.filter[key as keyof ContractAgingFilter];
    if (typeof value === 'string' && value.trim() !== '') {
      searchParams.append(key, value);
    }
  }

  tablePropsRequest.params = searchParams;

  paginationRequest<ContractAgingResponse>('/api/contracts', tablePropsRequest, pagination)
    .then((response: DefaultResponse<PageTableDto<ContractAgingResponse>>) => {
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
  refresh() {
    tableRef.value.requestServerInteraction();
  },
});
</script>
