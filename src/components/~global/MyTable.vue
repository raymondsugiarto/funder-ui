<template>
  <q-table ref="qTableRef" v-bind="passThroughProps">
    <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAttrs } from 'vue';
import { ref } from 'vue';
import type { QTable, QTableProps } from 'quasar';

defineOptions({
  name: 'BaseTable',
  inheritAttrs: false,
});

const filter = ref('');

interface TableProps extends QTableProps {
  stickyHeaderOffset?: number;
}

const props = defineProps<TableProps>();
const attrs = useAttrs();
const qTableRef = ref<QTable | null>(null);

const tableProps = computed<QTableProps>(() => {
  const { stickyHeaderOffset, virtualScrollStickySizeStart, ...rest } = props;

  return {
    ...rest,
    virtualScrollStickySizeStart: stickyHeaderOffset ?? virtualScrollStickySizeStart,
  } as QTableProps;
});

const passThroughProps = computed(() => {
  return {
    ...tableProps.value,
    ...attrs,
  };
});

defineExpose(
  new Proxy(
    {},
    {
      get(_, key) {
        if (key === 'qTable') {
          return qTableRef.value;
        }

        return qTableRef.value?.[key as keyof QTable];
      },
      has(_, key) {
        if (key === 'qTable') {
          return true;
        }

        return key in (qTableRef.value ?? {});
      },
    },
  ) as QTable & { qTable: QTable | null },
);
</script>
