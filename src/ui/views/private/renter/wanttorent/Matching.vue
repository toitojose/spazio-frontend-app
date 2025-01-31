<template>
  <RenterProcessLayout :current-step="1">
    <Message class="mb-4">
      Selecciona el escenario que mejor describe tu situación para poder guiarte en el proceso
    </Message>
    <div id="scenarios">
      <SelectButton
        v-model="selectedScenario"
        :options="scenarios"
        optionLabel="title"
        dataKey="title"
        aria-labelledby="scenario-selection">
        <template #option="slotProps">
          <i
            :class="slotProps.option.icon"
            style="font-size: 1.5rem"></i>
          <h4 class="text-sm font-semibold">{{ slotProps.option.title }}</h4>
          <p class="text-xs">{{ slotProps.option.detail }}</p>
        </template>
      </SelectButton>
    </div>
    <div
      id="scenario-content"
      class="mt-6">
      <div v-if="selectedScenario?.name === 'renting'">
        <h4 class="mb-2 text-lg font-bold">Estoy arrendando</h4>
        <p class="mb-4 text-sm"> Registra tu propiedad actual e invita a tu arrendador a unirse a SPAZIO. </p>
        <div class="content-inner">
          <SimplifiedPropertyForm @nextStep="handleNextStep" />
          <Message severity="info">
            <h3 class="mb-4 text-sm font-semibold">¿Por qué solicitamos esta información?</h3>

            <ul class="ml-4 list-disc space-y-2 text-xs">
              <li>Esta información será utilizada para generar el contrato de arriendo de manera automática.</li>
              <li>Facilita el proceso legal y administrativo del arrendamiento.</li>
              <li>Garantiza que los datos estén completos y correctos para ambas partes.</li>
            </ul>
          </Message>
        </div>
      </div>

      <div
        v-else-if="selectedScenario?.name === 'searching'"
        class="rounded-lg bg-gray-50 p-6 shadow-md">
        <h2 class="text-2xl font-semibold text-primary">🏡 Tu nuevo hogar está más cerca de lo que crees.</h2>
        <p class="mt-2 text-gray-700">
          Antes de comenzar a explorar opciones, necesitamos algunos datos sobre ti para encontrar la mejor oferta.
        </p>
        <p class="mt-2 text-gray-600">
          Completa tu información y accede a inmobiliarias, contactos y sitios donde podrías encontrar tu próximo
          espacio.
        </p>
        <p class="mt-4 font-medium text-gray-500">✨ ¡Es rápido y fácil! Solo toma unos minutos. ✨</p>
        <Button
          as="router-link"
          to="/renter/identity-verification"
          label="Verificar mi identidad"
          class="mt-4" />
      </div>

      <div v-else-if="selectedScenario?.name === 'agreement'">
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
          <button
            type="submit"
            class="rounded bg-primary px-4 py-2 text-white">
            Guardar
          </button>
        </form>
      </div>
    </div>
  </RenterProcessLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Message, SelectButton, Button } from 'primevue';
import RenterProcessLayout from '@/layout/renter/RenterProcessLayout.vue';
import SimplifiedPropertyForm from '@/components/property/SimplifiedPropertyForm.vue';
import router from '@/router';

const selectedScenario = ref<string | null>(null);
const scenarios = [
  {
    icon: 'pi pi-home',
    title: 'Estoy arrendando',
    detail: 'Registra tu propiedad actual e invita a tu arrendador',
    name: 'renting',
  },
  {
    icon: 'pi pi-home',
    title: 'Tengo un acuerdo con el propietario',
    detail: 'Registra los datos del bien inmueble para formalizar el proceso de arrendamiento',
    name: 'agreement',
  },
  {
    icon: 'pi pi-search',
    title: 'Estoy buscando un inmueble',
    detail: 'Explora opciones para encontrar tu próximo espacio',
    name: 'searching',
  },
];

// Modelo de datos del inmueble
const property = ref({
  city: '',
  address: '',
  type: null,
  rooms: null,
  bathrooms: null,
  socialBathrooms: null,
  additionalSpaces: [],
});

function handleNextStep() {
  router.push('/renter/connect-owner');
}
</script>
<style>
#scenarios .p-selectbutton {
  @apply grid grid-cols-2 gap-6 lg:grid-cols-3;
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
  @apply flex flex-col-reverse justify-start justify-items-stretch lg:flex-row lg:space-x-6;
}
#scenario-content .content-inner .p-message {
  @apply mb-4 lg:mb-0 lg:w-1/3;
}
</style>
