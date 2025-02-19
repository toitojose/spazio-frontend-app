<template>
  <div>
    <div
      v-if="isSuccess"
      class="animate-fade-in p-6 text-center">
      <i
        class="pi pi-check-circle animate-bounce-in text-green-500"
        style="font-size: 4rem"></i>
      <h2 class="mt-4 text-2xl font-bold text-green-600">{{ $t('register.successTitle') }}</h2>
      <p class="mt-2 text-gray-600">{{ $t('register.successMessage') }}</p>
      <Button
        size="small"
        :label="$t('login.title')"
        icon="pi pi-sign-in"
        class="mt-6 bg-blue-600 text-white hover:bg-blue-700"
        @click.prevent="$emit('toggleForm')" />
    </div>

    <Form
      v-else
      class="signup-form pt-2"
      @submit="onSubmit">
      <!-- Error Message -->
      <Message
        v-if="errorMessage"
        severity="error"
        icon="pi pi-times-circle"
        class="mb-2">
        {{ errorMessage }}
      </Message>

      <div class="space-y-8 pt-4">
        <!-- Nombres y Apellidos -->
        <div class="flex space-x-4">
          <FloatLabel
            variant="on"
            class="w-full">
            <InputText
              id="firstName"
              v-model="firstName"
              size="small"
              class="w-full" />
            <label for="firstName">{{ $t('register.firstName') }}</label>
          </FloatLabel>

          <FloatLabel
            variant="on"
            class="w-full">
            <InputText
              id="middleName"
              v-model="middleName"
              size="small"
              class="w-full" />
            <label for="middleName">{{ $t('register.middleName') }}</label>
          </FloatLabel>
        </div>

        <div class="flex space-x-4">
          <FloatLabel
            variant="on"
            class="w-full">
            <InputText
              id="lastName"
              v-model="lastName"
              size="small"
              class="w-full" />
            <label for="lastName">{{ $t('register.lastName') }}</label>
          </FloatLabel>

          <FloatLabel
            variant="on"
            class="w-full">
            <InputText
              id="secondLastName"
              v-model="secondLastName"
              size="small"
              class="w-full" />
            <label for="secondLastName">{{ $t('register.secondLastName') }}</label>
          </FloatLabel>
        </div>

        <!-- Correo Electrónico -->
        <FloatLabel>
          <InputText
            id="email"
            v-model="email"
            type="email"
            size="small"
            class="w-full" />
          <label for="email">{{ $t('register.email') }}</label>
        </FloatLabel>

        <div class="flex space-x-4">
          <div class="w-1/2">
            <!-- Contraseña -->
            <FloatLabel
              variant="on"
              class="w-full">
              <Password
                id="password"
                v-model="password"
                toggleMask
                size="small"
                class="w-full" />
              <label for="password">{{ $t('register.password') }}</label>
            </FloatLabel>
          </div>
          <div class="w-1/2">
            <!-- Confirmar Contraseña -->
            <FloatLabel
              variant="on"
              class="w-full">
              <Password
                id="confirmPassword"
                v-model="confirmPassword"
                toggleMask
                size="small"
                class="w-full" />
              <label for="confirmPassword">{{ $t('register.confirmPassword') }}</label>
            </FloatLabel>
            <Message
              v-if="password !== confirmPassword && confirmPassword !== ''"
              severity="error"
              size="small"
              variant="simple">
              {{ $t('register.passwordMismatch') }}
            </Message>
          </div>
        </div>

        <div class="flex space-x-4">
          <label>¿Como te identificas?:</label>
          <div class="flex items-center space-x-2">
            <RadioButton
              v-model="roleType"
              inputId="renter"
              name="roleType"
              value="RENTER" />
            <label
              for="renter"
              class="text-sm">
              {{ $t('register.renter') }}
            </label>
          </div>

          <div class="flex items-center space-x-2">
            <RadioButton
              v-model="roleType"
              inputId="propertyOwner"
              name="roleType"
              value="PROPERTY_OWNER" />
            <label
              for="propertyOwner"
              class="text-sm">
              {{ $t('register.propertyOwner') }}
            </label>
          </div>
        </div>

        <!-- Botón de Registro -->
        <Button
          size="small"
          type="submit"
          :label="$t('register.signUpButton')"
          :disabled="password !== confirmPassword || !password"
          :loading="isLoading"
          class="w-full" />
      </div>

      <!-- Enlace para iniciar sesión -->
      <p class="mt-4 text-center text-sm">
        {{ $t('register.hasAccount') }}
        <Button
          size="small"
          variant="text"
          severity="primary"
          :label="$t('login.callToAction')"
          class="hover:underline"
          @click.prevent="$emit('toggleForm')" />
      </p>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InputText, Password, Button, Message, RadioButton, FloatLabel } from 'primevue';
import { Form } from '@primevue/forms';
import { useI18n } from 'vue-i18n';
import { SignupService } from '@/services/signup-service.ts';
import { backendClient } from '@/services/backend-client.ts';
import { useUserStore } from '@/store/user.ts';
import { errorHandlerService } from '@/services/error-handler-service.ts';
import type { AxiosError } from 'axios';
import type { SignupInterface, SignupResult } from '@/interfaces/auth/sign-up.interface.ts';
import type { User } from '@/interfaces/user.interface.ts';

const { t: $t } = useI18n();
const signupService = new SignupService(backendClient);
const isLoading = ref(false);
const errorMessage = ref('');
const isSuccess = ref(false);

const firstName = ref('');
const middleName = ref('');
const lastName = ref('');
const secondLastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const roleType = ref('RENTER');

const onSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const signupData = prepareSignupData();
    const response = await signupService.signup(signupData);

    if (response.result && response.data) {
      storeUserData(response.data.user, response.data.token);
      handleSignupSuccess(response.data.user, response.data.token);
    } else {
      handleSignupError(response);
    }
  } catch (error) {
    handleUnexpectedError(error);
  } finally {
    isLoading.value = false;
  }
};

const prepareSignupData = (): SignupInterface => ({
  firstName: firstName.value,
  middleName: middleName.value || undefined,
  lastName: lastName.value,
  secondLastName: secondLastName.value || undefined,
  email: email.value,
  password: password.value,
  roleType: roleType.value as 'RENTER' | 'PROPERTY_OWNER',
});

const storeUserData = (user: User, token: string) => {
  const userStore = useUserStore();
  userStore.setUser(
    {
      id: user.id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      roles: user.roles || [],
      lastLoginAt: user.lastLoginAt,
    },
    token,
  );
};

const handleSignupSuccess = (user: User, token: string) => {
  isSuccess.value = true;
  const emit = defineEmits(['signupSuccess']);
  emit('signupSuccess', { user, token });
};

const handleSignupError = (response: SignupResult) => {
  if (response.error?.key) {
    errorMessage.value = $t(`error.${response.error.key}`) || $t('error.unhandled');
  } else {
    errorMessage.value = $t('error.unhandled');
  }
};

const handleUnexpectedError = (error: any) => {
  const handledError = errorHandlerService.handleError(error as AxiosError);
  errorMessage.value = $t(`error.${handledError.key}`) || handledError.message || $t('error.unhandled');
};
</script>

<style>
.signup-form .p-password .p-password-input {
  @apply w-full;
}
</style>
