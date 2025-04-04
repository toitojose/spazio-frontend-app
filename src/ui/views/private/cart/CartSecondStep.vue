<template>
  <CartProcessLayout
    :current-step="1"
    :show-navigation-buttons="false">
    <div class="space-y-4 p-6">
      <div class="rounded-lg border p-4 text-center">
        <p class="text-lg font-medium"> Listado simple de productos y su cantidad </p>
        <p class="text-sm text-gray-500">(No puedo modificar datos)</p>
      </div>

      <div class="rounded-lg border p-4 text-center">
        <p class="text-lg font-medium"> Dirección de envío seleccionada </p>
        <p class="text-sm text-gray-500">(No puedo modificar datos)</p>
      </div>

      <div class="mt-6 flex justify-center gap-4">
        <Button
          label="Deseo actualizar la información"
          icon="pi pi-pencil"
          outlined
          @click="goBack" />
        <Button
          label="Confirmar canje"
          icon="pi pi-check"
          severity="success"
          @click="goNext" />
      </div>
    </div>
  </CartProcessLayout>
</template>

<script setup lang="ts">
import CartProcessLayout from '@/layout/cart/CartProcessLayout.vue';
import { useRouter } from 'vue-router';
import { Button } from 'primevue';

const router = useRouter();

const goBack = () => {
  router.push('/cart/cart-first-step');
};

const goNext = () => {
  router.push('/cart/cart-third-step');
};
</script>
