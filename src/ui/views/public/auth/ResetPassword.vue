<template>
  <Auth :title="$t('resetPassword.title')" :subtitle="$t('resetPassword.subtitle')">
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <InputText v-model="email" :placeholder="$t('resetPassword.email')" :class="{ 'p-invalid': email === '' && errorMessage !== '' }" size="small" class="w-full" />
        <small v-if="email === '' && errorMessage !== ''" class="p-error">
          {{ $t('resetPassword.emptyEmail') }}
        </small>
      </div>
      <div class="text-center mb-4">
        <Button id="resetPasswordButton" type="submit" :label="$t('resetPassword.submitButton')" class="w-full" size="small" />
      </div>
    </form>
    <div v-if="isLoading" class="flex justify-center mt-4">
      <ProgressSpinner />
    </div>
  </Auth>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import Auth from '@/layout/public/auth/Auth.vue';

export default defineComponent({
  name: 'ResetPassword',
  components: {
    Auth,
    InputText,
    Button,
    ProgressSpinner,
  },
  setup() {
    const email = ref('');
    const isLoading = ref(false);
    const errorMessage = ref('');
    const { t } = useI18n();

    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const onSubmit = async () => {
      errorMessage.value = '';

      if (!isValidEmail(email.value)) {
        errorMessage.value = t('resetPassword.invalidEmail');
        return;
      }

      isLoading.value = true;

      try {
        // Simulación del envío del correo de restablecimiento
        await fakeResetPasswordService(email.value);
        alert(t('resetPassword.successMessage')); // Cambia esto por la lógica de notificación o redirección que prefieras
      } catch (error) {
        errorMessage.value = t('resetPassword.failed');
      } finally {
        isLoading.value = false;
      }
    };

    const fakeResetPasswordService = async (email: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'user@spazio.com') {
            resolve();
          } else {
            reject();
          }
        }, 1000);
      });
    };

    return {
      email,
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
