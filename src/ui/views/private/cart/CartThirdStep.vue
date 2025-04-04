<template>
  <CartProcessLayout
    :current-step="2"
    :show-navigation-buttons="false">
    <div class="flex flex-col items-center justify-center space-y-6 p-6">
      <div class="max-w-md rounded-lg border p-6 text-center">
        <p class="text-lg">
          Tus productos te llegarán en <strong>7 días laborales</strong>, te enviaremos información sobre el avance del
          pedido.
        </p>
      </div>

      <Button
        label="Aceptar"
        icon="pi pi-check"
        @click="goHome" />
    </div>
  </CartProcessLayout>
</template>

<script setup lang="ts">
import CartProcessLayout from '@/layout/cart/CartProcessLayout.vue';
import { useRouter } from 'vue-router';
import { Button } from 'primevue';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>
