<template>
  <ProcessLayout
    :current-step="currentStepToSteps"
    :show-navigation-buttons="navButtons"
    @prevStep="handlePreviousStep"
    @nextStep="handleNextStep">
    <div class="space-y-6">
      <div class="space-y-4">
        <!-- Título -->
        <h2 class="mb-2 text-center text-2xl font-semibold"> Valida tu información personal </h2>

        <!-- Bienvenida -->
        <p class="text-center text-gray-600">
          Queremos conocerte un poco más.
          <br />
          Ingresa tus datos personales para continuar con el proceso de arriendo.
        </p>
      </div>
      <div class="flex flex-col-reverse lg:flex-row lg:space-x-6">
        <GeneralForm
          form-type="renter"
          user-role="renter"
          action-type="update"
          :initial-data="user"
          @formUpdated="onFormSubmit" />

        <Message
          severity="info"
          class="mb-4 items-start lg:mb-0 lg:w-1/3">
          <h3 class="mb-4 text-sm font-semibold">¿Por qué solicitamos esta información?</h3>

          <ul class="ml-4 list-disc space-y-2 text-xs">
            <li>Esta información será utilizada para generar el contrato de arriendo de manera automática.</li>
            <li>Facilita el proceso legal y administrativo del arrendamiento.</li>
            <li>Garantiza que los datos estén completos y correctos para ambas partes.</li>
          </ul>
        </Message>
      </div>
    </div>
  </ProcessLayout>
</template>

<script setup lang="ts">
import ProcessLayout from '@/layout/renter/ProcessLayout.vue';
import { Message } from 'primevue';
import { computed, ref, watch } from 'vue';
import { useRenterProgressStore } from '@/store/renterProgressStore.ts';
import GeneralForm from '@/components/GeneralForm.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { prepareInitialFormData, prepareValidateData } from '@/utils/prepareValidateData.ts';
import { RolesEnum } from '@/enums/roles.enum.ts';
import { useUserStore } from '@/store/user.ts';
import { UserClient } from '@/api/UserClient.ts';
import { UserService } from '@/services/user-service.ts';
import { useToast } from 'primevue/usetoast';
import { RenterStatusEnum } from '@/enums/renter-status.enum.ts';

const route = useRoute();
const userStore = useUserStore();
const currentStepToSteps = computed(() => renterProgressStore.getVisibleStepIndex(route.path));
const currentStep = computed(() => renterProgressStore.getStepIndexByRoute(route.path));
const user = computed(() => prepareInitialFormData(userStore.user, RolesEnum.RENTER));
const userClient = new UserClient();
const userService = new UserService(userClient);
const navButtons = ref(true);
const nextRoute = ref<string | null>(null);
const toast = useToast();

const renterProgressStore = useRenterProgressStore();
const updateCompletedStep = () => {
  if (user.value.firstName && user.value.lastName) {
    const summary = `${user.value.firstName} ${user.value.lastName}`;
    renterProgressStore.updateStepSummary(currentStep.value, summary);
    renterProgressStore.markStepCompleted(currentStep.value, true);
  }
};

// Escuchar cambios en los valores del primer nombre y primer apellido
watch(() => [user.value.firstName, user.value.lastName], updateCompletedStep);

const onFormSubmit = async (data: any) => {
  try {
    const cleanedData = prepareValidateData(data);
    if (!cleanedData) {
      alert('Error al limpiar los datos.');
      return;
    }
    const response = await userService.updateUser(cleanedData);
    if (response.success && response.data) {
      // Actualizar el store
      userStore.setUser(cleanedData);
      console.log('=>(GeneralInformation.vue:92) currentStep', currentStep.value);
      renterProgressStore.markStepCompleted(currentStep.value, true);
      renterProgressStore.updateStepSummary(currentStep.value, `${cleanedData.firstName} ${cleanedData.lastName}`);
      navButtons.value = true;
      toast.add({
        severity: 'success',
        summary: response.message,
        detail: 'Tus datos han sido guardados correctamente.',
        life: 3000,
      });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error al actualizar tu información', detail: error, life: 3000 });
  }
};
const handlePreviousStep = () => {
  router.push('/renter/select-scenario');
};
const handleNextStep = () => {
  const scenario = renterProgressStore.selectedScenario;

  if (!scenario) {
    alert('Escenario no definido.');
    return;
  }

  let next = null;

  if (scenario === RenterStatusEnum.RENTING_WITH_CONTRACT) {
    next = '/renter/connect-owner';
  } else if (scenario === RenterStatusEnum.EXPLORING_OPTIONS) {
    next = '/renter/employment-information';
  }

  if (!next) {
    alert('Ruta de siguiente paso no definida.');
    return;
  }

  router.push(next);
};
</script>

<style scoped></style>
