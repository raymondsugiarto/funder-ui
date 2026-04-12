<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div>
    <q-btn
      flat
      dense
      round
      size="sm"
      icon="edit"
      aria-label="Edit"
      color="warning"
      @click="onEdit"
    />
    <q-btn
      flat
      dense
      round
      size="sm"
      icon="delete"
      aria-label="Delete"
      color="negative"
      @click="onDeleted"
    />
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  targetEdit: {
    type: [String, Object],
    required: false,
  },
});

interface Emit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event: 'delete', row: any): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event: 'edit', row: any): void;
}
const emit = defineEmits<Emit>();

const onDeleted = () => {
  emit('delete', props.row);
};

const onEdit = () => {
  emit('edit', props.row);
};
</script>
