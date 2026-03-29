<template>
  <q-input
    v-model="displayRange"
    :placeholder="placeholder"
    bg-color="white"
    outlined
    dense
    clearable
    :rules="rules"
    @clear="onClear"
  >
    <q-popup-proxy ref="qDatePopupRef" transition-show="scale" transition-hide="scale">
      <q-date v-model="rangeDate" :range="range" @range-end="onRangeEnd" />
    </q-popup-proxy>
    <template v-slot:prepend>
      <q-icon name="event" />
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { QPopupProxy, ValidationRule } from 'quasar';
import { RangeDateDto, QSingularRangeDate } from '@/types/range-date';
import { date } from 'quasar';
import { useDate } from '@/composables/date';

const DEFAULT_PLACEHOLDER = 'Choose date range';

const model = defineModel<RangeDateDto | Date>();

const isRangeDateDto = (model: RangeDateDto | Date): model is RangeDateDto => {
  return (<RangeDateDto>model).from !== undefined;
};

interface Props {
  clearable?: boolean;
  placeholder?: string;
  rules?: ValidationRule[];
  range?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: DEFAULT_PLACEHOLDER,
});

const qDatePopupRef = ref<QPopupProxy>();

const { DISPLAY_DATE_FORMAT } = useDate();

const rangeDate = ref();

if (!props.range) {
  watch(rangeDate, () => {
    model.value = new Date(rangeDate.value);

    qDatePopupRef.value?.hide();
  });
}

const displayRange = computed(() => {
  if (!model.value) {
    return undefined;
  }

  if (isRangeDateDto(model.value)) {
    const formattedFrom = date.formatDate(model.value.from, DISPLAY_DATE_FORMAT);
    const formattedTo = date.formatDate(model.value.to, DISPLAY_DATE_FORMAT);
    return `${formattedFrom} - ${formattedTo}`;
  }
  return date.formatDate(model.value, DISPLAY_DATE_FORMAT);
});

const onRangeEnd = (value: { from: QSingularRangeDate; to: QSingularRangeDate }) => {
  const from = new Date(value.from.year, value.from.month - 1, value.from.day);
  const to = new Date(value.to.year, value.to.month - 1, value.to.day);

  model.value = {
    from: from,
    to: to,
  };

  qDatePopupRef.value?.hide();
};

const onClear = () => {
  model.value = undefined;
};
</script>
