<template>
  <div class="mb-4 flex items-center">
    <h2 class="text-center text-2xl font-semibold">Agregar Catálogo</h2>
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
          class="grid grid-cols-1 gap-4 p-1"
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

            <!-- Descripcion -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <InputText
                  id="description"
                  v-model="formData.description"
                  :class="{ 'p-invalid': submitted && !formData.description }"
                  class="w-full" />
                <label for="description">Descripción</label>
              </FloatLabel>
              <small
                v-if="submitted && !formData.description"
                class="p-error text-red-500"
                >La descripción es requerida</small
              >
            </div>

            <!-- Tipo -->
            <div class="flex w-full flex-col gap-1">
              <FloatLabel variant="on">
                <Dropdown
                  id="category"
                  v-model="formData.category"
                  :options="categoryOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Seleccione una categoría"
                  :class="{ 'p-invalid': submitted && !formData.category }"
                  class="w-full" />
              </FloatLabel>
              <small
                v-if="submitted && !formData.category"
                class="p-error text-red-500"
                >La categoría es requerida</small
              >
            </div>

            <!-- Estado -->
            <div class="flex w-full flex-col gap-1">
              <div class="flex items-center gap-2">
                <Checkbox
                  id="access"
                  v-model="formData.access"
                  :binary="true" />
                <label for="access">Es publico?</label>
              </div>
            </div>
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
import { reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { CreateProductService } from '@/services/product-service';
import { useRouter } from 'vue-router';
import type { ImageURL, ProductSend } from '@/interfaces/products/product.interface';
import { backendClient } from '@/api/backend-client';

//Constantes de Breadcrumb
const home = ref({
  icon: 'pi pi-home',
  route: '/admin',
});
const items = ref([{ label: 'Catálogos', route: '/admin/catalogs' }, { label: 'Crear' }]);

const router = useRouter();
const toast = useToast();
const submitted = ref(false);
const createService = new CreateProductService(backendClient);

const formData = reactive({
  name: '',
  description: '',
  isPublic: true,
  category: '',
});

const categoryOptions = [
  { label: 'Nivel 1', value: 'Nivel 1' },
  { label: 'Nivel 2', value: 'Nivel 2' },
  { label: 'Nivel 3', value: 'Nivel 3' },
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
  return formData.imageURL;
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

<style lang="scss" scoped>
:deep(.p-breadcrumb) {
  background: transparent;
  border: none;
  padding: 0;
}
</style>
