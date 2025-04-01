<template>
  <PDialog
    v-model:visible="showDeleteDialog"
    :modal="true"
    :closable="true"
    header="Confirmación de Eliminación"
    class="w-11/12 sm:w-5/12">
    <p>¿Estás seguro de eliminar este producto?</p>
    <div class="mt-4 flex justify-end gap-2">
      <PButton
        label="No"
        severity="secondary"
        @click="showDeleteDialog = false" />
      <PButton
        label="Sí"
        severity="danger"
        @click="confirmDelete" />
    </div>
  </PDialog>
  <!-- Header con título y botón -->
  <div class="mb-4 flex items-center justify-between">
    <h2 class="text-2xl font-semibold">Productos</h2>
    <PButton
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
            class="pi pi-search"
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
          {{ formatCurrency(data.purchasePrice) }}
        </template>
      </Column>

      <Column
        field="precioVenta"
        header="P/Venta"
        sortable>
        <template #body="{ data }">
          {{ formatCurrency(data.salePrice) }}
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
          <PButton
            icon="pi pi-pencil"
            class="p-button-text p-button-sm"
            @click="() => onEdit(data.id)" />
          <PButton
            icon="pi pi-trash"
            class="p-button-text p-button-sm text-red-500"
            @click="() => onDelete(data.id)" />
        </template>
      </Column>
    </DataTable>
    <div class="mt-4 flex justify-end text-lg font-semibold"> Existen {{ products.length }} productos. </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { ProductService } from '@/services/product-service.ts';
import { Button as PButton, InputText, InputGroup, InputGroupAddon, useToast, Dialog as PDialog } from 'primevue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { Product } from '@/interfaces/products/product.interface';
import { useRouter } from 'vue-router';
import { backendClient } from '@/api/backend-client';

const productService = new ProductService(backendClient);
const productos: Product[] | undefined = [];
const products = ref(productos);
const router = useRouter();
const toast = useToast();

// Variables para el PDialog
const showDeleteDialog = ref(false);
const productIdToDelete = ref<string | null>(null);

const filters = ref({
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
});

const loadProducts = async () => {
  try {
    const response = await productService.products();
    products.value = response.data ?? [];
  } catch (error) {
    console.error('Error loading products:', error);
  }
};

const onCreate = () => {
  router.push('products/create');
  console.log('Create new ebook');
};

onMounted(() => {
  loadProducts();
});

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const getRatio = (product: Product) => {
  if (!product.purchasePrice || !product.salePrice) return '0.00';
  const ratio = ((product.salePrice - product.purchasePrice) / product.purchasePrice) * 100;
  return ratio.toFixed(2);
};

const onEdit = (id: Product) => {
  router.push(`/admin/products/edit/${id}`);
  return;
};

const onDelete = (id: string) => {
  productIdToDelete.value = id; // Almacena el ID del producto a eliminar
  showDeleteDialog.value = true; // Muestra el diálogo
  return;
};

const confirmDelete = () => {
  if (productIdToDelete.value) {
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Producto eliminado correctamente',
      life: 3000,
    });
    loadProducts(); // Recarga la lista de productos
    showDeleteDialog.value = false; // Cierra el diálogo
    productIdToDelete.value = null; // Limpia el ID
    /*productService
      .delete(productIdToDelete.value)
      .then(() => {
        toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Producto eliminado correctamente',
          life: 3000,
        });
        loadProducts(); // Recarga la lista de productos
      })
      .catch(() => {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el producto',
          life: 3000,
        });
      })
      .finally(() => {
        showDeleteDialog.value = false; // Cierra el diálogo
        productIdToDelete.value = null; // Limpia el ID
      });*/
  }
};
</script>
<style scoped>
.card {
  @apply rounded-lg border border-gray-200 bg-white p-8;
}
</style>
