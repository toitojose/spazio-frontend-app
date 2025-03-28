<template>
  <div>
    <h4 class="mb-2 text-lg font-bold"> Registra los detalles de la propiedad </h4>
    <p class="mb-4 text-sm">{{ formDescription }}</p>

    <Form
      class="flex w-full flex-col space-y-6"
      :resolver="resolver"
      @submit="onFormSubmit">
      <!-- Ciudad -->
      <div class="flex items-start gap-4">
        <label
          for="city"
          class="mt-2 w-2/5 text-right text-xs font-medium"
          >Ciudad</label
        >
        <div class="w-full">
          <InputText
            id="city"
            v-model="property.city"
            size="small"
            placeholder="Quito"
            disabled
            class="w-full" />
          <p class="mt-1 text-xs text-gray-500">Actualmente disponible solo en Quito. Próximamente en más ciudades.</p>
        </div>
      </div>

      <!-- Barrio -->
      <div class="flex items-start gap-4">
        <label
          for="neighborhood"
          class="mt-2 w-2/5 text-right text-xs font-medium">
          Barrio
        </label>
        <div class="w-full">
          <Select
            id="neighborhood"
            v-model="property.neighborhood"
            size="small"
            :options="neighborhoods"
            placeholder="Seleccione un barrio"
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
            class="mt-2 w-2/5 text-right text-xs font-medium"
            >Calle Principal</label
          >
          <div class="w-full">
            <InputText
              id="mainStreet"
              v-model="property.mainStreet"
              size="small"
              placeholder="Ingrese la calle principal"
              class="w-full" />
          </div>
        </div>
        <div class="flex items-start gap-4">
          <label
            for="numeration"
            class="mt-2 w-2/5 text-right text-xs font-medium"
            >Numeración</label
          >
          <div class="w-full">
            <InputText
              id="numeration"
              v-model="property.numeration"
              size="small"
              placeholder="Ingrese la numeración"
              class="w-full" />
          </div>
        </div>
        <div class="flex items-start gap-4">
          <label
            for="secondaryStreet"
            class="mt-2 w-2/5 text-right text-xs font-medium"
            >Calle Secundaria</label
          >
          <div class="w-full">
            <InputText
              id="secondaryStreet"
              v-model="property.secondaryStreet"
              size="small"
              placeholder="Ingrese la calle secundaria"
              class="w-full" />
          </div>
        </div>
      </div>

      <!-- Tipo de Inmueble -->
      <div class="flex items-start gap-4">
        <label
          for="propertyType"
          class="mt-2 w-2/5 text-right text-xs font-medium"
          >Tipo de Inmueble</label
        >
        <div class="w-full">
          <Select
            id="propertyType"
            v-model="property.type"
            size="small"
            :options="propertyTypes"
            placeholder="Tipo de inmueble"
            option-label="label"
            option-value="value"
            class="w-full"
            @change="onPropertyTypeChange" />
        </div>
      </div>

      <!-- Campos dinámicos -->
      <div
        v-if="dynamicFields.length"
        class="space-y-4">
        <div
          v-for="field in dynamicFields"
          :key="field.key"
          class="flex items-start gap-4">
          <label
            :for="field.key"
            class="mt-2 w-2/5 text-right text-xs font-medium">
            {{ field.label }}
          </label>
          <div class="w-full">
            <InputText
              v-if="field.type === 'text'"
              :id="field.key"
              :placeholder="field.placeholder"
              size="small"
              class="w-full" />
          </div>
        </div>
      </div>

      <!-- Botón de envío -->
      <div class="flex justify-end">
        <Button
          type="submit"
          label="Guardar"
          class=""
          icon="pi pi-save"
          iconPos="right"
          size="small" />
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue';
import { InputText, Select, Button } from 'primevue';
import { Form } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { PropertyOwnerClient } from '@/api/PropertyOwnerClient.ts';
import { PropertyOwnerService } from '@/services/property-owner-service.ts';

const props = defineProps<{ contextType: 'NEW_OWNER' | 'NEW_PROPERTY'; ownerId: number | null }>();
const toast = useToast();
const propertyOwnerClient = new PropertyOwnerClient();
const propertyOwnerService = new PropertyOwnerService(propertyOwnerClient);

const formDescription = computed(() => {
  return props.contextType === 'NEW_OWNER'
    ? 'Comparte la información clave de la propiedad para gestionar tu arrendamiento de manera sencilla y eficiente en SPAZIO.'
    : 'El propietario ya está registrado en SPAZIO, pero aún no ha añadido propiedades. Por favor, ingresa los detalles del inmueble para continuar con la gestión del arrendamiento.';
});

// Modelo de datos simplificados del inmueble
const property = ref({
  city: 'Quito',
  neighborhood: '',
  mainStreet: '',
  numeration: '',
  secondaryStreet: '',
  type: null,
  rooms: null,
});

// Opciones de barrios en Quito
const neighborhoods = [
  'La Mariscal',
  'Cumbayá',
  'Quitumbe',
  'La Floresta',
  'El Condado',
  'Carcelén',
  'Guayllabamba',
  'Chimbacalle',
  'Pomasqui',
  'Centro Histórico',
].map((barrio) => ({ label: barrio, value: barrio }));

// Opciones para el tipo de inmueble
const propertyTypes = [
  { label: 'Departamento', value: 'department' },
  { label: 'Casa', value: 'house' },
  { label: 'Bodega', value: 'warehouse' },
  { label: 'Parqueadero', value: 'parking' },
  { label: 'Terreno', value: 'land' },
];

// Campos dinámicos según el tipo de inmueble
const dynamicFields = ref<{ key: string; label: string; placeholder: string; type: string }[]>([]);
const fieldsByType: Record<string, { key: string; label: string; placeholder: string; type: string }[]> = {
  department: [
    { key: 'buildingName', label: 'Nombre del Edificio', placeholder: 'Ingrese el nombre del edificio', type: 'text' },
    {
      key: 'apartmentNumber',
      label: 'Número de Departamento',
      placeholder: 'Ingrese el número de departamento',
      type: 'text',
    },
    { key: 'tower', label: 'Torre', placeholder: 'Ingrese el nombre o número de la torre', type: 'text' },
  ],
  house: [
    { key: 'lotSize', label: 'Tamaño del Lote', placeholder: 'Ingrese el tamaño del lote en m²', type: 'text' },
    { key: 'garageSpaces', label: 'Espacios de Garaje', placeholder: 'Ingrese el número de garajes', type: 'text' },
  ],
  warehouse: [
    { key: 'warehouseNumber', label: 'Número de Bodega', placeholder: 'Ingrese el número de bodega', type: 'text' },
  ],
  parking: [
    {
      key: 'parkingNumber',
      label: 'Número de Parqueadero',
      placeholder: 'Ingrese el número de parqueadero',
      type: 'text',
    },
  ],
};

// Actualizar campos dinámicos
function onPropertyTypeChange() {
  const type = property.value.type as unknown as string;
  dynamicFields.value = fieldsByType[type] || [];
}
const schema = z.object({
  neighborhood: z.string().min(1, 'El barrio es obligatorio'),
  mainStreet: z.string().min(1, 'La calle principal es obligatoria'),
  numeration: z.string().min(1, 'La numeración es obligatoria'),
  secondaryStreet: z.string().min(1, 'La calle secundaria es obligatoria'),
  type: z.string().min(1, 'El tipo de inmueble es obligatorio'),
});
const resolver = zodResolver(schema);

const emit = defineEmits(['propertyRegistered']);
async function onFormSubmit() {
  const payload = {
    ...property.value,
    ownerId: props.ownerId,
  };

  try {
    console.log('Enviando propiedad al backend:', payload);
    // Aquí deberías llamar a tu servicio realEstateService.createProperty(payload);

    // Simulación de éxito
    toast.add({ severity: 'success', summary: 'Propiedad registrada', life: 3000 });
    emit('propertyRegistered', payload);
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error al registrar propiedad', detail: error.message, life: 5000 });
  }
}
</script>

<style scoped>
/* Agregar estilos si es necesario */
</style>
