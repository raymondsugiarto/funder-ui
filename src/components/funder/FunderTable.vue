<template>
  <my-table
    ref="tableRef"
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    :loading="loading"
    module-name="Funder"
    class="sticky-table"
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
    :deleteItem="selectedItem?.name ?? ''"
    :api-url="`/api/funders/${selectedItem?.id}`"
    success-message="Funder berhasil dihapus"
    error-message="Gagal menghapus funder"
    @deleteSuccess="tableRef.requestServerInteraction()"
  />
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import MyTable from '@global/MyTable.vue';
import type { QTable, QTableColumn, QTableProps } from 'quasar';
import { useQuasar } from 'quasar';
import { usePagination } from 'src/composables/pagination/pagination';
import { api } from 'src/boot/axios';
import type { FunderResponse } from './types/funder';
import type {
  PageTableDto,
  QTablePropsOnRequest,
  QTablePropsOnRequestPagination,
} from 'src/types/pagination/pagination';
import type { DefaultResponse } from 'src/types/response';
import ButtonEditDelete from '../~global/action/ButtonEditDelete.vue';
import DeleteConfirmationDialog from '../~global/dialog/DeleteConfirmationDialog.vue';

const $q = useQuasar();
const { paginationRequest } = usePagination(api);
const rows = ref([] as FunderResponse[]);
const tableRef = ref() as Ref<QTable>;
const loading = ref(false);
const confirm = ref(false);
const selectedItem = ref<FunderResponse>();
const filter = ref('');

interface Emit {
  (event: 'edit', row: FunderResponse): void;
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
    name: 'funderParent',
    label: 'Leader',
    align: 'left',
    field: (row) => row.funderParent?.name || '-',
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
    name: 'phoneNumber',
    label: 'No Whatsapp',
    align: 'left',
    field: 'phoneNumber',
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

const handleEdit = (row: FunderResponse) => {
  selectedItem.value = row;
  emit('edit', row);
};

const handleDelete = (row: FunderResponse) => {
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

  paginationRequest<FunderResponse>('/api/funders', tablePropsRequest, pagination)
    .then((response: DefaultResponse<PageTableDto<FunderResponse>>) => {
      rows.value = response.data.contents;
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        message: 'Gagal memuat data',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  // get initial data from server (1st page)
  tableRef.value.requestServerInteraction();
});

defineExpose({
  refresh() {
    tableRef.value.requestServerInteraction();
  },
});
</script>
