<template>
  <form @submit.prevent="onSubmit">
    <div
      v-if="errorMessage"
      class="mb-4">
      <Message
        severity="error"
        size="small"
        >{{ errorMessage }}</Message
      >
    </div>
    <div class="mb-4">
      <InputText
        v-model="email"
        :placeholder="$t('login.email')"
        :class="{ 'p-invalid': email === '' && errorMessage !== '' }"
        size="small"
        class="w-full" />
      <small
        v-if="email === '' && errorMessage !== ''"
        class="p-error">
        {{ $t('login.emptyEmail') }}
      </small>
    </div>
    <div class="mb-4">
      <Password
        v-model="password"
        :feedback="false"
        :placeholder="$t('login.password')"
        :class="{ 'p-invalid': password === '' && errorMessage !== '' }"
        size="small"
        fluid
        class="w-full" />
      <small
        v-if="password === '' && errorMessage !== ''"
        class="p-error">
        {{ $t('login.emptyPassword') }}
      </small>
    </div>
    <div class="mb-4 text-center">
      <PButton
        id="loginButton"
        type="submit"
        :label="$t('login.loginButton')"
        :loading="isLoading"
        class="w-full"
        size="small" />
    </div>
    <div class="text-center">
      <router-link
        to="/reset-password"
        class="text-blue-500 hover:underline">
        {{ $t('login.forgetPassword') }}
      </router-link>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { InputText, Password, Button as PButton, ProgressSpinner, Message } from 'primevue';

import { LoginService } from '@/services/login-service.ts';
import { authBackendClient } from '@/services/auth-backend-client.ts';
import { errorHandlerService } from '@/services/error-handler-service.ts';
import { useUserStore } from '@/store/user.ts';
import type { AxiosError } from 'axios';

export default defineComponent({
  name: 'LoginForm',
  components: {
    InputText,
    Password,
    PButton,
    ProgressSpinner,
    Message,
  },
  emits: ['loginSuccess'],
  setup(_, { emit }) {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const isLoading = ref(false);
    const { t } = useI18n();

    const loginService = new LoginService(authBackendClient);

    const sanitizeMail = (mail: string): string => mail.toLowerCase().trim();

    const handleLogin = async () => {
      try {
        const sanitizedEmail = sanitizeMail(email.value);
        const response = await loginService.login(sanitizedEmail, password.value);

        if (response.result && response.data) {
          const { user, token } = response.data;

          // Guardar usuario en Pinia
          const userStore = useUserStore();
          userStore.setUser({ id: user.id, username: user.username, roles: user.roles }, token);

          emit('loginSuccess', { user, token });
        } else if (response.error?.key) {
          errorMessage.value = t(`error.${response.error.key}`) || t('error.unhandled');
        } else {
          errorMessage.value = t('error.unhandled');
        }
      } catch (error) {
        const handledError = errorHandlerService.handleError(error as AxiosError);
        errorMessage.value = t(`error.${handledError.key}`) || handledError.message || t('error.unhandled');
      } finally {
        isLoading.value = false;
      }
    };

    const onSubmit = async () => {
      errorMessage.value = '';
      if (!email.value.trim() || !password.value.trim()) {
        errorMessage.value = t('login.emptyFields');
        return;
      }
      isLoading.value = true;
      await handleLogin();
    };

    return {
      email,
      password,
      isLoading,
      errorMessage,
      onSubmit,
    };
  },
});
</script>
