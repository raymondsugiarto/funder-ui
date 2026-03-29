<template>
  <q-form @submit="handleSignIn">
    <q-input
      :label="t('username')"
      outlined
      dense
      v-model="username"
      type="text"
      name="username"
      autocomplete="username"
      lazy-rules
      :rules="[(val) => !!val || t('required')]"
    >
    </q-input>

    <q-input
      :label="t('password')"
      outlined
      dense
      v-model="password"
      type="password"
      name="password"
      autocomplete="current-password"
      lazy-rules
      :rules="[(val) => !!val || t('required')]"
    >
    </q-input>
    <q-banner v-if="error" class="text-white bg-red">{{ t('usernamePasswordInvalid') }}</q-banner>
    <div class="q-mt-xl q-mb-md">
      <q-btn color="primary" class="full-width" :label="t('signIn')" type="submit" no-caps />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authentication/auth-store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(false);

const authStore = useAuthStore();

const handleSignIn = async () => {
  await authStore
    .signIn({
      username: username.value,
      password: password.value,
    })
    .then(async () => {
      loading.value = false;
      await router.push('/dashboard');
    })
    .catch(() => {
      error.value = true;
      loading.value = false;
    });
};
</script>
