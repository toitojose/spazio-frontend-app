<template>
  <CartProcessLayout :current-step="0">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="mb-6 md:col-span-2">
        <h2 class="text-lg font-medium">Productos seleccionados.</h2>
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

      <div class="flex flex-col space-y-2 md:col-span-1">
        <PButton
          label="Gestión de dirección"
          class="w-full" />
        <PButton
          label="Detalle de la dirección asociada al cliente (Si la tiene)"
          class="w-full"
          severity="info" />
        <PButton
          label="Agregar nueva dirección"
          class="w-full"
          severity="success" />
      </div>
      <div class="flex flex-col justify-between gap-5 md:col-span-3 md:flex-row">
        <PButton
          label="Ver más productos"
          icon="pi pi-arrow-left"
          outlined
          class="md:w-1/3" />
        <PButton
          label="Vaciar el carrito"
          icon="pi pi-trash"
          severity="danger"
          outlined
          class="md:w-1/3" />
        <PButton
          label="Canjear productos"
          icon="pi pi-check"
          severity="success"
          class="md:w-1/3" />
      </div>
    </div>
  </CartProcessLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Button as PButton } from 'primevue';
import CartProcessLayout from '@/layout/cart/CartProcessLayout.vue';

const cartItems = ref([
  {
    image: 'https://via.placeholder.com/50x50?text=Img1',
    name: 'Parlante Flip 6 JBL',
    description: 'color negro JBL 6 en stock.',
    quantity: '1',
  },
  {
    image: 'https://via.placeholder.com/50x50?text=Img2',
    name: 'Perfume',
    description: 'Rico perfume',
    quantity: '2',
  },
]);
</script>

<style scoped>
h1,
h2 {
  color: #333;
}
</style>
