<template>
  <my-table
    ref="tableRef"
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    :loading="loading"
    class="sticky-table"
    :filter="filter"
    module-name="Pembayaran Funder"
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
    :deleteItem="selectedItem?.contract.contractCode ?? ''"
    :api-url="`/api/contract-payments/${selectedItem?.id}`"
    success-message="Pembayaran berhasil dihapus"
    error-message="Gagal menghapus Pembayaran"
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
import type {
  PageTableDto,
  QTablePropsOnRequest,
  QTablePropsOnRequestPagination,
} from 'src/types/pagination/pagination';
import type { DefaultResponse } from 'src/types/response';
import { useDate } from 'src/composables/date';
import type { ContractPaymentResponse } from './types/contract-payment';
import DeleteConfirmationDialog from '../~global/dialog/DeleteConfirmationDialog.vue';
import { useNumber } from 'src/composables/number';

const $q = useQuasar();
const { DISPLAY_DATE_FORMAT } = useDate();
const { paginationRequest } = usePagination(api);
const rows = ref([] as ContractPaymentResponse[]);
const tableRef = ref() as Ref<QTable>;
const loading = ref(false);
const confirm = ref(false);
const selectedItem = ref<ContractPaymentResponse>();
const filter = ref('');

interface Emit {
  (event: 'edit', row: ContractPaymentResponse): void;
}
const emit = defineEmits<Emit>();
const { formatCurrency } = useNumber();

const columns: QTableColumn[] = [
  {
    name: 'id',
    label: '#',
    align: 'left',
    field: 'id',
    sortable: false,
  },
  {
    name: 'contractNumber',
    label: 'No Urut Perjanjian',
    align: 'left',
    field: (row) => row.contract?.contractNumber,
    sortable: false,
  },
  {
    name: 'contractCode',
    label: 'Nomor Perjanjian',
    align: 'left',
    field: (row) => row.contract?.contractCode,
    sortable: false,
  },
  {
    name: 'paymentAt',
    label: 'Tanggal Pembayaran',
    align: 'left',
    field: (row) => date.formatDate(row.paymentAt, DISPLAY_DATE_FORMAT),
    sortable: false,
  },
  {
    name: 'paymentAmount',
    label: 'Nominal Pembayaran',
    align: 'right',
    field: (row) => formatCurrency(row.paymentAmount),
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

const handleEdit = (row: ContractPaymentResponse) => {
  selectedItem.value = row;
  emit('edit', row);
};

const handleDelete = (row: ContractPaymentResponse) => {
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

  paginationRequest<ContractPaymentResponse>(
    '/api/contract-payments',
    tablePropsRequest,
    pagination,
  )
    .then((response: DefaultResponse<PageTableDto<ContractPaymentResponse>>) => {
      rows.value = response.data.contents;
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        message: 'Gagal memuat data pembayaran',
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
