<template>
  <Auth :title="$t('emailChange.title')" :subtitle="$t('emailChange.subtitle')">
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <InputText
          v-model="currentEmail"
          :placeholder="$t('emailChange.currentEmail')"
          :class="{ 'p-invalid': currentEmail === '' && errorMessage !== '' }"
          size="small"
          class="w-full"
        />
        <small v-if="currentEmail === '' && errorMessage !== ''" class="p-error">
          {{ $t('emailChange.emptyCurrentEmail') }}
        </small>
      </div>
      <div class="mb-4">
        <InputText v-model="newEmail" :placeholder="$t('emailChange.newEmail')" :class="{ 'p-invalid': newEmail === '' && errorMessage !== '' }" size="small" class="w-full" />
        <small v-if="newEmail === '' && errorMessage !== ''" class="p-error">
          {{ $t('emailChange.emptyNewEmail') }}
        </small>
      </div>
      <div class="text-center mb-4">
        <Button id="changeEmailButton" type="submit" :label="$t('emailChange.submitButton')" class="w-full" size="small" />
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
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import Auth from '@/layout/public/auth/Auth.vue';

export default defineComponent({
  name: 'EmailChange',
  components: {
    Auth,
    InputText,
    Button,
    ProgressSpinner,
  },
  setup() {
    const currentEmail = ref('');
    const newEmail = ref('');
    const isLoading = ref(false);
    const errorMessage = ref('');
    const router = useRouter();
    const { t } = useI18n();

    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const onSubmit = async () => {
      errorMessage.value = '';

      if (!isValidEmail(currentEmail.value)) {
        errorMessage.value = t('emailChange.invalidCurrentEmail');
        return;
      }

      if (!isValidEmail(newEmail.value)) {
        errorMessage.value = t('emailChange.invalidNewEmail');
        return;
      }

      isLoading.value = true;

      try {
        // Simulación de cambio de correo electrónico
        await fakeEmailChangeService(currentEmail.value, newEmail.value);
        router.push({ name: 'success' }); // Cambiar a la ruta correspondiente para éxito
      } catch (error) {
        errorMessage.value = t('emailChange.failed');
      } finally {
        isLoading.value = false;
      }
    };

    const fakeEmailChangeService = async (currentEmail: string, newEmail: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (currentEmail === 'user@spazio.com' && newEmail.includes('@')) {
            resolve();
          } else {
            reject();
          }
        }, 1000);
      });
    };

    return {
      currentEmail,
      newEmail,
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
