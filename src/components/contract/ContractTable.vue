<template>
  <my-table
    ref="tableRef"
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    :loading="loading"
    class="sticky-table"
    module-name="Kontrak"
    v-model:filter="filter"
    @request="onRequest"
  >
    <template v-slot:body-cell-id="props">
      <q-td key="id" :props="props" auto-width>
        <ButtonEditDelete :row="props.row" @edit="handleEdit" @delete="handleDelete">
        </ButtonEditDelete>
      </q-td>
    </template>
  </my-table>
  <DeleteConfirmationDialog
    v-model="confirm"
    :deleteItem="selectedItem?.contractCode ?? ''"
    :api-url="`/api/contracts/${selectedItem?.id}`"
    success-message="Kontrak berhasil dihapus"
    error-message="Gagal menghapus Kontrak"
    @deleteSuccess="tableRef.requestServerInteraction()"
  />
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import MyTable from '@global/MyTable.vue';
import ButtonEditDelete from '@global/action/ButtonEditDelete.vue';
import type { QTable, QTableColumn, QTableProps } from 'quasar';
import { date, useQuasar } from 'quasar';
import { usePagination } from 'src/composables/pagination/pagination';
import { api } from 'src/boot/axios';
import type { ContractResponse } from './types/contract';
import type {
  PageTableDto,
  QTablePropsOnRequest,
  QTablePropsOnRequestPagination,
} from 'src/types/pagination/pagination';
import type { DefaultResponse } from 'src/types/response';
import { useDate } from 'src/composables/date';
import DeleteConfirmationDialog from '../~global/dialog/DeleteConfirmationDialog.vue';

const $q = useQuasar();
const { DISPLAY_DATE_FORMAT } = useDate();
const { paginationRequest } = usePagination(api);
const rows = ref([] as ContractResponse[]);
const tableRef = ref() as Ref<QTable>;
const loading = ref(false);
const confirm = ref(false);
const selectedItem = ref<ContractResponse>();
const filter = ref('');

interface Emit {
  (event: 'edit', row: ContractResponse): void;
}
const emit = defineEmits<Emit>();

const columns: QTableColumn[] = [
  {
    name: 'id',
    label: '#',
    align: 'left',
    field: 'id',
    sortable: false,
  },
  {
    name: 'funder',
    label: 'Funder',
    align: 'left',
    field: (row) => row.funder?.name ?? '',
    sortable: false,
  },
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
    name: 'dueDate',
    label: 'Tanggal Jatuh Tempo',
    align: 'right',
    field: (row) => date.formatDate(row.dueDate, DISPLAY_DATE_FORMAT),
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
    name: 'destinationAccount',
    label: 'Rekening Tujuan',
    align: 'left',
    field: 'destinationAccount',
    sortable: false,
  },
  {
    name: 'notes',
    label: 'Keterangan',
    align: 'left',
    field: 'notes',
    sortable: false,
  },
];

const pagination: Ref<NonNullable<QTablePropsOnRequestPagination>> = ref({
  sortBy: 'updated_at',
  descending: true,
  page: 0,
  rowsPerPage: 20,
  rowsNumber: 0,
});

const handleEdit = (row: ContractResponse) => {
  selectedItem.value = row;
  emit('edit', row);
};

const handleDelete = (row: ContractResponse) => {
  selectedItem.value = row;
  confirm.value = true;
};

const onRequest: QTableProps['onRequest'] = (tableProps) => {
  loading.value = true;

  const searchParams = new URLSearchParams();
  const tablePropsRequest: QTablePropsOnRequest = tableProps;
  if (filter.value) {
    searchParams.append('query', filter.value);
  }
  tablePropsRequest.params = searchParams;

  paginationRequest<ContractResponse>('/api/contracts', tablePropsRequest, pagination)
    .then((response: DefaultResponse<PageTableDto<ContractResponse>>) => {
      rows.value = response.data.contents;
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        message: 'Gagal memuat data kontrak',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  tableRef.value.requestServerInteraction();
});

defineExpose({
  refresh() {
    tableRef.value.requestServerInteraction();
  },
});
</script>
