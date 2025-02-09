<template>
  <Auth
    :title="$t('notAvailable.title')"
    :subtitle="$t('notAvailable.subtitle')">
    <div class="text-center">
      <p class="mb-6 text-gray-700">{{ $t('notAvailable.message') }}</p>
      <Button
        :label="$t('notAvailable.returnButton')"
        class="p-button-primary w-full"
        size="small"
        @click="navigateToHome" />
    </div>
  </Auth>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Auth from '@/layout/public/auth/Auth.vue';

const router = useRouter();

const navigateToHome = () => {
  router.push({ name: 'home' });
};
</script>
