<template>
  <div class="mb-4 flex items-center justify-center">
    <h2 class="text-center text-2xl font-semibold">Agregar Producto</h2>
  </div>

  <div class="flex justify-center">
    <Card style="width: 50rem; overflow: hidden">
      <template #content>
        <form
          class="grid grid-cols-[2fr_1fr] gap-4 p-4"
          @submit.prevent="onSubmit">
          <!-- 🟢 Columna 1: Inputs desde Nombre hasta Estado -->
          <div class="flex flex-col gap-4">
            <!-- Nombre -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <InputText
                  id="name"
                  v-model="formData.name"
                  class="w-full" />
                <label for="name">Nombre</label>
              </FloatLabel>
            </div>

            <!-- Resumen -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <InputText
                  id="resume"
                  v-model="formData.resume"
                  class="w-full" />
                <label for="resume">Resumen</label>
              </FloatLabel>
            </div>

            <!-- Descripción -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <Textarea
                  id="description"
                  v-model="formData.description"
                  class="w-full" />
                <label for="description">Descripción</label>
              </FloatLabel>
            </div>

            <!-- Precio de compra -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <InputNumber
                  id="purchasePrice"
                  v-model="formData.purchasePrice"
                  mode="currency"
                  currency="USD"
                  class="w-full" />
                <label for="purchasePrice">Precio de compra</label>
              </FloatLabel>
            </div>

            <!-- Precio de venta -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <InputNumber
                  id="salePrice"
                  v-model="formData.salePrice"
                  mode="currency"
                  currency="USD"
                  class="w-full" />
                <label for="salePrice">Precio de venta</label>
              </FloatLabel>
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
                  class="w-full" />
              </FloatLabel>
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
              url="/api/upload"
              @upload="uploadImage($event)">
              <template #empty>
                <span>Arrastra y suelta las imágenes aquí</span>
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
  Textarea,
  FloatLabel,
  InputNumber,
  Dropdown,
  Checkbox,
  Toast,
  FileUpload,
} from 'primevue';
import { reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { CreateProductService } from '@/services/product-service';
import { useRouter } from 'vue-router';
import type { ImageURL, ProductSend } from '@/interfaces/products/product.interface';
import { backendClient } from '@/api/backend-client';

const router = useRouter();
const toast = useToast();
const submitted = ref(false);
const createService = new CreateProductService(backendClient);

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
  imageURL: '',
});

const typeOptions = [
  { label: 'General', value: 'General' },
  { label: 'Electrónico', value: 'Electrónico' },
  { label: 'Ropa', value: 'Ropa' },
  { label: 'Hogar', value: 'Hogar' },
];

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

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
  const image: ImageURL[] = [
    {
      id: 1,
      url: formData.imageURL,
    },
  ];
  return image;
};

const prepareProduct = (): ProductSend => {
  const result: ProductSend = {
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
  console.log(event.files);
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const onSubmit = async () => {
  submitted.value = true;

  if (validateForm()) {
    try {
      console.log(formData.imageURL);
      console.log(prepareProduct());
      const response = await createService.create(prepareProduct());
      console.log(response);
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
