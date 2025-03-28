<template>
  <div class="mb-4 flex items-center">
    <h2 class="text-center text-2xl font-semibold">Editar Producto</h2>
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
                <Dropdown
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
            <Toast />
            <FileUpload
              :multiple="true"
              accept="image/*"
              :maxFileSize="1000000"
              name="demo[]"
              :url="''"
              :auto="true"
              :showUploadButton="false"
              @upload="uploadImage($event)">
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
              label="Guardar" />
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
  Dropdown,
  Checkbox,
  Toast,
  FileUpload,
  Breadcrumb,
} from 'primevue';
import Editor from 'primevue/editor';
import { reactive, ref, onMounted, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter, useRoute } from 'vue-router';
import type { ImageURL, Product, ProductSendUpdate } from '@/interfaces/products/product.interface';
import { backendClient } from '@/api/backend-client';
import { ProductService } from '@/services/product-service.js';

const router = useRouter();
const toast = useToast();
const submitted = ref(false);
const productService = new ProductService(backendClient);
const route = useRoute();
const productId = ref(route.params.id);

onMounted(() => {
  loadProduct();
});

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

const loadProduct = async () => {
  try {
    const response = await productService.productsById(Number(productId.value));
    /*Verificar el success de la respuesta */
    const productResponse: Product | undefined = response.data;
    formData.name = productResponse?.name ? productResponse.name : '';
    formData.resume = productResponse?.resume ? productResponse.resume : '';
    formData.description = productResponse?.description ? productResponse.description : '';
    formData.purchasePrice = productResponse?.purchasePrice ? productResponse.purchasePrice : 0;
    formData.salePrice = productResponse?.salePrice ? productResponse.salePrice : 0;
    formData.orders = productResponse?.orders ? productResponse.orders : 0;
    formData.ratio = productResponse?.ratio ? productResponse.ratio : 0;
    formData.imageURL = productResponse?.imageURL ? productResponse.imageURL : [];
    console.log('********** ', response);

    // 🟢 Setear el campo type con el valor obtenido de la base de datos
    if (productResponse?.type) {
      const foundType = typeOptions.find((option) => option.value === productResponse.type);
      formData.type = foundType ? foundType.value : ''; // Asignar el valor si existe, sino un string vacío
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
};

//Constantes de Breadcrumb
const home = ref({
  icon: 'pi pi-home',
  route: '/admin',
});
const items = ref([{ label: 'Productos', route: '/admin/products' }, { label: '' }]);

watch(
  () => formData.name,
  (newName) => {
    items.value[1].label = newName;
  },
);

const typeOptions = [
  { label: 'General', value: 'General' },
  { label: 'Electrónico', value: 'Electrónico' },
  { label: 'Ropa', value: 'Ropa' },
  { label: 'Hogar', value: 'Hogar' },
];

const validateForm = () => {
  return (
    formData.name &&
    formData.resume &&
    formData.description &&
    formData.purchasePrice > 0 &&
    formData.salePrice > 0 &&
    formData.type
  );
};

const prepareImage = (): ImageURL[] => {
  return formData.imageURL;
};

const prepareProduct = (): ProductSendUpdate => {
  const result: ProductSendUpdate = {
    id: Number(productId.value),
    name: formData.name,
    resume: formData.description,
    description: formData.description,
    purchasePrice: formData.purchasePrice,
    salePrice: formData.salePrice,
    type: formData.type,
    status: formData.status,
    imageURL: prepareImage(),
  };
  return result;
};

const uploadImage = async (event: any) => {
  event.files.forEach((file: any, index: number) => {
    // Simular una URL de imagen de prueba para cada archivo subido
    const fakeUrl = `https://via.placeholder.com/150?text=Image+${formData.imageURL.length + 1}`;

    // Agregar la URL simulada al array de imágenes
    formData.imageURL.push({
      id: formData.imageURL.length + 1, // ID único
      url: fakeUrl,
    });
  });

  toast.add({
    severity: 'info',
    summary: 'Imagen subida',
    detail: 'Se han agregado imágenes de prueba',
    life: 3000,
  });

  console.log('Imágenes simuladas:', formData.imageURL);
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const onSubmit = async () => {
  submitted.value = true;

  if (validateForm()) {
    try {
      const response = await productService.update(prepareProduct());
      console.log(response);
      /*Verificar el success de la respuesta */
      /*Probar el caso de error tambien*/
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Producto guardado correctamente',
        life: 3000,
      });
      setTimeout(() => {
        router.push('/admin/products');
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
