<template>
  <div class="space-y-4 p-6">
    <h1 class="text-center text-3xl font-bold">Carrito de compras</h1>

    <!-- Productos seleccionados -->
    <div>
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

    <div class="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
      <!-- Botones de dirección -->
      <div class="col-span-1 flex flex-col space-y-2 md:col-span-1">
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

      <!-- Botones de acción -->
      <div class="col-span-2 mt-4 flex flex-wrap justify-center gap-4 md:mt-0 md:justify-end">
        <PButton
          label="Ver más productos"
          icon="pi pi-arrow-left"
          outlined />
        <PButton
          label="Vaciar el carrito"
          icon="pi pi-trash"
          severity="danger"
          outlined />
        <PButton
          label="Canjear productos"
          icon="pi pi-check"
          severity="success" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Button as PButton } from 'primevue';

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
