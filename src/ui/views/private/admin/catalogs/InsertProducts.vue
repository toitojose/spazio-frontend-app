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
        <div class="flex justify-between gap-10">
          <Select
            v-model="selectedTipo"
            :options="typeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Filtrar por tipo"
            @change="filterByTipo" />

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
        field="description"
        header="Resumen"
        sortable
        filter
        filterPlaceholder="Buscar por descripción" />

      <Column
        field="precioVenta"
        header="C/Venta"
        sortable>
        <template #body="{ data }">
          {{ formatCurrency(data.sale_price) }}
        </template>
      </Column>

      <Column
        header="Ratio"
        sortable>
        <template #body="{ data }"> {{ getRatio(data) }}% </template>
      </Column>

      <Column
        header="Cajes"
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
      @click="() => onSave()" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { FilterMatchMode } from '@primevue/core/api';
import { ProductService } from '@/services/product-service.ts';
import type { Product } from '@/interfaces/products/product.interface';
import { CatalogService } from '@/services/catalogs-services';
import type { Catalog, CatalogSendUpdateProducts } from '@/interfaces/catalogs/catalogs.interface';
import { backendClient } from '@/api/backend-client';
import {
  Button as PButton,
  InputText,
  InputGroup,
  InputGroupAddon,
  useToast,
  Dialog as PDialog,
  Breadcrumb,
  Dropdown,
  Select,
} from 'primevue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { TypeService } from '@/services/type-service.ts';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const submitted = ref(false);
const productService = new ProductService(backendClient);
const catalogService = new CatalogService(backendClient);
const typeService = new TypeService(backendClient);
const productos: Product[] | undefined = [];
const products = ref(productos);
const selectedProducts = ref();
const catalogId = ref(route.params.id);

const filters = ref({
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
});

const selectedTipo = ref<string | null>(null);
const typeOptions = ref<{ label: string; value: string }[]>([]);

const filterByTipo = async () => {
  try {
    if (selectedTipo.value) {
      const response = await typeService.getProductsByTypeId(Number(selectedTipo.value));
      products.value = response.data ?? [];
      console.log(response.data);
    } else {
      // Si es "Todos", carga todos los productos
      await loadProducts();
    }
  } catch (error) {
    console.error('Error al filtrar productos por tipo:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar los productos por tipo',
      life: 3000,
    });
  }
};

onMounted(() => {
  loadProducts();
  loadCatalog();
  loadTypes();
});

const formData = reactive({
  name: '',
  description: '',
  is_public: true,
  category_level: 0,
  start_date: null as Date | null,
  end_date: null as Date | null,
});

const loadTypes = async () => {
  try {
    const response = await typeService.getTypes();

    if (response.data) {
      typeOptions.value = [
        { label: 'Todos', value: '' },
        ...response.data.map((t: any) => ({
          label: t.name,
          value: String(t.id),
        })),
      ];
    }
  } catch (error) {
    console.error('❌ Error al cargar tipos de producto:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar los tipos de productos',
      life: 3000,
    });
  }
};

const loadProducts = async () => {
  try {
    const response = await productService.products();
    products.value = response.data ?? [];
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
    formData.category_level = catalogResponse?.category_level ? Number(catalogResponse.category_level) : 0;
    formData.is_public = catalogResponse?.is_public ?? true;
    formData.start_date = catalogResponse?.start_date ? new Date(catalogResponse.start_date) : null;
    formData.end_date = catalogResponse?.end_date ? new Date(catalogResponse.end_date) : null;
    selectedProducts.value = catalogResponse?.products;
    console.log('🚀 ~ file: InsertProducts.vue ~ line 134 ~ loadCatalog ~ catalogResponse', catalogResponse);
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
  console.log('validateForm', selectedProducts.value);
  return selectedProducts.value && selectedProducts.value.length > 0;
};

const prepareCatalog = (): CatalogSendUpdateProducts => {
  const toUtcISOString = (date: Date | null): string => {
    return date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('.')[0] + 'Z' : '';
  };

  const result: CatalogSendUpdateProducts = {
    name: formData.name,
    description: formData.description,
    isPublic: formData.is_public,
    categoryLevel: Number(formData.category_level),
    startDate: toUtcISOString(formData.start_date),
    endDate: toUtcISOString(formData.end_date),
    products: selectedProducts.value.map((p: Product) => p.id),
  };
  return result;
};

const onSave = async () => {
  submitted.value = true;

  if (validateForm()) {
    try {
      const response = await catalogService.updateProducts(prepareCatalog(), Number(catalogId.value));
      if (response.result) {
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Productos asociados correctamente', life: 3000 });
        setTimeout(() => {
          router.push('/admin/catalogs');
          submitted.value = false;
        }, 1000);
      } else {
        throw new Error(response.message || 'Error desconocido');
      }
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al asociar los productos',
        life: 3000,
      });
    }
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Por favor, selecciona al menos un producto',
      life: 3000,
    });
  }
};

const formatCurrency = (value?: number) => {
  if (typeof value !== 'number') return '$0.00'; // Valor por defecto o mensaje
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const getRatio = (product: Product) => {
  if (!product.purchase_price || !product.sale_price) return '0.00';
  const ratio = ((product.sale_price - product.purchase_price) / product.purchase_price) * 100;
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
