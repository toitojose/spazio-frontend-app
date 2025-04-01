<template>
  <div class="mb-4 flex items-center">
    <h2 class="text-center text-2xl font-semibold">Asociar Productos</h2>
  </div>
  <div class="flex pb-5">
    <Breadcrumb
      :home="home"
      :model="items"
      class="border-0 bg-transparent p-0">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom>
          <a
            :href="href"
            v-bind="props.action"
            class="text-gray-600 hover:font-semibold"
            @click="navigate">
            <span :class="[item.icon, 'text-gray-600']"></span>
            <span class="text-dark">{{ item.label }}</span>
          </a>
        </router-link>
        <a
          v-else
          :href="item.url"
          :target="item.target"
          v-bind="props.action">
          <span class="text-dark font-semibold">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </div>

  <div class="card">
    <DataTable
      v-model:filters="filters"
      v-model:selection="selectedProducts"
      :value="products"
      :stripedRows="true"
      :paginator="true"
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
      responsiveLayout="scroll"
      size="small">
      <template #header>
        <div class="flex justify-between">
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
      </template>
      <template #empty> No hay productos. </template>
      <Column
        selectionMode="multiple"
        headerStyle="width: 3rem">
      </Column>

      <Column
        field="name"
        header="Nombre"
        sortable
        filter
        filterPlaceholder="Buscar por nombre" />

      <Column
        field="resume"
        header="Resumen"
        sortable
        filter
        filterPlaceholder="Buscar por resumen" />

      <Column
        field="precioVenta"
        header="C/Venta"
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
    </DataTable>
  </div>
  <!-- 🟠 Botón alineado -->
  <div class="col-span-2 flex justify-end pt-10">
    <PButton
      severity="secondary"
      label="Guardar"
      @click="() => onSave(data)" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { FilterMatchMode } from '@primevue/core/api';
import { ProductService } from '@/services/product-service.ts';
import type { Product } from '@/interfaces/products/product.interface';
import { CatalogService } from '@/services/catalogs-services';
import type { Catalog } from '@/interfaces/catalogs/catalogs.interface';
import { backendClient } from '@/api/backend-client';
import {
  Button as PButton,
  InputText,
  InputGroup,
  InputGroupAddon,
  useToast,
  Dialog as PDialog,
  Breadcrumb,
} from 'primevue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const router = useRouter();
const route = useRoute();
const toast = useToast();
const submitted = ref(false);
const productService = new ProductService(backendClient);
const catalogService = new CatalogService(backendClient);
const productos: Product[] | undefined = [];
const products = ref(productos);
const selectedProducts = ref();
const catalogId = ref(route.params.id);

const filters = ref({
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
});

onMounted(() => {
  loadProducts();
  loadCatalog();
});

const formData = reactive({
  name: '',
  description: '',
  isPublic: true,
  category: '',
});

const loadProducts = async () => {
  try {
    const response = await productService.products();
    products.value = response.data ?? [];
    console.log("'*****'", response.data);
  } catch (error) {
    console.error('Error loading products:', error);
  }
};

const loadCatalog = async () => {
  try {
    const response = await catalogService.catalogsById(Number(catalogId.value));
    const catalogResponse: Catalog | undefined = response.data;
    formData.name = catalogResponse?.name ? catalogResponse.name : '';
    formData.description = catalogResponse?.description ? catalogResponse.description : '';

    console.log('********** ', response);
  } catch (error) {
    console.error('Error loading products:', error);
  }
};

//Constantes de Breadcrumb
const home = ref({
  icon: 'pi pi-home',
  route: '/admin',
});
const items = ref([{ label: 'Catálogos', route: '/admin/catalogs' }, { label: 'Asociar' }]);

watch(
  () => formData.name,
  (newName) => {
    items.value[1].label = newName;
  },
);

const validateForm = () => {
  return selectedProducts > 0;
};

const onSave = (data: string) => {
  toast.add({
    severity: 'success',
    summary: 'Éxito',
    detail: 'Producto guardado correctamente',
    life: 3000,
  });
  setTimeout(() => {
    router.push('/admin/catalogs');
    submitted.value = false;
  }, 1000);
/*

  if (validateForm()) {
    try {
      const response = await createCatalog.create(prepareCatalog());
      console.log(response);
      //Verificar el success
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Producto guardado correctamente',
        life: 3000,
      });
      setTimeout(() => {
        router.push('/admin/catalogs');
        submitted.value = false;
      }, 1000);
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al guardar el producto',
        life: 3000,
      });
    }
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Por favor, complete todos los campos requeridos',
      life: 3000,
    });
  }*/
};

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const getRatio = (product: Product) => {
  if (!product.purchasePrice || !product.salePrice) return '0.00';
  const ratio = ((product.salePrice - product.purchasePrice) / product.purchasePrice) * 100;
  return ratio.toFixed(2);
};
</script>
<style lang="scss" scoped>
:deep(.p-breadcrumb) {
  background: transparent;
  border: none;
  padding: 0;
}

.card {
  @apply rounded-lg border border-gray-200 bg-white p-8;
}
</style>
