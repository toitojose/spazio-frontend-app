<template>
  <div class="mb-4 flex items-center">
    <h2 class="text-center text-2xl font-semibold">Agregar Producto</h2>
  </div>
  <div class="flex">
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

  <div class="flex justify-center pt-5">
    <Card style="width: 65em; overflow: hidden">
      <template #content>
        <form
          class="grid grid-cols-[2fr_1fr] gap-4 p-1"
          @submit.prevent="onSubmit">
          <!-- 🟢 Columna 1: Inputs desde Nombre hasta Estado -->
          <div class="flex flex-col gap-4">
            <!-- Nombre -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <InputText
                  id="name"
                  v-model="formData.name"
                  :class="{ 'p-invalid': submitted && !formData.name }"
                  class="w-full" />
                <label for="name">Nombre</label>
              </FloatLabel>
              <small
                v-if="submitted && !formData.name"
                class="p-error text-red-500"
                >El nombre es requerido</small
              >
            </div>

            <!-- Resumen -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <InputText
                  id="resume"
                  v-model="formData.resume"
                  :class="{ 'p-invalid': submitted && !formData.resume }"
                  class="w-full" />
                <label for="resume">Resumen</label>
              </FloatLabel>
              <small
                v-if="submitted && !formData.resume"
                class="p-error text-red-500"
                >El resumen es requerido</small
              >
            </div>

            <!-- Descripción -->
            <div class="flex w-full flex-col gap-1">
              <label class="mb-2 text-sm font-medium">Descripción</label>
              <Editor
                v-model="formData.description"
                editorStyle="height: 320px"
                :class="{ 'p-invalid': submitted && !formData.description }"
                class="w-full" />
              <small
                v-if="submitted && !formData.description"
                class="p-error text-red-500">
                La descripción es requerida
              </small>
            </div>

            <!-- Precio de compra -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <InputNumber
                  id="purchasePrice"
                  v-model="formData.purchasePrice"
                  mode="currency"
                  currency="USD"
                  :class="{ 'p-invalid': submitted && formData.purchasePrice <= 0 }"
                  class="w-full" />
                <label for="purchasePrice">Precio de compra</label>
              </FloatLabel>
              <small
                v-if="submitted && formData.purchasePrice <= 0"
                class="p-error text-red-500"
                >El precio debe ser mayor a 0</small
              >
            </div>

            <!-- Precio de venta -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <InputNumber
                  id="salePrice"
                  v-model="formData.salePrice"
                  mode="currency"
                  currency="USD"
                  :class="{ 'p-invalid': submitted && formData.salePrice <= 0 }"
                  class="w-full" />
                <label for="salePrice">Precio de venta</label>
              </FloatLabel>
              <small
                v-if="submitted && formData.salePrice <= 0"
                class="p-error text-red-500"
                >El precio debe ser mayor a 0</small
              >
            </div>

            <!-- Tipo -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <Select
                  id="type"
                  v-model="formData.type"
                  :options="typeOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Seleccione un tipo"
                  :class="{ 'p-invalid': submitted && !formData.type }"
                  class="w-full" />
              </FloatLabel>
              <small
                v-if="submitted && !formData.type"
                class="p-error text-red-500"
                >El tipo es requerido</small
              >
            </div>

            <!-- Estado -->
            <div class="flex w-full flex-col gap-1">
              <div class="flex items-center gap-2">
                <Checkbox
                  id="status"
                  v-model="formData.status"
                  :binary="true" />
                <label for="status">Activo</label>
              </div>
            </div>
          </div>

          <!-- 🔵 Columna 2: Subida de imágenes -->
          <div class="flex flex-col items-center">
            <FileUpload
              :multiple="true"
              accept="image/*"
              :maxFileSize="1000000"
              name="file"
              :auto="false"
              :customUpload="true"
              :showUploadButton="false"
              @select="onSelectFiles">
              <template #empty>
                <div class="flex h-full flex-col items-center justify-center">
                  <i class="pi pi-image mb-2 text-3xl"></i>
                  <span>Arrastra y suelta las imágenes aquí</span>
                </div>
              </template>
            </FileUpload>
          </div>

          <!-- 🟠 Botón alineado -->
          <div class="col-span-2 flex justify-end">
            <PButton
              type="submit"
              severity="secondary"
              label="Guardar"
              :loading="isLoading" />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  InputText,
  Button as PButton,
  FloatLabel,
  InputNumber,
  Checkbox,
  FileUpload,
  Breadcrumb,
  Select,
} from 'primevue';
import Editor from 'primevue/editor';
import { onMounted, reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import type { ImageURL, ProductSend } from '@/interfaces/products/product.interface';
import { backendClient } from '@/api/backend-client';
import { ProductService } from '@/services/product-service';
import { TypeService } from '@/services/type-service';
import { ImageService } from '@/services/imagesProduct-services';

//Constantes de Breadcrumb
const home = ref({
  icon: 'pi pi-home',
  route: '/admin',
});
const items = ref([{ label: 'Productos', route: '/admin/products' }, { label: 'Crear' }]);

const router = useRouter();
const toast = useToast();
const submitted = ref(false);
const createService = new ProductService(backendClient);
const typeService = new TypeService(backendClient);
const imageService = new ImageService(backendClient);
const isLoading = ref(false);
const selectedFiles = ref<File[]>([]);

const typeOptions = ref<{ label: string; value: string }[]>([]);

const formData = reactive({
  name: '',
  resume: '',
  description: '',
  purchasePrice: 0,
  salePrice: 0,
  type: '',
  status: true,
  orders: 0,
  ratio: 0,
  imageURL: [] as ImageURL[],
});

onMounted(async () => {
  const response = await typeService.getTypes();
  if (response.data) {
    typeOptions.value = response.data.map((t) => ({
      label: t.name, // o la propiedad correspondiente
      value: String(t.id),
    }));
  }
});

// Almacena las imágenes seleccionadas
const onSelectFiles = (event: { files: File[] }) => {
  selectedFiles.value = event.files;
};

const validateForm = () => {
  return (
    formData.name && formData.resume && formData.description && formData.purchasePrice > 0 && formData.salePrice > 0
  );
};

const prepareProduct = (): ProductSend => {
  const result: ProductSend = {
    name: formData.name,
    description: formData.description,
    purchasePrice: formData.purchasePrice,
    salePrice: formData.salePrice,
    stock: 0,
    productType: Number(formData.type),
    status: formData.status ? 'ACTIVE' : 'INACTIVE',
  };
  return result;
};

const isRatioValid = () => {
  const ratio = ((formData.salePrice - formData.purchasePrice) / formData.purchasePrice) * 100;
  return ratio >= 65;
};

const onSubmit = async () => {
  submitted.value = true;
  isLoading.value = true;

  // Validación general
  if (!validateForm()) {
    toast.add({
      severity: 'error',
      summary: 'Campos incompletos',
      detail: 'Por favor, complete todos los campos requeridos',
      life: 3000,
    });
    isLoading.value = false;
    return;
  }

  // Validación de ratio
  if (!isRatioValid()) {
    toast.add({
      severity: 'error',
      summary: 'Error en precios',
      detail: 'El ratio (utilidad) debe ser al menos del 65%',
      life: 3000,
    });
    isLoading.value = false;
    return;
  }

  try {
    const response = await createService.create(prepareProduct());

    if (response.result && response.data) {
      const productId = response.data[0].id;

      toast.add({
        severity: 'success',
        summary: 'Producto creado',
        detail: 'El producto fue guardado exitosamente',
        life: 3000,
      });

      // Si hay imágenes, subirlas
      if (selectedFiles.value.length > 0) {
        const uploadResult = await imageService.uploadImages(productId, selectedFiles.value);

        if (uploadResult.result) {
          toast.add({
            severity: 'success',
            summary: 'Imágenes subidas',
            detail: 'Todas las imágenes fueron subidas correctamente',
            life: 3000,
          });
        } else {
          toast.add({
            severity: 'warn',
            summary: 'Producto sin imágenes',
            detail: 'El producto se creó, pero hubo errores al subir las imágenes',
            life: 4000,
          });
        }
      }

      setTimeout(() => {
        router.push('/admin/products');
        submitted.value = false;
      }, 1000);
    } else {
      // Algo falló en la respuesta del backend
      toast.add({
        severity: 'error',
        summary: 'Error del servidor',
        detail: 'No se pudo crear el producto. Intente más tarde.',
        life: 4000,
      });
    }
  } catch (error) {
    console.error('Error al crear producto:', error);
    toast.add({
      severity: 'error',
      summary: 'Error de conexión',
      detail: 'Ocurrió un error inesperado al guardar el producto',
      life: 4000,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
:deep(.p-breadcrumb) {
  background: transparent;
  border: none;
  padding: 0;
}
</style>
