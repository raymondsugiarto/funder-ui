<template>
  <div class="text-center">
    <div class="text-h5 q-my-md">Welcome</div>
    <q-separator></q-separator>
    <div class="q-pa-lg">
      <SignInForm></SignInForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SignInForm from '@/components/authentication/SignInForm.vue';
</script>
