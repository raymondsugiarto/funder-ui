<template>
  <q-layout view="lHh lpr lff" class="bg-grey-2">
    <q-page-container>
      <router-view v-slot="{ Component }">
        <div>
          <div class="row justify-center">
            <div
              class="col-4 col-md-3 col-xs-12 bg-white dplk-rounded-md shadow-1"
              :class="$q.screen.gt.sm ? 'fixed-center' : ''"
            >
              <transition name="fade-transform" mode="out-in">
                <component :is="Component" />
              </transition>
            </div>
          </div>
        </div>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';

const $q = useQuasar();
</script>
