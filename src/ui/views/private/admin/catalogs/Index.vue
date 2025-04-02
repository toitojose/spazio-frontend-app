<template>
  <Toast />
  <PDialog
    v-model:visible="showDeleteDialog"
    :modal="true"
    :closable="true"
    header="Confirmación de Eliminación"
    class="w-11/12 sm:w-5/12">
    <p>¿Estás seguro de eliminar este catálogo?</p>
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
    <h2 class="text-2xl font-semibold">Catálogos</h2>
    <PButton
      label="Agregar catálogo"
      icon="pi pi-plus"
      class="p-button-primary"
      @click="onCreate" />
  </div>

  <div class="card">
    <div class="mb-4">
      <InputGroup>
        <InputText
          v-model="filters['global'].value"
          placeholder="Buscar catálogo..." />
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
      :value="catalogs"
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
        header="Descripción"
        sortable
        filter
        filterPlaceholder="Buscar por descripción" />

      <Column
        field="is_public"
        header="Acceso"
        sortable>
        <template #body="{ data }">Acceso</template>
        <!-- Temporal -->
      </Column>

      <Column
        field="category_level"
        header="Categoría"
        sortable>
        <template #body="{ data }">Categoría</template>
        <!-- Temporal -->
      </Column>

      <Column
        header="Productos"
        sortable>
        <template #body="{ data }">0</template>
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
          <PButton
            icon="pi pi-box"
            class="p-button-text p-button-sm text-red-500"
            @click="() => onInsertProducts(data.id)" />
        </template>
      </Column>
    </DataTable>
    <div class="mt-4 flex justify-end text-lg font-semibold"> Existen {{ catalogs.length }} catálogos. </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { Button as PButton, InputText, InputGroup, InputGroupAddon, useToast, Dialog as PDialog } from 'primevue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import { useRouter } from 'vue-router';
import { CatalogService } from '@/services/catalogs-services';
import type { Catalog, CatalogResult } from '@/interfaces/catalogs/catalogs.interface';
import { backendClient } from '@/api/backend-client';

const catalogService = new CatalogService(backendClient);
const catalogs = ref<Catalog[]>([]);
const router = useRouter();
const toast = useToast();

// Variables para el PDialog
const showDeleteDialog = ref(false);
const catalogIdToDelete = ref<string | null>(null);

const filters = ref({
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
});

const loadCatalogs = async () => {
  try {
    const response = await catalogService.catalogs();
    catalogs.value = response ?? [];
    console.log('Catalogos cargados:', response);
  } catch (error) {
    console.error('Error loading catalogs:', error);
  }
};

const onCreate = () => {
  router.push('catalogs/create');
};

onMounted(() => {
  loadCatalogs();
});

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const onEdit = (id: number) => {
  router.push(`/admin/catalogs/edit/${id}`);
  return;
};

const onDelete = (id: string) => {
  catalogIdToDelete.value = id; // Almacena el ID del producto a eliminar
  showDeleteDialog.value = true; // Muestra el diálogo
  return;
};

const onInsertProducts = (id: string) => {
  router.push(`/admin/catalogs/edit/products/${id}`);
  return;
};

const confirmDelete = () => {
  if (catalogIdToDelete.value) {
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Producto eliminado correctamente',
      life: 3000,
    });
    loadCatalogs(); // Recarga la lista de productos
    showDeleteDialog.value = false; // Cierra el diálogo
    catalogIdToDelete.value = null; // Limpia el ID
    /*catalogservice
        .delete(productIdToDelete.value)
        .then(() => {
          toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto eliminado correctamente',
            life: 3000,
          });
          loadcatalogs(); // Recarga la lista de productos
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
