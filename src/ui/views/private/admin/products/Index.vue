<template>
  <!-- Header con título y botón -->
  <div class="mb-4 flex items-center justify-between">
    <h2 class="text-2xl font-semibold">Productos</h2>
    <Button
      label="Agregar producto"
      icon="pi pi-plus"
      class="p-button-primary"
      @click="onCreate" />
  </div>

  <div class="card">
    <div class="mb-4">
      <InputGroup>
        <InputText
          v-model="filters['global'].value"
          placeholder="Buscar productos..." />
        <InputGroupAddon>
          <Button
            icon="pi pi-search"
            severity="secondary"
            variant="text" />
        </InputGroupAddon>
      </InputGroup>
    </div>
    <!-- Tabla -->
    <DataTable
      v-model:filters="filters"
      :value="products"
      :stripedRows="true"
      :paginator="true"
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
      responsiveLayout="scroll"
      size="small">
      <Column
        field="id"
        header="ID"
        sortable />

      <Column
        field="name"
        header="Nombre"
        sortable
        filter
        filterPlaceholder="Buscar por nombre" />

      <Column
        field="description"
        header="Resumen"
        sortable
        filter
        filterPlaceholder="Buscar por resumen" />

      <Column
        field="tipo"
        header="Tipo"
        sortable>
        <template #body="{ data }">General</template>
        <!-- Temporal -->
      </Column>

      <Column
        field="precioCompra"
        header="P/Compra"
        sortable>
        <template #body="{ data }">
          {{ formatCurrency(data.precioCompra) }}
        </template>
      </Column>

      <Column
        field="precioVenta"
        header="P/Venta"
        sortable>
        <template #body="{ data }">
          {{ formatCurrency(data.precioVenta) }}
        </template>
      </Column>

      <Column
        header="Ratio"
        sortable>
        <template #body="{ data }"> {{ getRatio(data) }}% </template>
      </Column>

      <Column
        header="Pedidos"
        sortable>
        <template #body="{ data }"> 0 </template>
      </Column>

      <Column
        header="Estado"
        sortable>
        <template #body="{ data }">
          <i class="pi pi-circle-fill text-green-500"></i>
          <!-- Simulamos todos como activos -->
        </template>
      </Column>

      <Column header="Opciones">
        <template #body="{ data }">
          <Button
            icon="pi pi-pencil"
            class="p-button-text p-button-sm"
            @click="() => onEdit(data)" />
          <Button
            icon="pi pi-trash"
            class="p-button-text p-button-sm text-red-500"
            @click="() => onDelete(data)" />
        </template>
      </Column>
    </DataTable>
    <div class="mt-4 flex justify-end text-lg font-semibold"> Existen {{ products.length }} productos. </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { ProductService } from '@/services/product-service.js';
import { Button, InputText, InputGroup, InputGroupAddon } from 'primevue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const productService = new ProductService();
const products = ref([]);

const filters = ref({
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
});

const loadProducts = async () => {
  try {
    const response = await productService.products();
    products.value = response.data;
  } catch (error) {
    console.error('Error loading products:', error);
  }
};

const onCreate = () => {
  // Redirigir a formulario de creación o mostrar modal
  console.log('Create new ebook');
};

onMounted(() => {
  loadProducts();
});

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const getRatio = (product) => {
  if (!product.precioCompra || !product.precioVenta) return '0.00';
  const ratio = ((product.precioVenta - product.precioCompra) / product.precioCompra) * 100;
  return ratio.toFixed(2);
};
</script>
<style scoped>
.card {
  @apply rounded-lg border border-gray-200 bg-white p-8;
}
</style>
