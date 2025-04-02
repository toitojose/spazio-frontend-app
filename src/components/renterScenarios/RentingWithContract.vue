<template>
  <div class="flex flex-col space-y-12">
    <div
      v-if="!showSuccessMessage"
      class="space-y-2">
      <h4 class="mb-2 text-lg font-bold">Estoy arrendando o tengo un pre-acuerdo</h4>
      <p class="mb-4 text-sm"> Verifica si tu arrendador está registrado en SPAZIO y continúa con el proceso. </p>
    </div>

    <div
      v-if="showOwnerSearchForm"
      class="w-full">
      <GeneralForm
        form-type="renter"
        user-role="renter"
        action-type="search"
        @submit="handleOwnerSearch" />
    </div>

    <!--Se encontro al menos una propiedad-->
    <div
      v-if="hasSearched && !showPropertyForm"
      id="property-selection"
      class="flex h-[calc(100vh-3rem)] w-full items-center pt-16">
      <div
        v-if="properties.length > 0"
        class="w-full space-y-6">
        <h4 class="mb-2 text-lg font-bold">¡Genial! Tu arrendador ya está en SPAZIO</h4>
        <p class="mb-4 text-sm">
          Hemos encontrado propiedades registradas a nombre de tu arrendador. Elige la que corresponde a tu contrato o
          acuerdo. <br />
          ¡Estás cada vez más cerca de gestionar tu arriendo con facilidad!
        </p>

        <RadioButtonGroup
          v-model="selectedProperty"
          name="propertySelection"
          :class="gridColumns"
          class="!grid gap-4">
          <div
            v-for="property in properties"
            :key="property.id"
            class="flex cursor-pointer items-start rounded-lg border p-4 shadow-sm transition hover:shadow-md">
            <RadioButton
              :inputId="'property-' + property.id"
              :value="property"
              class="mr-4 mt-1" />

            <label
              :for="'property-' + property.id"
              class="flex flex-col">
              <span class="text-md font-semibold">
                {{ property.address.mainStreet
                }}{{ property.address.propertyNumber ? ', ' + property.address.propertyNumber : '' }}
              </span>

              <span class="text-sm text-gray-500">
                {{ property.propertyType.name }}
                <template v-if="property.subtype"> - {{ property.subtype.name }}</template>
                &nbsp;|&nbsp;
                {{ property.bedrooms || 0 }} hab
                <template v-if="property.bathrooms">, {{ property.bathrooms }} baños</template>
                <template v-if="property.halfBathrooms">, {{ property.halfBathrooms }} medios</template>
              </span>

              <span class="mt-1 text-xs text-gray-400"> Zona: {{ property.address.zone.name }} </span>
            </label>
          </div>
        </RadioButtonGroup>

        <div class="flex w-full justify-between">
          <Button
            label="No encuentro mi propiedad"
            variant="outlined"
            icon="pi pi-times"
            @click="showNoPropertyDialog = true" />
          <Button
            :disabled="!selectedProperty"
            label="Confirmar propiedad"
            icon="pi pi-check"
            icon-pos="right"
            @click="confirmPropertySelection" />
        </div>
        <Dialog
          v-model:visible="showNoPropertyDialog"
          :style="{ width: '50rem' }"
          :breakpoints="{ '768px': '50rem', '0px': '75%' }"
          modal
          header="No encuentro mi propiedad en la lista"
          class="w-96">
          <p class="mb-4">
            El propietario ha sido encontrado en el sistema y ya tiene propiedades registradas. Sin embargo, si la
            propiedad que deseas arrendar no está en la lista, puedes agregar una nueva propiedad a su nombre.
          </p>

          <template #footer>
            <Button
              label="Buscar nuevamente al propietario"
              icon="pi pi-arrow-up"
              variant="outlined"
              @click="returnToOwnerForm" />
            <Button
              label="Crear nueva propiedad"
              icon="pi pi-plus"
              icon-pos="right"
              @click="createNewPropertyForOwner" />
          </template>
        </Dialog>
      </div>
    </div>

    <!--No se encontro ninguna propiedad-->
    <div
      v-if="showPropertyForm"
      id="property-form"
      class="flex h-[calc(100vh-3rem)] w-full items-center space-x-6">
      <SimplifiedPropertyForm
        :context-type="propertyContextType"
        :owner-id="propertyOwnerId"
        @propertyRegistered="handleReadyToProceed" />
      <Message severity="info">
        <h3 class="mb-4 text-sm font-semibold">¿Por qué solicitamos esta información?</h3>

        <ul class="ml-4 list-disc space-y-2 text-xs">
          <li>Esta información será utilizada para generar el contrato de arriendo de manera automática.</li>
          <li>Facilita el proceso legal y administrativo del arrendamiento.</li>
          <li>Garantiza que los datos estén completos y correctos para ambas partes.</li>
        </ul>
      </Message>
    </div>

    <Message
      v-if="showSuccessMessage"
      severity="success">
      <h2 class="mb-4 font-semibold">¡Propiedad aplicada con éxito!</h2>
      <p>Puedes continuar con el proceso de arriendo.</p>
    </Message>

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
</template>
<script setup lang="ts">
import GeneralForm from '@/components/GeneralForm.vue';
import { RadioButtonGroup, RadioButton, Button, Dialog, Message } from 'primevue';
import SimplifiedPropertyForm from '@/components/property/SimplifiedPropertyForm.vue';
import { computed, nextTick, ref } from 'vue';
import type { PropertyData } from '@/interfaces/real-estate/property-data.interface.ts';
import { RolesEnum } from '@/enums/roles.enum.ts';
import type { GeneralFormData } from '@/interfaces/User.interface.ts';
import { PropertyOwnerService } from '@/services/property-owner-service.ts';
import { UserClient } from '@/api/UserClient.ts';
import { UserService } from '@/services/user-service.ts';
import { useToast } from 'primevue/usetoast';
import { PropertyOwnerClient } from '@/api/PropertyOwnerClient.ts';
import { useI18n } from 'vue-i18n';
import { LeasingApplicationClient } from '@/api/LeasingApplicationClient.ts';
import { LeaseApplicationService } from '@/services/lease-application-service.ts';

const { t } = useI18n();
const propertyOwnerClient = new PropertyOwnerClient();
const propertyOwnerService = new PropertyOwnerService(propertyOwnerClient);
const leasingApplicationClient = new LeasingApplicationClient();
const leasingApplicationService = new LeaseApplicationService(leasingApplicationClient);
const userClient = new UserClient();
const userService = new UserService(userClient);
const showOwnerSearchForm = ref(true);
const showSuccessMessage = ref(false);
const propertyOwnerIsRegistered = ref(false);
let propertyOwnerData = ref<GeneralFormData | null>(null);
const propertyOwnerId = ref<number | null>(null);
const properties = ref<PropertyData[]>([]);
const propertyContextType = ref<'NEW_OWNER' | 'NEW_PROPERTY'>('NEW_PROPERTY');
const selectedProperty = ref<PropertyData | null>(null);
const hasSearched = ref(false);
const showDialog = ref(false);
const showNoPropertyDialog = ref(false);
const ownerDialogHeader = ref('No encuentro al propietario');
const emit = defineEmits<{
  (e: 'readyToProceed', value: boolean): void;
}>();
const toast = useToast();

const showPropertyForm = ref(false);

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
    propertyOwnerData.value = prepareValidateData(formData);
    const response = await propertyOwnerService.validatePropertyOwner(propertyOwnerData.value);

    if (response.success && response.data) {
      const data = response.data;
      propertyOwnerId.value = data.ownerId;
      switch (data.status) {
        case 'PROPERTY_OWNER_NOT_FOUND':
          showDialog.value = true;
          ownerDialogHeader.value = 'No encontramos un propietario con estos datos';
          toast.add({
            severity: 'warn',
            summary: response.message,
            detail: t('renter.renting_with_contract.property_validation.' + data.status.toLowerCase()),
            life: 3000,
          });
          break;
        case 'PROPERTIES_NOT_FOUND':
          toast.add({
            severity: 'warn',
            summary: response.message,
            detail: t('renter.renting_with_contract.property_validation.' + data.status.toLowerCase()),
            life: 3000,
          });
          proceedToPropertySelection(data.properties);
          break;
        case 'PROPERTIES_FOUND':
          toast.add({
            severity: 'info',
            summary: response.message,
            detail: t('renter.renting_with_contract.property_validation.' + data.status.toLowerCase()),
            life: 3000,
          });
          proceedToPropertySelection(data.properties);
          break;
        default:
          toast.add({ severity: 'info', summary: 'Resultado de la búsqueda', detail: response.message, life: 3000 });
          break;
      }
    } else {
      toast.add({ severity: 'error', summary: response.message, detail: response.error, life: 3000 });
    }
  } catch (error: any) {
    const errorResponse = error?.response?.data;
    const summary = errorResponse?.message || 'Error inesperado al validar el propietario';
    const errorKey = errorResponse?.error?.error || 'ERROR_DESCONOCIDO';

    const friendlyError =
      errorKey === 'AggregateError'
        ? 'Ocurrió un error inesperado al consultar las propiedades. Intenta más tarde o contacta soporte.'
        : errorKey;

    toast.add({
      severity: 'error',
      summary,
      detail: friendlyError,
      life: 4000,
    });
  }
  propertyOwnerIsRegistered.value = false;
};

const proceedToPropertySelection = (receivedProperties: PropertyData[]) => {
  properties.value = receivedProperties;
  hasSearched.value = true;

  if (receivedProperties.length === 0) {
    // Caso: Propietario sin propiedades, mostrar el formulario de nueva propiedad
    propertyContextType.value = 'NEW_PROPERTY';
    showPropertyForm.value = true;
    nextTick(() => {
      const section = document.getElementById('property-form');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  } else {
    // Caso: Propietario con propiedades, mostrar la selección de propiedades
    selectedProperty.value = receivedProperties[0];
    showPropertyForm.value = false;
    nextTick(() => {
      const section = document.getElementById('property-selection');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
};

const confirmPropertySelection = async () => {
  if (!selectedProperty.value || !propertyOwnerId.value) {
    toast.add({
      severity: 'warn',
      summary: 'Datos incompletos',
      detail: 'Falta seleccionar una propiedad o el propietario no está definido.',
      life: 3000,
    });
    return;
  }

  try {
    const result = await leasingApplicationService.createLeaseApplication(
      propertyOwnerId.value,
      selectedProperty.value.id,
    );

    if (result.success) {
      toast.add({
        severity: 'success',
        summary: 'Solicitud enviada',
        detail: result.message,
        life: 3000,
      });

      handleReadyToProceed();
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error al aplicar',
        detail: result.message || 'Intenta más tarde.',
        life: 4000,
      });
    }
  } catch (err: any) {
    toast.add({
      severity: 'error',
      summary: 'Error inesperado',
      detail: err.message || 'Ocurrió un error al enviar la solicitud.',
      life: 4000,
    });
  }
};

const gridColumns = computed(() => {
  const count = properties.value.length;
  if (count === 0) return ''; // No aplica si no hay propiedades
  if (count % 3 === 0) return 'grid-cols-3';
  if (count % 2 === 0) return 'grid-cols-2';
  return 'grid-cols-1';
});

const returnToOwnerForm = () => {
  showNoPropertyDialog.value = false;
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
    if (!propertyOwnerData) {
      alert('No hay datos de propietario para registrar');
      return;
    }
    showPropertyForm;
    if (propertyOwnerData.value) {
      const response = await userService.registerUser(propertyOwnerData.value);

      if (response.success && response.data) {
        propertyOwnerId.value = response.data.id;
        propertyContextType.value = 'NEW_OWNER';
        showPropertyForm.value = true;
        nextTick(() => {
          const section = document.getElementById('property-form');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        });
      } else {
        toast.add({ severity: 'error', summary: 'Error en el pre-registro', detail: response.message, life: 3000 });
      }
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error al registrar propietario', detail: error, life: 3000 });
  }
};

const createNewPropertyForOwner = () => {
  showNoPropertyDialog.value = false;
  showPropertyForm.value = true;
};

const handleReadyToProceed = () => {
  showPropertyForm.value = false;
  hasSearched.value = false;
  showOwnerSearchForm.value = false;
  showSuccessMessage.value = true;

  emit('readyToProceed', true);
};
</script>
<style scoped></style>
