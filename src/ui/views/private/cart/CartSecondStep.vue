<template>
  <CartProcessLayout
    :current-step="1"
    :show-navigation-buttons="false">
    <div class="space-y-4 p-6">
      <div class="rounded-lg border p-4 text-center">
        <h2 class="text-lg font-medium">Productos seleccionados.</h2>
        <p class="text-sm text-gray-500">(No puedo modificar datos)</p>
        <DataTable
          :value="cartItems"
          class="mt-2"
          responsiveLayout="scroll">
          <Column header="Imagen">
            <template #body="{ data }">
              <img
                :src="data.image"
                alt="Imagen producto"
                width="50" />
            </template>
          </Column>
          <Column
            field="name"
            header="Nombre" />
          <Column
            field="description"
            header="Descripción" />
          <Column
            field="quantity"
            header="Cantidad" />
        </DataTable>
      </div>

      <div class="rounded-lg border p-4 text-center">
        <p class="text-lg font-medium"> Dirección de envío seleccionada </p>
        <p class="text-sm text-gray-500">(No puedo modificar datos)</p>
      </div>

      <div class="mt-6 flex justify-center gap-4">
        <Button
          label="Actualizar la información"
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
import { ref } from 'vue';
import CartProcessLayout from '@/layout/cart/CartProcessLayout.vue';
import { useRouter } from 'vue-router';
import { Button } from 'primevue';
import { onMounted } from 'vue';
import { useCartStore } from '@/store/cart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const cartStore = useCartStore();
const router = useRouter();
const cartItems = ref();

onMounted(() => {
  cartItems.value = cartStore.allProducts;
});

const goBack = () => {
  router.push('/cart/cart-first-step');
};

const goNext = () => {
  router.push('/cart/cart-third-step');
};
</script>
