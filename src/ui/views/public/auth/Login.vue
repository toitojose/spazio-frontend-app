<template>
  <Auth :title="$t('login.title')" :subtitle="$t('login.subtitle')">
    <form @submit.prevent="onSubmit">
      <div v-if="errorMessage" class="mb-4">
        <Message severity="error" size="small">{{ errorMessage }}</Message>
      </div>
      <div class="mb-4">
        <InputText v-model="email" :placeholder="$t('login.email')" :class="{ 'p-invalid': email === '' && errorMessage !== '' }" size="small" class="w-full" />
        <small v-if="email === '' && errorMessage !== ''" class="p-error">
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
          class="w-full"
        />
        <small v-if="password === '' && errorMessage !== ''" class="p-error">
          {{ $t('login.emptyPassword') }}
        </small>
      </div>
      <div class="text-center mb-4">
        <Button id="loginButton" type="submit" :label="$t('login.loginButton')" class="w-full" size="small" />
      </div>
      <div class="text-center">
        <router-link to="/reset-password" class="text-blue-500 hover:underline">
          {{ $t('login.forgetPassword') }}
        </router-link>
      </div>
    </form>
    <div v-if="isLoading" class="flex justify-center mt-4">
      <ProgressSpinner />
    </div>
  </Auth>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import Auth from '@/layout/public/auth/Auth.vue';
import { LoginService } from '@/services/login-service.ts';
import { authBackendClient } from '@/services/auth-backend-client.ts';
import { errorHandlerService } from '@/services/error-handler-service.ts';
import { useUserStore } from '@/store/user.ts';
import type { AxiosError } from 'axios';

export default defineComponent({
  name: 'Login',
  components: {
    Auth,
    InputText,
    Password,
    Button,
    ProgressSpinner,
    Message,
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const errorMessage = ref('');
    const router = useRouter();
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

          router.push({ name: 'dashboard' });
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

<style scoped>
.p-error {
  color: var(--aura-error);
  font-size: 0.875rem;
}
</style>
