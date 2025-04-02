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
            filter
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
              v-model="form.propertyNumber"
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
            for="halfBathrooms"
            class="mt-2 w-2/5 text-right text-xs font-medium">
            Medios Baños
          </label>
          <div class="w-full">
            <InputText
              id="halfBathrooms"
              v-model="form.halfBathrooms"
              size="small"
              placeholder="Ej. 1"
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
      <div class="flo Bodega-Galpex justify-end">
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
import { computed, nextTick, onMounted, ref } from 'vue';
import { InputText, Select, Button } from 'primevue';
import { Form } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { PropertiesClient } from '@/api/PropertiesClient.ts';
import { PropertyService } from '@/services/property-service.ts';
import type { PropertySubtype, PropertyType, Zone } from '@/interfaces/real-estate/basic.interface.ts';
import type { CreateSimplifiedPropertyDto } from '@/interfaces/real-estate/property-data.interface.ts';

const props = defineProps<{ contextType: 'NEW_OWNER' | 'NEW_PROPERTY'; ownerId: number | null }>();
const emit = defineEmits(['propertyRegistered']);
const toast = useToast();
// Para el formulario (dropdowns)
const propertyTypes = ref<{ label: string; value: number }[]>([]);
const zones = ref<{ label: string; value: number }[]>([]);

// Para lógica interna (subtipos y filtros dinámicos)
const allPropertyTypes = ref<PropertyType[]>([]);
const allPropertySubtypes = ref<PropertySubtype[]>([]);
const allZones = ref<Zone[]>([]);
const propertyService = new PropertyService(new PropertiesClient());
async function initForm() {
  try {
    const data = await propertyService.getInitialPropertyData();

    // Guardar data completa
    allPropertyTypes.value = data.types;
    allPropertySubtypes.value = data.subtypes;
    allZones.value = data.zones;

    // Preparar para los selects
    propertyTypes.value = data.types.map((t) => ({ label: t.name, value: t.id }));
    zones.value = data.zones.map((z) => ({ label: z.name, value: z.id }));
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: 'Error al cargar datos',
      detail: err?.message || 'No se pudo obtener información inicial del servidor.',
      life: 5000,
    });

    console.error('❌ Error al obtener datos iniciales:', err?.error || err);
  }
}

onMounted(() => {
  nextTick(() => {
    initForm();
  });
});

/* -----------------------------------------------------
 * Modelo del formulario
 * --------------------------------------------------- */
const form = ref({
  zoneId: null,
  mainStreet: '',
  propertyNumber: '',
  secondaryStreet: '',
  propertyTypeId: null,
  propertySubtypeId: null,
  bedrooms: '',
  bathrooms: '',
  halfBathrooms: '',
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
  halfBathrooms: z.string().optional(),
  parkingSpaces: z.string().optional(),
  monthlyRent: z.string().min(1, 'El valor de arriendo es obligatorio'),
});

const resolver = zodResolver(schema);

/* -----------------------------------------------------
 * Subtipos filtrados por tipo
 * --------------------------------------------------- */
const filteredSubtypes = computed(() => {
  return allPropertySubtypes.value
    .filter((subtype) => subtype.propertyTypeId === form.value.propertyTypeId)
    .map((subtype) => ({ label: subtype.name, value: subtype.id }));
});

/* -----------------------------------------------------
 * Envío del formulario
 * --------------------------------------------------- */
async function onFormSubmit() {
  try {
    const payload: CreateSimplifiedPropertyDto = {
      zoneId: form.value.zoneId,
      mainStreet: form.value.mainStreet,
      propertyNumber: form.value.propertyNumber,
      secondaryStreet: form.value.secondaryStreet,
      propertyTypeId: form.value.propertyTypeId,
      propertySubtypeId: form.value.propertySubtypeId ?? null,
      bedrooms: form.value.bedrooms ? Number(form.value.bedrooms) : null,
      bathrooms: form.value.bathrooms ? Number(form.value.bathrooms) : null,
      halfBathrooms: form.value.halfBathrooms ? Number(form.value.halfBathrooms) : null,
      parkingSpaces: form.value.parkingSpaces ? Number(form.value.parkingSpaces) : null,
      monthlyRent: form.value.monthlyRent ? Number(form.value.monthlyRent) : null,
      ownerId: props.ownerId!,
    };

    const result = await propertyService.createPropertyFromRenter(payload);

    if (result.success && result.data) {
      toast.add({
        severity: 'success',
        summary: 'Propiedad registrada',
        detail: result.message,
        life: 3000,
      });

      emit('propertyRegistered', result.data);
    } else {
      throw result.error || { message: result.message || 'Error inesperado.' };
    }
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
