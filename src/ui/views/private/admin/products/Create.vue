<template>
  <!-- Header con título y botón -->
  <div class="mb-4 flex items-center justify-center">
    <h2 class="text-center text-2xl font-semibold">Agregar Producto</h2>
  </div>

  <!-- Contenedor centrado -->
  <div class="flex justify-center">
    <Card style="width: 50rem; overflow: hidden">
      <template #content>
        <form
          class="grid grid-cols-2 gap-4 p-4"
          @submit.prevent="onSubmit">
          <!-- Nombre -->
          <div class="flex w-full max-w-md flex-col gap-1">
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
              class="p-error"
              >El nombre es requerido</small
            >
          </div>

          <!-- Resumen -->
          <div class="flex w-full max-w-md flex-col gap-1">
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
              class="p-error"
              >El resumen es requerido</small
            >
          </div>

          <!-- Descripción -->
          <div class="flex w-full max-w-md flex-col gap-1">
            <FloatLabel variant="on">
              <Textarea
                id="description"
                v-model="formData.description"
                :class="{ 'p-invalid': submitted && !formData.description }"
                class="w-full" />
              <label for="description">Descripción</label>
            </FloatLabel>
            <small
              v-if="submitted && !formData.description"
              class="p-error"
              >La descripción es requerida</small
            >
          </div>

          <!-- Precio de compra -->
          <div class="flex w-full max-w-md flex-col gap-1">
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
              class="p-error"
              >El precio debe ser mayor a 0</small
            >
          </div>

          <!-- Precio de venta -->
          <div class="flex w-full max-w-md flex-col gap-1">
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
              class="p-error"
              >El precio debe ser mayor a 0</small
            >
          </div>

          <!-- Tipo -->
          <div class="flex w-full max-w-md flex-col gap-1">
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
              class="p-error"
              >El tipo es requerido</small
            >
          </div>

          <!-- Estado -->
          <div class="flex w-full max-w-md flex-col gap-1">
            <div class="flex items-center gap-2">
              <Checkbox
                id="status"
                v-model="formData.status"
                :binary="true"
                class="w-full" />
              <label for="status">Activo</label>
            </div>
          </div>

          <!-- Subida de imagenes -->
          <div class="card">
            <Toast />
            <FileUpload
              :multiple="true"
              accept="image/*"
              :maxFileSize="1000000"
              name="demo[]"
              url="/api/upload"
              @upload="uploadImage">
              <template #empty>
                <span>Drag and drop files to here to upload.</span>
              </template>
            </FileUpload>
          </div>

          <!-- Botón alineado -->
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
import type { ImageURL, ProductCreateResult, ProductSend } from '@/interfaces/products/product.interface';
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

const uploadImage = () => {
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const onSubmit = async () => {
  submitted.value = true;

  if (validateForm()) {
    try {
      const response = await createService.create(prepareProduct());
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
