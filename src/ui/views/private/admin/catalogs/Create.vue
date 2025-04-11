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
                  v-model="formData.category_level"
                  :options="categoryOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Seleccione una categoría"
                  :class="{ 'p-invalid': submitted && !formData.category_level }"
                  class="w-full" />
              </FloatLabel>
              <small
                v-if="submitted && !formData.category_level"
                class="p-error text-red-500"
                >La categoría es requerida</small
              >
            </div>

            <!-- Fechas -->
            <div class="flex w-full gap-4">
              <div class="flex w-full flex-col gap-1">
                <label
                  for="start_date"
                  class="text-sm font-medium"
                  >Fecha de inicio</label
                >
                <DatePicker
                  id="start_date"
                  v-model="formData.start_date"
                  showIcon
                  showTime
                  hourFormat="12"
                  dateFormat="yy-mm-dd"
                  :class="{ 'p-invalid': submitted && !formData.start_date }"
                  class="w-full" />
                <small
                  v-if="submitted && !formData.start_date"
                  class="p-error text-red-500">
                  La fecha de inicio es requerida
                </small>
              </div>

              <div class="flex w-full flex-col gap-1">
                <label
                  for="endDate"
                  class="text-sm font-medium"
                  >Fecha de fin</label
                >
                <DatePicker
                  id="endDate"
                  v-model="formData.end_date"
                  showIcon
                  showTime
                  hourFormat="12"
                  dateFormat="yy-mm-dd"
                  :class="{ 'p-invalid': submitted && !formData.end_date }"
                  class="w-full" />
                <small
                  v-if="submitted && !formData.end_date"
                  class="p-error text-red-500">
                  La fecha de fin es requerida
                </small>
              </div>
            </div>

            <!-- Estado -->
            <div class="flex w-full flex-col gap-1">
              <div class="flex items-center gap-2">
                <Checkbox
                  id="access"
                  v-model="formData.is_public"
                  :binary="true" />
                <label for="access">¿Es publico?</label>
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
import { Card, InputText, Button as PButton, FloatLabel, Dropdown, Checkbox, Breadcrumb } from 'primevue';
import { reactive, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import DatePicker from 'primevue/datepicker';
import { useRouter } from 'vue-router';
import { backendClient } from '@/api/backend-client';
import type { CatalogSend } from '@/interfaces/catalogs/catalogs.interface';
import { CatalogService } from '@/services/catalogs-services';
import { CategoryLevelEnum } from '@/enums/category-level.enum';

//Constantes de Breadcrumb
const home = ref({
  icon: 'pi pi-home',
  route: '/admin',
});
const items = ref([{ label: 'Catálogos', route: '/admin/catalogs' }, { label: 'Crear' }]);

const router = useRouter();
const toast = useToast();
const submitted = ref(false);
const createCatalog = new CatalogService(backendClient);

const formData = reactive({
  name: '',
  description: '',
  is_public: true,
  category_level: 0,
  start_date: null as Date | null,
  end_date: null as Date | null,
});

const categoryOptions = [
  { label: 'NIVEL 1', value: CategoryLevelEnum.LEVEL1 },
  { label: 'NIVEL 2', value: CategoryLevelEnum.LEVEL2 },
  { label: 'NIVEL 3', value: CategoryLevelEnum.LEVEL3 },
  { label: 'NIVEL 4', value: CategoryLevelEnum.LEVEL4 },
];

const validateForm = () => {
  return formData.name && formData.description && formData.category_level && formData.start_date && formData.end_date;
};

const prepareCatalog = (): CatalogSend => {
  const toUtcISOString = (date: Date | null): string => {
    return date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('.')[0] + 'Z' : '';
  };
  
  const result: CatalogSend = {
    name: formData.name,
    description: formData.description,
    isPublic: formData.is_public,
    categoryLevel: Number(formData.category_level),
    startDate: toUtcISOString(formData.start_date),
    endDate: toUtcISOString(formData.end_date),
    products: [],
  };
  return result;
};

const onSubmit = async () => {
  submitted.value = true;

  if (validateForm()) {
    try {
      const response = await createCatalog.create(prepareCatalog());
      console.log(response);
      if (response.result) {
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Catálogo guardado correctamente', life: 3000 });
        setTimeout(() => {
          router.push('/admin/catalogs');
          submitted.value = false;
        }, 1000);
      } else {
        throw new Error(response.message || 'Error desconocido');
      }
    } catch (error: any) {
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
