<template>
  <Auth :title="$t('login.title')" :subtitle="$t('login.subtitle')">
    <form @submit.prevent="onSubmit">
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
import Auth from '@/layout/public/auth/Auth.vue';

export default defineComponent({
  name: 'Login',
  components: {
    Auth,
    InputText,
    Password,
    Button,
    ProgressSpinner,
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const errorMessage = ref('');
    const router = useRouter();
    const { t } = useI18n();

    const sanitizeMail = (mail: string): string => mail.toLowerCase().trim();

    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const onSubmit = async () => {
      errorMessage.value = '';

      if (!isValidEmail(email.value)) {
        errorMessage.value = t('login.invalidEmail');
        return;
      }

      if (password.value.length < 8) {
        errorMessage.value = t('login.weakPassword');
        return;
      }

      isLoading.value = true;
      const sanitizedMail = sanitizeMail(email.value);

      try {
        const user = await fakeLoginService(sanitizedMail, password.value);
        if (user) {
          router.push({ name: 'dashboard' });
        }
      } catch (error) {
        errorMessage.value = t('login.failed');
      } finally {
        isLoading.value = false;
      }
    };

    const fakeLoginService = async (email: string, password: string): Promise<any> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'test@spazio.com' && password === '123456') {
            resolve({ name: 'Test User' });
          } else {
            reject();
          }
        }, 1000);
      });
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
