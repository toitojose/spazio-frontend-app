<template>
  <ProcessLayout
    :current-step="currentStep"
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
          @submit="onFormSubmit" />

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
import { ref, watch } from 'vue';
import { useRenterProgressStore } from '@/store/renterProgressStore.ts';
import GeneralForm from '@/components/GeneralForm.vue';
import router from '@/router';
const currentStep = 3;
const user = ref({
  photoSrc: null,
  dni: '',
  firstName: '',
  secondName: '',
  firstLastName: '',
  secondLastName: '',
  phone: '',
  landline: '',
  email: '',
});
const navButtons = ref(true);
const nextRoute = ref<string | null>(null);

const renterProgressStore = useRenterProgressStore();
const updateCompletedStep = () => {
  if (user.value.firstName && user.value.firstLastName) {
    const summary = `${user.value.firstName} ${user.value.firstLastName}`;
    renterProgressStore.markStepCompleted(currentStep, true, summary);
  }
};

// Escuchar cambios en los valores del primer nombre y primer apellido
watch(() => [user.value.firstName, user.value.firstLastName], updateCompletedStep);

const onFormSubmit = (data: any): void => {
  console.log('Formulario enviado:', data);
};
const handlePreviousStep = () => {
  router.push('/renter/select-scenario');
};
const handleNextStep = () => {
  if (!nextRoute.value) {
    alert('Ruta de siguiente paso no definida.');
    return;
  }
  // TODO: necesito obtener de pinia que escenario selecciono,
  //  si selecciono 'ya esta arrendando' entonces deberiamos pasar directo al step de conexion con el propietario 'renter/connect-owner'
  //  si selecciono 'estoy buscando' entonces deberiamos pasar al step de informacion laboral 'renter/employment-information'

  router.push(nextRoute.value);
};
</script>

<style scoped></style>
