<template>
  <RouterView />
  <Toast />
</template>
<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useUserStore } from '@/store/user.ts';
import Toast from 'primevue/toast';

const userStore = useUserStore();
const route = useRoute();
onMounted(() => {
  if (route.query.qr || route.query.link) {
    // Usuario ingresó mediante un QR o un enlace
    userStore.setEntry('external', (route.query.qr as string) || (route.query.link as string));
  } else {
    // Usuario ingresó manualmente navegando en la plataforma
    userStore.setEntry('internal');
  }
});
</script>

<style></style>
