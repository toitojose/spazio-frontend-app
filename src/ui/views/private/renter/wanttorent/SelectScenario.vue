<template>
  <ProcessLayout
    :current-step="currentStep"
    :show-navigation-buttons="navButtons"
    @prevStep="handlePreviousStep"
    @nextStep="handleNextStep">
    <div class="spacconst currentStep = 1;e-y-6">
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
      <Message
        v-if="renterProgressStore.isStepCompleted(currentStep)"
        severity="success"
        class="mb-4">
        Ya completaste este paso. Puedes continuar al siguiente.
      </Message>

      <RentingWithContract
        v-if="
          selectedScenario?.name === RenterStatusEnum.RENTING_WITH_CONTRACT &&
          !renterProgressStore.isStepCompleted(currentStep)
        "
        @readyToProceed="handleReadyToProceed" />

      <div v-else-if="selectedScenario?.name === RenterStatusEnum.EXPLORING_OPTIONS">
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
import { computed, onMounted, ref } from 'vue';
import { Message, SelectButton } from 'primevue';
import ProcessLayout from '@/layout/renter/ProcessLayout.vue';
import router from '@/router';
import { useRenterProgressStore } from '@/store/renterProgressStore.ts';
import { RenterStatusService } from '@/services/renter-status-service.ts';
import { RenterStatusEnum } from '@/enums/renter-status.enum';
import RentingWithContract from '@/components/renterScenarios/RentingWithContract.vue';
import type { UpdateRenterStatusResult } from '@/interfaces/renter/Renter.interface.ts';
import { useToast } from 'primevue/usetoast';
import { RenterClient } from '@/api/RenterClient.ts';
import { useRoute } from 'vue-router';

interface Scenario {
  icon: string;
  title: string;
  detail: string;
  name: RenterStatusEnum;
  onSelected: string;
}
const renterClient = new RenterClient();
const renterStatusService = new RenterStatusService(renterClient);
const route = useRoute();
const currentStep = computed(() => renterProgressStore.getVisibleStepIndex(route.path));
const selectedScenario = ref<Scenario | null>(null);
const navButtons = ref(false);
const nextRoute = ref<string | null>(null);
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
const toast = useToast();

onMounted(() => {
  const storedScenario = renterProgressStore.selectedScenario;

  if (storedScenario) {
    selectedScenario.value = scenarios.find((s) => s.name === storedScenario) || null;

    if (renterProgressStore.isStepCompleted(currentStep)) {
      // Ya completó este paso, así que activamos el flujo correspondiente
      if (storedScenario === RenterStatusEnum.EXPLORING_OPTIONS) {
        nextRoute.value = '/renter/identity-verification';
        navButtons.value = true;
      } else if (storedScenario === RenterStatusEnum.RENTING_WITH_CONTRACT) {
        nextRoute.value = '/renter/general-information';
        navButtons.value = true;
      }
    }
  }
});
const handleNextStep = () => {
  if (!nextRoute.value) {
    alert('Ruta de siguiente paso no definida.');
    return;
  }

  router.push(nextRoute.value);
};

const handlePreviousStep = () => {
  router.push('/renter/want-to-rent');
};
const handleScenarioSelection = async (scenario: Scenario) => {
  if (!scenario) return;
  if (renterProgressStore.selectedScenario === scenario.name) return;

  try {
    const response = await renterStatusService.updateRenterStatus(scenario.name);
    if (response.success && response.data) {
      renterProgressStore.setScenario(scenario.name);
      renterProgressStore.updateStepSummary(currentStep.value, scenario.name);
      selectedScenario.value = scenario;

      if (scenario.name === RenterStatusEnum.EXPLORING_OPTIONS) {
        renterProgressStore.markStepCompleted(currentStep.value, true);
        restoreIfAlreadyCompleted();
      } else if (scenario.name === RenterStatusEnum.RENTING_WITH_CONTRACT) {
        navButtons.value = false;
      } else {
        navButtons.value = false;
      }
    } else {
      navButtons.value = false;
      nextRoute.value = null;
    }
  } catch (error: any) {
    const result: UpdateRenterStatusResult = error.response?.data || {
      success: false,
      message: 'Error desconocido',
      error: error.message,
    };

    toast.add({
      severity: 'error',
      summary: result.message,
      detail: result.error,
      life: 3000,
    });
  }
};
const handleReadyToProceed = () => {
  renterProgressStore.markStepCompleted(currentStep.value, true);
  restoreIfAlreadyCompleted();
};
const restoreIfAlreadyCompleted = () => {
  if (!selectedScenario.value) return;

  const scenarioName = selectedScenario.value.name;

  if (renterProgressStore.isStepCompleted(currentStep.value)) {
    nextRoute.value =
      scenarioName === RenterStatusEnum.EXPLORING_OPTIONS
        ? '/renter/identity-verification'
        : '/renter/general-information';
    navButtons.value = true;
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
