<template>
  <q-page class="q-pa-md">
    <div class="q-my-md text-h6">Funder</div>
    <q-card>
      <q-card-section>
        <FunderForm v-model="form"></FunderForm>
      </q-card-section>
    </q-card>
    <q-card>
      <FunderTable></FunderTable>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { funderDto } from 'src/components/funder/funder';
import FunderForm from 'src/components/funder/FunderForm.vue';
import FunderTable from 'src/components/funder/FunderTable.vue';
import { FunderDto } from 'src/components/funder/types/funder';
import { ref } from 'vue';

const form = ref<FunderDto>({ ...funderDto });
</script>
