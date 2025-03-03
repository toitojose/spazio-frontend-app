<template>
  <div class="">
    <h4 class="mb-2 text-lg font-bold">Estoy arrendando o tengo un pre-acuerdo</h4>
    <p class="mb-4 text-sm"> Verifica si tu arrendador está registrado en SPAZIO y continúa con el proceso. </p>
    <div class="content-inner w-full">
      <div class="w-full">
        <GeneralForm
          form-type="renter"
          user-role="renter"
          action-type="search"
          @submit="handleOwnerSearch" />
        <div
          v-show="hasSearched"
          id="property-selection"
          class="flex h-[calc(100vh-3rem)] w-full items-center pt-16">
          <div
            v-if="multipleProperties.length > 0"
            class="w-full space-y-6">
            <h4 class="mb-2 text-lg font-bold">¡Genial! Tu arrendador ya está en SPAZIO</h4>
            <p class="mb-4 text-sm">
              Hemos encontrado propiedades registradas a nombre de tu arrendador. Elige la que corresponde a tu contrato
              o acuerdo. <br />
              ¡Estás cada vez más cerca de gestionar tu arriendo con facilidad!
            </p>

            <RadioButtonGroup
              v-model="selectedProperty"
              name="propertySelection"
              :class="gridColumns"
              class="!grid gap-4">
              <div
                v-for="property in multipleProperties"
                :key="property.id"
                class="flex cursor-pointer items-center rounded-lg border p-4 shadow-sm transition hover:shadow-md">
                <RadioButton
                  :inputId="'property-' + property.id"
                  :value="property"
                  class="mr-3" />
                <label
                  :for="'property-' + property.id"
                  class="flex flex-col">
                  <span class="text-md font-semibold">{{ property.mainStreet }}, {{ property.number }}</span>
                  <span class="text-xs text-gray-600"
                    >{{ property.propertyNumber }} - {{ formatPropertyDetails(property) }}</span
                  >
                </label>
              </div>
            </RadioButtonGroup>

            <div class="flex w-full justify-between">
              <Button
                label="No encuentro mi propiedad"
                variant="outlined"
                icon="pi pi-times"
                @click="HandleNotFoundOwner" />
              <Button
                :disabled="!selectedProperty"
                label="Confirmar propiedad"
                icon="pi pi-check"
                icon-pos="right"
                @click="confirmPropertySelection" />
            </div>
          </div>
        </div>

        <div
          v-if="showPropertyForm"
          id="property-form"
          class="flex h-[calc(100vh-3rem)] w-full items-center space-x-6 pt-16">
          <SimplifiedPropertyForm />
          <Message severity="info">
            <h3 class="mb-4 text-sm font-semibold">¿Por qué solicitamos esta información?</h3>

            <ul class="ml-4 list-disc space-y-2 text-xs">
              <li>Esta información será utilizada para generar el contrato de arriendo de manera automática.</li>
              <li>Facilita el proceso legal y administrativo del arrendamiento.</li>
              <li>Garantiza que los datos estén completos y correctos para ambas partes.</li>
            </ul>
          </Message>
        </div>
        <Dialog
          v-model:visible="showDialog"
          :style="{ width: '50rem' }"
          :breakpoints="{ '768px': '50rem', '0px': '75%' }"
          modal
          :header="ownerDialogHeader"
          class="w-96">
          <p class="mb-4">
            Es posible que haya un error en los datos del propietario o que su información aún no esté registrada en el
            sistema. ¿Cómo deseas continuar?
          </p>

          <template #footer>
            <!-- Opción 1: Volver al formulario del propietario -->
            <Button
              label="buscar nuevamente al propietario"
              icon="pi pi-arrow-up"
              @click="returnToOwnerForm" />

            <!-- Opción 2: Continuar con pre-registro -->
            <Button
              label="registrar propietario y continuar"
              icon="pi pi-arrow-right"
              icon-pos="right"
              @click="continueWithPreRegistration" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import GeneralForm from '@/components/GeneralForm.vue';
import { RadioButtonGroup, RadioButton, Button, Dialog, Message } from 'primevue';
import SimplifiedPropertyForm from '@/components/property/SimplifiedPropertyForm.vue';
import { PropertyOwnersValidationStatus } from '@/enums/property-owners-validation-status.enum.ts';
import { PropertyOwnerService } from '@/services/PropertyOwnerService.ts';
import { computed, nextTick, ref, watch } from 'vue';
import type { PropertyData } from '@/interfaces/real-estate/property-data.interface.ts';
import { backendClient } from '@/services/backend-client.ts';
import type { GeneralFormData } from '@/interfaces/user.interface.ts';
import { RolesEnum } from '@/enums/roles.enum.ts';

const propertyOwnerService = new PropertyOwnerService(backendClient);
const propertyOwnerIsRegistered = ref(false);
const propertyOwnerData = ref<any>(null);
const properties = ref<PropertyData[]>([]);
const selectedProperty = ref<PropertyData | null>(null);
const hasSearched = ref(false);
const showDialog = ref(false);
const ownerDialogHeader = ref('No encuentro al propietario');

const showPropertyForm = ref(false);
const multipleProperties = computed(() => (properties.value.length > 0 ? properties.value : []));

const prepareValidateData = (formData: { values: GeneralFormData }): GeneralFormData => ({
  firstName: formData.values.firstName.trim(),
  middleName: formData.values.middleName?.trim() || undefined,
  lastName: formData.values.lastName.trim(),
  secondLastName: formData.values.secondLastName?.trim() || undefined,
  email: formData.values.email ? formData.values.email.trim().toLowerCase() : undefined,
  idNumber: formData.values.idNumber ? formData.values.idNumber.trim() : undefined,
  landline: formData.values.landline ? formData.values.landline.trim() : undefined,
  mobile: formData.values.mobile ? formData.values.mobile.trim() : undefined,
  roleType: RolesEnum.PROPERTY_OWNER,
});
const handleOwnerSearch = async (formData: any) => {
  if (!formData.valid) {
    alert('El formulario del propietario no es válido, no se puede proceder con la búsqueda.');
    return;
  }

  try {
    const propertyOwnerDataReady = prepareValidateData(formData);
    const response = await propertyOwnerService.validatePropertyOwner(propertyOwnerDataReady);

    if (response.result && response.data) {
      const data = response.data;
      // Caso verde: propietario encontrado y confirmado
      if (data.status === PropertyOwnersValidationStatus.OWNER_CONFIRMED) {
        proceedToPropertySelection(data.properties);
      }
      if (data.status === PropertyOwnersValidationStatus.OWNER_NOT_FOUND) {
        showDialog.value = true;
        ownerDialogHeader.value = 'No encontramos un propietario con estos datos';
      }
    }
  } catch (error) {
    console.error('Error en la simulación del backend:', error);
  }
  propertyOwnerIsRegistered.value = false;
};

// Simulación de datos recibidos después de buscar al propietario
const proceedToPropertySelection = (receivedProperties: PropertyData[]) => {
  properties.value = receivedProperties;
  hasSearched.value = true;
  nextTick(() => {
    const section = document.getElementById('property-selection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
};
const formatPropertyDetails = (property: PropertyData) => {
  return `${property.bedrooms ?? 0} hab. | ${property.bathrooms ?? 0} baños | ${property.propertyArea ?? 0} m²`;
};

// Confirmar la propiedad seleccionada
const confirmPropertySelection = () => {
  console.log('🏡 Propiedad seleccionada:', selectedProperty.value);
};

const gridColumns = computed(() => {
  const count = multipleProperties.value.length;
  if (count % 3 === 0) return 'grid-cols-3';
  if (count % 2 === 0) return 'grid-cols-2';
  return 'grid-cols-1';
});
watch(multipleProperties, (newProperties) => {
  if (newProperties.length > 0 && !selectedProperty.value) {
    selectedProperty.value = newProperties[0];
  }
});

const returnToOwnerForm = () => {
  showDialog.value = false;
  hasSearched.value = false;
  nextTick(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};

const continueWithPreRegistration = async () => {
  showDialog.value = false;
  try {
    /**
     * Simulación de registro de propietario en el backend
     * 1. Utilizar la data que recibimos del formulario de propietario para enviarle al servicio, esta data se encuentra en propertyOwnerData
     * 2. llamamos al servicio propertyOwnerService.createPropertyOwner con propertyOwnerData.value
     * 3. si el registro es exitoso, mostramos mensaje de exito
     * 4. Mostramos el formulario de propiedad
     */
    if (!propertyOwnerData.value) {
      alert('No hay datos de propietario para registrar');
      return;
    }
    const response = await propertyOwnerService.createPropertyOwner(propertyOwnerData.value);
    if (response.result) {
      showPropertyForm.value = true;
      nextTick(() => {
        const section = document.getElementById('property-form');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      console.error('Error en el pre-registro:', response.message);
    }
  } catch (error) {
    console.error('Error al registrar propietario:', error);
  }
};

const HandleNotFoundOwner = () => {
  showDialog.value = true;
  ownerDialogHeader.value = 'No encuentro mi propiedad en la lista';
};
</script>
<style scoped></style>
