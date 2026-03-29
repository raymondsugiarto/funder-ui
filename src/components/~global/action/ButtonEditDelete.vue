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
      :to="targetEdit"
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
  props: {
    type: Object,
    required: true,
  },
  targetEdit: {
    type: [String, Object],
    required: false,
  },
});

const emit = defineEmits(['delete']);

const onDeleted = () => {
  emit('delete', props);
};
</script>
