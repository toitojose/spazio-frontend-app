<template>
  <RenterProcessLayout :current-step="5">
    <component :is="currentScenarioComponent" />
    <!-- Acciones posteriores -->
    <div class="flex flex-col space-y-3">
      <Button
        label="Revisar estado de mi solicitud"
        icon="pi pi-list"
        class="p-button-primary" />
      <Button
        as="router-link"
        to="/"
        label="Explorar los premios que tenemos preparados para ti"
        icon="pi pi-gift"
        class="p-button-secondary" />
    </div>
  </RenterProcessLayout>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { Button } from 'primevue';
import RenterProcessLayout from '@/layout/renter/RenterProcessLayout.vue';

// Importación dinámica de los componentes de escenarios
const searching = defineAsyncComponent(() => import('@/components/connectOwner/Searching.vue'));
const renting = defineAsyncComponent(() => import('@/components/connectOwner/Renting.vue'));
const agreement = defineAsyncComponent(() => import('@/components/connectOwner/Agreement.vue'));

// Escenario del inquilino (debe venir del estado global o de la ruta)
const scenario = ref(3);

// Selección dinámica del componente según el escenario
const currentScenarioComponent = computed(() => {
  switch (scenario.value) {
    case 1:
      return searching;
    case 2:
      return renting;
    case 3:
      return agreement;
    default:
      return null;
  }
});
</script>
