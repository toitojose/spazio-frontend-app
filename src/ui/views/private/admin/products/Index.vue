<template>
  <!-- Header con título y botón -->
  <div class="mb-4 flex items-center justify-between">
    <h2 class="text-2xl font-semibold">Products</h2>
    <Button
      label="Agregar producto"
      icon="pi pi-plus"
      class="p-button-primary"
      @click="onCreate" />
  </div>

  <div class="card">
    <div class="mb-4">
      <InputText
        v-model="filters['global'].value"
        placeholder="Search products..."
        class="p-input-icon-left w-full md:w-1/3">
        <template #prefix>
          <i class="pi pi-search"></i>
        </template>
      </InputText>
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
      class="p-datatable-sm">
      <Column
        field="name"
        header="Name"
        sortable
        filter
        filterPlaceholder="Search by name" />

      <Column
        field="precioVenta"
        header="Precio Venta"
        sortable>
        <template #body="{ data }">
          {{ formatCurrency(data.precioVenta) }}
        </template>
      </Column>

      <Column
        field="precioCompra"
        header="Precio Compra"
        sortable>
        <template #body="{ data }">
          {{ formatCurrency(data.precioCompra) }}
        </template>
      </Column>

      <Column
        field="description"
        header="Description"
        sortable
        filter
        filterPlaceholder="Search by description" />

      <Column
        field="stock"
        header="Stock"
        sortable />

      <Column
        header="Status"
        sortable>
        <template #body="{ data }">
          <Tag
            :value="getStockStatus(data)"
            :severity="getSeverity(data)" />
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
import { Button, Tag, InputText } from 'primevue';
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

const getStockStatus = (product) => {
  if (product.stock > 10) return 'INSTOCK';
  if (product.stock > 0) return 'LOWSTOCK';
  return 'OUTOFSTOCK';
};

const getSeverity = (product) => {
  switch (getStockStatus(product)) {
    case 'INSTOCK':
      return 'success';
    case 'LOWSTOCK':
      return 'warn';
    case 'OUTOFSTOCK':
      return 'danger';
    default:
      return null;
  }
};
</script>
<style scoped>
.card {
  @apply rounded-lg border border-gray-200 bg-white p-8;
}
</style>
