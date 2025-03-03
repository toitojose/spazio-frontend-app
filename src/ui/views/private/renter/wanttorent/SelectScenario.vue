<template>
  <ProcessLayout
    :current-step="currentStep"
    :show-navigation-buttons="false"
    @prevStep="handlePreviousStep"
    @nextStep="handleNextStep">
    <div class="space-y-6">
      <div class="space-y-4">
        <!-- Título -->
        <h2 class="mb-2 text-center text-2xl font-semibold"> Encuentra tu espacio ideal en pocos pasos </h2>

        <!-- Bienvenida -->
        <p class="text-center text-gray-600">
          Elige la opción que mejor se adapte a tu situación y completa el proceso en minutos.
          <br />
          Spazio te acompaña en cada paso para hacer tu experiencia de arriendo más fácil, segura y confiable.
        </p>
        <Message class="mb-4">
          Selecciona el escenario que mejor describe tu situación para poder guiarte en el proceso
        </Message>
      </div>
      <div id="scenarios">
        <SelectButton
          v-model="selectedScenario"
          :options="scenarios"
          optionLabel="title"
          dataKey="title"
          aria-labelledby="scenario-selection"
          @update:modelValue="handleScenarioSelection">
          <template #option="slotProps">
            <i
              :class="slotProps.option.icon"
              style="font-size: 1.5rem"></i>
            <h4 class="text-sm font-semibold">{{ slotProps.option.title }}</h4>
            <p class="text-xs">{{ slotProps.option.detail }}</p>
          </template>
        </SelectButton>
      </div>
    </div>
    <div
      v-if="selectedScenario && selectedScenario.name"
      id="scenario-content"
      class="mt-6">
      <RentingWithContract v-if="selectedScenario?.name === RenterStatusEnum.RENTING_WITH_CONTRACT" />

      <div v-else-if="selectedScenario?.name === RenterStatusEnum.AGREEMENT_PENDING_CONTRACT">
        <h4 class="mb-2 text-lg font-bold">Tengo un acuerdo</h4>
        <p class="mb-4 text-sm"> Registra los datos del propietario para formalizar el proceso de arrendamiento. </p>
        <form>
          <!-- Formulario ejemplo -->
          <div class="mb-4">
            <label class="block text-sm font-medium">Nombre del propietario</label>
            <input
              type="text"
              class="w-full rounded border p-2"
              placeholder="Ingrese el nombre del propietario" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">Teléfono del propietario</label>
            <input
              type="tel"
              class="w-full rounded border p-2"
              placeholder="Ingrese el teléfono" />
          </div>
        </form>
      </div>

      <div
        v-else-if="selectedScenario?.name === RenterStatusEnum.EXPLORING_OPTIONS"
        class="r">
        <h2 class="text-2xl font-semibold text-primary">Tu nuevo hogar está más cerca de lo que crees.</h2>
        <p class="mt-2 text-gray-700">
          Antes de comenzar a explorar opciones, necesitamos algunos datos sobre ti para encontrar la mejor oferta.
        </p>
        <p class="mt-2 text-gray-600">
          Completa tu información y accede a inmobiliarias, contactos y sitios donde podrías encontrar tu próximo
          espacio.
        </p>
        <p class="mt-4 font-medium text-gray-500">¡Es rápido y fácil! Solo toma unos minutos.</p>
      </div>
    </div>
  </ProcessLayout>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Message, SelectButton } from 'primevue';
import ProcessLayout from '@/layout/renter/ProcessLayout.vue';
import router from '@/router';
import { useRenterProgressStore } from '@/store/renterProgressStore.ts';
import { RenterStatusService } from '@/services/renter-status-service.ts';
import { backendClient } from '@/api/backend-client.ts';
import { RenterStatusEnum } from '@/enums/renter-status.enum';
import RentingWithContract from '@/components/renterScenarios/RentingWithContract.vue';

interface Scenario {
  icon: string;
  title: string;
  detail: string;
  name: string;
  onSelected: string;
}

const renterStatusService = new RenterStatusService(backendClient);
const currentStep = 1;
const selectedScenario = ref<Scenario | null>(null);
const scenarios = [
  {
    icon: 'pi pi-home',
    title: 'Estoy arrendando o tengo un pre-acuerdo',
    detail: 'Gestiona tu contrato o avanza con el proceso de arriendo',
    name: RenterStatusEnum.RENTING_WITH_CONTRACT,
    onSelected: 'ya estoy arrendando',
  },
  {
    icon: 'pi pi-search',
    title: 'Estoy buscando un inmueble',
    detail: 'Explora opciones para encontrar tu próximo espacio',
    name: RenterStatusEnum.EXPLORING_OPTIONS,
    onSelected: 'Estoy buscando',
  },
];
const renterProgressStore = useRenterProgressStore();

onMounted(() => {
  // Obtener el último estado del usuario y preseleccionarlo sin escribir en Pinia
  const storedScenario = renterProgressStore.selectedScenario;

  if (storedScenario) {
    selectedScenario.value = scenarios.find((s) => s.name === storedScenario) || null;
  }
});

const validateFieldsBeforeNextStep = () => {
  // Marcar el paso como completado si los campos son válidos
  renterProgressStore.markStepCompleted(currentStep, true);
  return false;
};

const handleNextStep = () => {
  if (!validateFieldsBeforeNextStep()) {
    alert('Por favor completa todos los campos requeridos antes de continuar.');
    return;
  }
  if (!renterProgressStore.isStepCompleted(currentStep)) {
    alert('Por favor selecciona una opción');
    return;
  }

  router.push('/renter/identity-verification');
};

const handlePreviousStep = () => {
  router.push('/renter/want-to-rent');
};

const handleScenarioSelection = async (scenario: Scenario) => {
  if (!scenario) return;
  if (renterProgressStore.selectedScenario === scenario.name) return;

  try {
    const response = await renterStatusService.updateRenterStatus(scenario.name as RenterStatusEnum);
    if (response.result && response.data) {
      renterProgressStore.setScenario(scenario.name, scenario.onSelected);
      renterProgressStore.updateStepSummary(currentStep, scenario.name);
    }
  } catch (error) {
    alert('No se pudo actualizar tu estado en este momento. Por favor, intenta más tarde.');
  }
};
</script>
<style>
#scenarios .p-selectbutton {
  @apply grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6;
}

#scenarios .p-togglebutton {
  @apply items-stretch border-none bg-transparent p-0 py-2;
}
#scenarios .p-togglebutton .p-togglebutton-content {
  @apply bg-white;
}
#scenarios .p-togglebutton-content {
  @apply flex w-full cursor-pointer flex-col items-center justify-center space-y-1 rounded-lg border p-3 text-center shadow-sm transition-all hover:shadow-md;
}
#scenarios .p-togglebutton-content i.pi {
  @apply text-accent;
}
#scenarios .p-togglebutton-content h4,
#scenarios .p-togglebutton-content p {
  @apply text-primary;
}

#scenarios .p-togglebutton-content:hover,
#scenarios .p-togglebutton-content:focus {
  background-color: var(--accent-color-50);
}
#scenarios .p-togglebutton.p-togglebutton-checked .p-togglebutton-content {
  @apply bg-highlight-default;
}
#scenarios .p-togglebutton.p-togglebutton-checked i.pi,
#scenarios .p-togglebutton.p-togglebutton-checked h4,
#scenarios .p-togglebutton.p-togglebutton-checked p {
  @apply text-white;
}

#scenarios .p-togglebutton.p-togglebutton-checked::before {
  @apply bg-transparent shadow-none;
}
#scenario-content .content-inner {
  @apply flex flex-col-reverse justify-start justify-items-stretch md:flex-row md:space-x-6;
}
#scenario-content .content-inner .p-message {
  @apply mb-4 md:mb-0 md:w-1/3;
}
</style>
