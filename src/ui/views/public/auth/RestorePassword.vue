<template>
  <Auth :title="$t('restorePassword.title')" :subtitle="$t('restorePassword.subtitle')">
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <Password
          v-model="newPassword"
          :placeholder="$t('restorePassword.newPassword')"
          :feedback="false"
          :class="{ 'p-invalid': newPassword === '' && errorMessage !== '' }"
          size="small"
          fluid
          class="w-full"
        />
        <small v-if="newPassword === '' && errorMessage !== ''" class="p-error">
          {{ $t('restorePassword.emptyNewPassword') }}
        </small>
      </div>
      <div class="mb-4">
        <Password
          v-model="confirmPassword"
          :placeholder="$t('restorePassword.confirmPassword')"
          :feedback="false"
          :class="{ 'p-invalid': confirmPassword !== newPassword && errorMessage !== '' }"
          size="small"
          fluid
          class="w-full"
        />
        <small v-if="confirmPassword !== newPassword && errorMessage !== ''" class="p-error">
          {{ $t('restorePassword.passwordMismatch') }}
        </small>
      </div>
      <div class="text-center mb-4">
        <Button id="restorePasswordButton" type="submit" :label="$t('restorePassword.submitButton')" class="w-full" size="small" />
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
import { useRouter } from 'vue-router';
import Password from 'primevue/password';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import Auth from '@/layout/public/auth/Auth.vue';

export default defineComponent({
  name: 'RestorePassword',
  components: {
    Auth,
    Password,
    Button,
    ProgressSpinner,
  },
  setup() {
    const newPassword = ref('');
    const confirmPassword = ref('');
    const isLoading = ref(false);
    const errorMessage = ref('');
    const { t } = useI18n();
    const router = useRouter();

    const onSubmit = async () => {
      errorMessage.value = '';

      if (newPassword.value.length < 8) {
        errorMessage.value = t('restorePassword.weakPassword');
        return;
      }

      if (confirmPassword.value !== newPassword.value) {
        errorMessage.value = t('restorePassword.passwordMismatch');
        return;
      }

      isLoading.value = true;

      try {
        // Simulación de restablecimiento de contraseña
        await fakeRestorePasswordService(newPassword.value);
        alert(t('restorePassword.successMessage')); // Cambia esto por una notificación más elegante si lo prefieres
        router.push({ name: 'login' }); // Redirigir al login tras el éxito
      } catch (error) {
        errorMessage.value = t('restorePassword.failed');
      } finally {
        isLoading.value = false;
      }
    };

    const fakeRestorePasswordService = async (password: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (password.length >= 8) {
            resolve();
          } else {
            reject();
          }
        }, 1000);
      });
    };

    return {
      newPassword,
      confirmPassword,
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
