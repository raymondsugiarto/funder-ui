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
          :targetEdit="`/customer/${props.row.id}`"
          @delete="
            deleteItem = props.row.name;
            deleteItemId = props.row.id;
            confirm = true;
          "
        >
        </ButtonEditDelete>
      </q-td>
    </template>
  </my-table>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue';
import MyTable from '@global/MyTable.vue';
import { QTable, QTableColumn, QTableProps, useQuasar } from 'quasar';
import { usePagination } from 'src/composables/pagination/pagination';
import { api } from 'src/boot/axios';
import { FunderResponse } from './types/funder';
import {
  PageTableDto,
  QTablePropsOnRequest,
  QTablePropsOnRequestPagination,
} from 'src/types/pagination/pagination';
import { DefaultResponse } from 'src/types/response';

const $q = useQuasar();
const { paginationRequest } = usePagination(api);
const rows = ref([] as FunderResponse[]);
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
    name: 'name',
    label: 'Nama',
    align: 'left',
    field: 'name',
    sortable: false,
  },
  {
    name: 'address',
    label: 'Alamat',
    align: 'left',
    field: 'address',
    sortable: false,
  },
  {
    name: 'identityNumber',
    label: 'No. KTP',
    align: 'left',
    field: 'identityNumber',
    sortable: false,
  },
  {
    name: 'phoneNumber',
    label: 'No Handphone',
    align: 'left',
    field: 'phoneNumber',
    sortable: false,
  },
  {
    name: 'passportNumber',
    label: 'No. Paspor',
    align: 'left',
    field: 'passportNumber',
    sortable: false,
  },
  {
    name: 'studentCardNumber',
    label: 'No Kartu Pelajar',
    align: 'left',
    field: 'studentCardNumber',
    sortable: false,
  },
  {
    name: 'drivingLicenseNumber',
    label: 'No SIM',
    align: 'left',
    field: 'drivingLicenseNumber',
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

  await paginationRequest<FunderResponse>('/api/funders', tablePropsRequest, pagination)
    .then((response: DefaultResponse<PageTableDto<FunderResponse>>) => {
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

onMounted(() => {
  // get initial data from server (1st page)
  tableRef.value.requestServerInteraction();
});
</script>
