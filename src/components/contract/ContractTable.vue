<template>
  <my-table
    flat
    bordered
    dense
    ref="tableRef"
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    :loading="loading"
    separator="cell"
    class="sticky-table"
    :filter="filter"
    @request="onRequest"
  >
    <template v-slot:top-right>
      <q-input debounce="300" v-model="filter" placeholder="Cari">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-id="props">
      <q-td key="id" :props="props" auto-width>
        <ButtonEditDelete
          :props="props"
          :targetEdit="`/contract/${props.row.id}`"
          @delete="
            deleteItem = props.row.id;
            deleteItemId = props.row.id;
            confirm = true;
          "
        />
      </q-td>
    </template>
  </my-table>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue';
import MyTable from '@global/MyTable.vue';
import ButtonEditDelete from '@global/action/ButtonEditDelete.vue';
import { QTable, QTableColumn, QTableProps, useQuasar } from 'quasar';
import { usePagination } from 'src/composables/pagination/pagination';
import { api } from 'src/boot/axios';
import { ContractResponse } from './types/contract';
import {
  PageTableDto,
  QTablePropsOnRequest,
  QTablePropsOnRequestPagination,
} from 'src/types/pagination/pagination';
import { DefaultResponse } from 'src/types/response';

const $q = useQuasar();
const { paginationRequest } = usePagination(api);
const rows = ref([] as ContractResponse[]);
const tableRef = ref() as Ref<QTable>;
const loading = ref(false);
const confirm = ref(false);
const deleteItem = ref('');
const deleteItemId = ref('');
const filter = ref('');

const columns: QTableColumn[] = [
  {
    name: 'id',
    label: '#',
    align: 'left',
    field: 'id',
    sortable: false,
  },
  {
    name: 'searchDate',
    label: 'Tanggal Pencarian',
    align: 'left',
    field: 'searchDate',
    sortable: false,
  },
  {
    name: 'nominal',
    label: 'Nominal',
    align: 'right',
    field: 'nominal',
    sortable: false,
  },
  {
    name: 'tenor',
    label: 'Tenor (bulan)',
    align: 'right',
    field: 'tenor',
    sortable: false,
  },
  {
    name: 'returnPercentPerMonth',
    label: 'Return % per Bulan',
    align: 'right',
    field: 'returnPercentPerMonth',
    sortable: false,
  },
  {
    name: 'attachFile',
    label: 'Lampiran',
    align: 'left',
    field: 'attachFile',
    sortable: false,
  },
  {
    name: 'description',
    label: 'Keterangan',
    align: 'left',
    field: 'description',
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

const onRequest: QTableProps['onRequest'] = async (tableProps) => {
  loading.value = true;

  const searchParams = new URLSearchParams();
  const tablePropsRequest: QTablePropsOnRequest = tableProps;
  if (filter.value) {
    searchParams.append('query', filter.value);
  }
  tablePropsRequest.params = searchParams;

  await paginationRequest<ContractResponse>('/api/contracts', tablePropsRequest, pagination)
    .then((response: DefaultResponse<PageTableDto<ContractResponse>>) => {
      rows.value = response.data.contents;
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        message: 'Gagal memuat data kontrak',
      });
    });
  loading.value = false;
};

onMounted(() => {
  tableRef.value.requestServerInteraction();
});
</script>
