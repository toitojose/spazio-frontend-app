<template>
  <form @submit.prevent="onSubmit">
    <!-- Error Message -->
    <Message
      v-if="errorMessage"
      severity="error"
      icon="pi pi-times-circle"
      class="mb-2">
      {{ errorMessage }}
    </Message>

    <!-- First Name and Last Name -->
    <div class="mb-4 flex space-x-4">
      <div class="w-full">
        <InputText
          v-model="firstname"
          size="small"
          :placeholder="$t('register.firstname')"
          :invalid="!!firstnameError"
          class="w-full"
          @blur="firstnameBlur" />
        <Message
          v-if="firstnameError"
          size="small"
          severity="error"
          variant="simple">
          {{ firstnameError }}
        </Message>
      </div>
      <div class="w-full">
        <InputText
          v-model="lastname"
          size="small"
          :placeholder="$t('register.lastname')"
          :invalid="!!lastnameError"
          class="w-full"
          @blur="lastnameBlur" />
        <Message
          v-if="lastnameError"
          size="small"
          severity="error"
          variant="simple">
          {{ lastnameError }}
        </Message>
      </div>
    </div>

    <!-- Email -->
    <div class="mb-4">
      <InputText
        v-model="email"
        size="small"
        :placeholder="$t('register.email')"
        type="email"
        :invalid="!!emailError"
        class="w-full"
        @blur="emailBlur" />
      <Message
        v-if="emailError"
        size="small"
        severity="error"
        variant="simple">
        {{ emailError }}
      </Message>
    </div>

    <!-- Password -->
    <div class="mb-6">
      <Password
        v-model="password"
        :placeholder="$t('register.password')"
        toggleMask
        size="small"
        :feedback="false"
        :invalid="!!passwordError"
        inputClass="w-full"
        class="w-full"
        @blur="passwordBlur" />
      <Message
        v-if="passwordError"
        size="small"
        severity="error"
        variant="simple">
        {{ passwordError }}
      </Message>
    </div>

    <!-- Sign Up Button -->
    <Button
      size="small"
      :label="$t('register.signUpButton')"
      type="submit"
      :loading="isLoading"
      class="w-full bg-blue-600 text-white hover:bg-blue-700" />

    <!-- Sign In Link -->
    <p class="mt-4 text-center text-sm">
      {{ $t('register.hasAccount') }}
      <a
        href="/login"
        class="text-blue-600 hover:underline">
        {{ $t('login.title') }}
      </a>
    </p>

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
        :label="$t('register.signUpGoogle')"
        icon="pi pi-google"
        class="w-full border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        @click="CominSoon()" />
      <Button
        size="small"
        :label="$t('register.signUpFacebook')"
        icon="pi pi-facebook"
        class="w-full border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        @click="CominSoon()" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InputText, Password, Button, Message } from 'primevue';
import { useI18n } from 'vue-i18n';
import { SignupService } from '@/services/signup-service';
import { authBackendClient } from '@/services/auth-backend-client';
import { useUserStore } from '@/store/user';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { errorHandlerService } from '@/services/error-handler-service.ts';
import type { AxiosError } from 'axios';

const { t: $t } = useI18n();
const signupService = new SignupService(authBackendClient);
const isLoading = ref(false);
const errorMessage = ref('');
const emit = defineEmits<{ (e: 'signupSuccess', payload: { user: any; token: string }): void }>();

const schema = yup.object({
  firstname: yup.string().required($t('register.emptyFields')),
  lastname: yup.string().required($t('register.emptyFields')),
  email: yup.string().email($t('register.invalidEmail')).required($t('register.emptyFields')),
  password: yup.string().min(6, $t('register.shortPassword')).required($t('register.emptyFields')),
});

const { handleSubmit } = useForm({ validationSchema: schema });

const { value: firstname, errorMessage: firstnameError, handleBlur: firstnameBlur } = useField<string>('firstname');
const { value: lastname, errorMessage: lastnameError, handleBlur: lastnameBlur } = useField<string>('lastname');
const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField<string>('email');
const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField<string>('password');

const handleSignup = async () => {
  try {
    const response = await signupService.signup(firstname.value, lastname.value, email.value, password.value);
    console.log('=>(RegisterForm.vue:163) response', response);

    if (response.result && response.data) {
      const { user, token } = response.data;
      const userStore = useUserStore();
      userStore.setUser({ id: user.id, firstname: user.firstname, lastname: user.lastname, roles: user.roles }, token);
      emit('signupSuccess', { user, token });
    } else if (response.error?.key) {
      errorMessage.value = $t(`error.${response.error.key}`) || $t('error.unhandled');
    } else {
      errorMessage.value = $t('error.unhandled');
    }
  } catch (error) {
    const handledError = errorHandlerService.handleError(error as AxiosError);
    errorMessage.value = $t(`error.${handledError.key}`) || handledError.message || t('error.unhandled');
  } finally {
    isLoading.value = false;
  }
};

const onSubmit = handleSubmit(async () => {
  isLoading.value = true;
  errorMessage.value = '';
  await handleSignup();
});

const CominSoon = () => {
  alert('Comming Soon');
};
</script>

<style scoped>
/* No se modificó */
</style>
