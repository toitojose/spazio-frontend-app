<template>
  <div>
    <h4 class="mb-2 text-lg font-bold"> Registra los detalles de la propiedad </h4>
    <p class="mb-4 text-sm">{{ formDescription }}</p>
    <Form
      class="flex w-full flex-col space-y-6"
      :resolver="resolver"
      @submit="onFormSubmit">
      <!-- Ciudad (Fija: Quito) -->
      <div class="flex items-start gap-4">
        <label
          for="city"
          class="mt-2 w-2/5 text-right text-xs font-medium">
          Ciudad
        </label>
        <div class="w-full">
          <InputText
            id="city"
            model-value="Quito"
            size="small"
            disabled
            class="w-full" />
          <p class="mt-1 text-xs text-gray-500">Actualmente disponible solo en Quito.</p>
        </div>
      </div>

      <!-- Zona o Sector -->
      <div class="flex items-start gap-4">
        <label
          for="zoneId"
          class="mt-2 w-2/5 text-right text-xs font-medium">
          Zona
        </label>
        <div class="w-full">
          <Select
            id="zoneId"
            v-model="form.zoneId"
            size="small"
            :options="zones"
            placeholder="Seleccione una zona"
            option-label="label"
            option-value="value"
            class="w-full" />
        </div>
      </div>

      <!-- Dirección -->
      <div class="space-y-4">
        <div class="flex items-start gap-4">
          <label
            for="mainStreet"
            class="mt-2 w-2/5 text-right text-xs font-medium">
            Calle Principal
          </label>
          <div class="w-full">
            <InputText
              id="mainStreet"
              v-model="form.mainStreet"
              size="small"
              placeholder="Ingrese la calle principal"
              class="w-full" />
          </div>
        </div>
        <div class="flex items-start gap-4">
          <label
            for="number"
            class="mt-2 w-2/5 text-right text-xs font-medium">
            Número
          </label>
          <div class="w-full">
            <InputText
              id="number"
              v-model="form.number"
              size="small"
              placeholder="Ingrese el número"
              class="w-full" />
          </div>
        </div>
        <div class="flex items-start gap-4">
          <label
            for="secondaryStreet"
            class="mt-2 w-2/5 text-right text-xs font-medium">
            Calle Secundaria
          </label>
          <div class="w-full">
            <InputText
              id="secondaryStreet"
              v-model="form.secondaryStreet"
              size="small"
              placeholder="Ingrese la calle secundaria"
              class="w-full" />
          </div>
        </div>
      </div>

      <!-- Tipo de Inmueble -->
      <div class="flex items-start gap-4">
        <label
          for="propertyTypeId"
          class="mt-2 w-2/5 text-right text-xs font-medium">
          Tipo de Inmueble
        </label>
        <div class="w-full">
          <Select
            id="propertyTypeId"
            v-model="form.propertyTypeId"
            size="small"
            :options="propertyTypes"
            placeholder="Seleccione el tipo"
            option-label="label"
            option-value="value"
            class="w-full"
            @change="onPropertyTypeChange" />
        </div>
      </div>

      <!-- Subtipo de Inmueble -->
      <div
        v-if="filteredSubtypes.length"
        class="flex items-start gap-4">
        <label
          for="propertySubtypeId"
          class="mt-2 w-2/5 text-right text-xs font-medium">
          Subtipo
        </label>
        <div class="w-full">
          <Select
            id="propertySubtypeId"
            v-model="form.propertySubtypeId"
            size="small"
            :options="filteredSubtypes"
            placeholder="Seleccione un subtipo"
            option-label="label"
            option-value="value"
            class="w-full" />
        </div>
      </div>

      <!-- Características opcionales -->
      <div class="space-y-4">
        <div class="flex items-start gap-4">
          <label
            for="bedrooms"
            class="mt-2 w-2/5 text-right text-xs font-medium">
            Habitaciones
          </label>
          <div class="w-full">
            <InputText
              id="bedrooms"
              v-model="form.bedrooms"
              size="small"
              placeholder="Ej. 3"
              class="w-full" />
          </div>
        </div>
        <div class="flex items-start gap-4">
          <label
            for="bathrooms"
            class="mt-2 w-2/5 text-right text-xs font-medium">
            Baños
          </label>
          <div class="w-full">
            <InputText
              id="bathrooms"
              v-model="form.bathrooms"
              size="small"
              placeholder="Ej. 2"
              class="w-full" />
          </div>
        </div>
        <div class="flex items-start gap-4">
          <label
            for="parkingSpaces"
            class="mt-2 w-2/5 text-right text-xs font-medium">
            Parqueaderos
          </label>
          <div class="w-full">
            <InputText
              id="parkingSpaces"
              v-model="form.parkingSpaces"
              size="small"
              placeholder="Ej. 1"
              class="w-full" />
          </div>
        </div>
      </div>

      <!-- Valor de arriendo -->
      <div class="flex items-start gap-4">
        <label
          for="monthlyRent"
          class="mt-2 w-2/5 text-right text-xs font-medium">
          Valor mensual
        </label>
        <div class="w-full">
          <InputText
            id="monthlyRent"
            v-model="form.monthlyRent"
            size="small"
            placeholder="Ej. 400"
            class="w-full" />
        </div>
      </div>

      <!-- Botón de envío -->
      <div class="flex justify-end">
        <Button
          type="submit"
          label="Guardar"
          icon="pi pi-save"
          iconPos="right"
          size="small" />
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { InputText, Select, Button } from 'primevue';
import { Form } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';

const props = defineProps<{ contextType: 'NEW_OWNER' | 'NEW_PROPERTY'; ownerId: number | null }>();
const emit = defineEmits(['propertyRegistered']);
const toast = useToast();
/*const propertyOwnerClient = new PropertyOwnerClient();
const propertyOwnerService = new PropertyOwnerService(propertyOwnerClient);*/

const realEstateClient = new RealEstateClient();
/* -----------------------------------------------------
 * Data inicial (estática por ahora)
 * --------------------------------------------------- */

// Zonas (simuladas por ahora)
const zones = ref([
  { label: 'Cumbayá', value: 1 },
  { label: 'La Floresta', value: 2 },
  { label: 'Quitumbe', value: 3 },
]);

// Tipos y subtipos de inmuebles (simulados)
const propertyTypes = ref([
  { label: 'Casa', value: 1 },
  { label: 'Departamento', value: 2 },
  { label: 'Parqueadero', value: 3 },
  { label: 'Bodega', value: 4 },
]);

const propertySubtypes = ref([
  { label: 'Casa independiente', value: 101, typeId: 1 },
  { label: 'Casa en conjunto', value: 102, typeId: 1 },
  { label: 'Departamento dúplex', value: 201, typeId: 2 },
  { label: 'Suite', value: 202, typeId: 2 },
]);

/* -----------------------------------------------------
 * Modelo del formulario
 * --------------------------------------------------- */
const form = ref({
  zoneId: null,
  mainStreet: '',
  number: '',
  secondaryStreet: '',
  propertyTypeId: null,
  propertySubtypeId: null,
  bedrooms: '',
  bathrooms: '',
  parkingSpaces: '',
  monthlyRent: '',
});

/* -----------------------------------------------------
 * Validación básica con Zod
 * --------------------------------------------------- */
const schema = z.object({
  zoneId: z.number({ required_error: 'La zona es obligatoria' }),
  mainStreet: z.string().min(1, 'La calle principal es obligatoria'),
  number: z.string().optional(),
  secondaryStreet: z.string().optional(),
  propertyTypeId: z.number({ required_error: 'El tipo de inmueble es obligatorio' }),
  propertySubtypeId: z.number().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  parkingSpaces: z.string().optional(),
  monthlyRent: z.string().min(1, 'El valor de arriendo es obligatorio'),
});

const resolver = zodResolver(schema);

/* -----------------------------------------------------
 * Subtipos filtrados por tipo
 * --------------------------------------------------- */
const filteredSubtypes = computed(() => {
  return propertySubtypes.value.filter((s) => s.typeId === form.value.propertyTypeId);
});

/* -----------------------------------------------------
 * Envío del formulario
 * --------------------------------------------------- */
async function onFormSubmit() {
  try {
    console.log('Datos del formulario:', form.value);

    // Aquí se construirá el payload final para enviar al backend

    toast.add({
      severity: 'success',
      summary: 'Propiedad registrada',
      detail: 'Se ha enviado la información básica.',
      life: 3000,
    });

    emit('propertyRegistered', form.value);
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error al registrar propiedad',
      detail: error.message || 'Error inesperado',
      life: 4000,
    });
  }
}

/* -----------------------------------------------------
 * Descripción contextual
 * --------------------------------------------------- */
const formDescription = computed(() => {
  return props.contextType === 'NEW_OWNER'
    ? 'Comparte la información clave de la propiedad para gestionar tu arrendamiento de manera sencilla y eficiente en SPAZIO.'
    : 'El propietario ya está registrado en SPAZIO, pero aún no ha añadido propiedades. Por favor, ingresa los detalles del inmueble para continuar con la gestión del arrendamiento.';
});

function onPropertyTypeChange() {
  form.value.propertySubtypeId = null; // limpiar subtipo seleccionado

  // Si más adelante los subtipos vienen del backend, aquí puedes disparar la llamada:
  // fetchSubtypesByType(form.value.propertyTypeId)
}
</script>

<style scoped>
/* Agregar estilos si es necesario */
</style>
