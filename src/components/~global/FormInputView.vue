<template>
  <div class="row q-mb-md">
    <div class="col-6 col-md-2 text-bold">{{ props.label }}:</div>
    <div class="col-auto">: {{ props.value }}</div>
  </div>
</template>

<script lang="ts" setup>
interface FormInputViewProps {
  label: string;
  value: string | number;
}
const props = defineProps<FormInputViewProps>();
</script>
