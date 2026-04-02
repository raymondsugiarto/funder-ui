<template>
  <q-page class="q-pa-md">
    <div class="q-my-md text-h6">Perjanjian Kontrak</div>
    <q-card>
      <q-card-section>
        <ContractForm v-model="form"></ContractForm>
      </q-card-section>
    </q-card>
    <q-card>
      <FunderTable></FunderTable>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { contractFormDto } from 'src/components/contract/contract';
import ContractForm from 'src/components/contract/ContractForm.vue';
import { ref } from 'vue';

const form = ref({ ...contractFormDto });
</script>
