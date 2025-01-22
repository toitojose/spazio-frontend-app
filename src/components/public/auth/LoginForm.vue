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
    <div class="mb-4">
      <PButton
        id="loginButton"
        type="submit"
        :label="$t('login.loginButton')"
        :loading="isLoading"
        class="w-full"
        size="small" />
    </div>
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Checkbox
          v-model="rememberMe"
          inputId="rememberMe"
          name="rememberMe"
          size="small"
          value="true" />
        <label
          for="rememberMe"
          class="text-sm"
          >{{ $t('login.rememberMe') }}</label
        >
      </div>
      <router-link
        to="/reset-password"
        class="text-blue-500 hover:underline">
        {{ $t('login.forgetPassword') }}
      </router-link>
    </div>

    <!-- Or with Email -->
    <div class="my-4 flex items-center">
      <div class="h-px flex-grow bg-gray-300"></div>
      <span class="px-2 text-sm text-gray-500">{{ $t('register.withEmail') }}</span>
      <div class="h-px flex-grow bg-gray-300"></div>
    </div>

    <!-- Google and Apple Buttons -->
    <div class="flex space-x-4">
      <Button
        size="small"
        :label="$t('login.loginGoogle')"
        icon="pi pi-google"
        class="w-full border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        @click="cominSoon()" />
      <Button
        size="small"
        :label="$t('login.loginFacebook')"
        icon="pi pi-facebook"
        class="w-full border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        @click="cominSoon()" />
    </div>

    <!-- Sign In Link -->
    <p class="mt-4 text-center text-sm">
      {{ $t('login.noAccount') }}
      <Button
        size="small"
        severity="primary"
        variant="text"
        :label="$t('register.callToAction')"
        class="hover:underline"
        @click.prevent="$emit('toggleForm')" />
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { InputText, Password, Button as PButton, Message, Button, Checkbox } from 'primevue';
import { LoginService } from '@/services/login-service.ts';
import { authBackendClient } from '@/services/auth-backend-client.ts';
import { errorHandlerService } from '@/services/error-handler-service.ts';
import { useUserStore } from '@/store/user.ts';
import type { AxiosError } from 'axios';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const { t } = useI18n();
const rememberMe = ref(false);

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
      userStore.setUser({ id: user.id, firstname: user.firstname, lastname: user.lastname, roles: user.roles }, token);

      const emit = defineEmits<{ (e: 'loginSuccess', data: { user: any; token: string }) }>();
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

const cominSoon = () => {
  alert('Coming soon');
};
</script>
