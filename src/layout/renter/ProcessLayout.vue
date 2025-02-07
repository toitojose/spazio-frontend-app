<template>
  <div id="process">
    <aside>
      <ul>
        <li
          v-for="(step, index) in steps"
          :key="index"
          class=""
          :class="{
            active: currentStep === index,
            completed: isStepCompleted(index),
          }">
          <router-link :to="step.route">
            <span class="index">{{ index + 1 }}</span>
            <span class="step">
              {{ step.label }}
            </span>
            <span
              v-show="stepSummaries[index]"
              class="summary">
              {{ stepSummaries[index] }}
            </span>
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- Contenido principal -->
    <section class="process-content">
      <slot></slot>
      <div
        v-if="currentStep !== 0"
        class="mt-6 flex justify-between">
        <Button
          size="small"
          icon="pi pi-arrow-left"
          icon-pos="left"
          variant="outlined"
          @click="$emit('nextStep')" />
        <Button
          size="small"
          icon="pi pi-arrow-right"
          icon-pos="right"
          label="Siguiente"
          @click="$emit('nextStep')" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRenterProgressStore } from '@/store/renterProgressStore.ts';
import { computed } from 'vue';
import { Button } from 'primevue';

// Props
defineProps<{ currentStep: number }>();

// Store de progreso
const renterProgressStore = useRenterProgressStore();

// Información estática de los pasos
const steps = [
  { label: 'Empieza aquí', route: '/renter/want-to-rent' },
  { label: 'Estado actual', route: '/renter/matching' },
  { label: 'Verificación de identidad', route: '/renter/identity-verification' },
  { label: 'Información general', route: '/renter/general-information' },
  { label: 'Informacion laboral', route: '/renter/employment-information' },
  { label: 'Conexión con el Propietario', route: '/renter/connect-owner' },
];

const stepSummaries = computed(() => renterProgressStore.stepSummaries);
const isStepCompleted = (index: number): boolean => {
  return renterProgressStore.completedSteps.includes(index);
};
</script>

<style scoped>
@import '@/assets/css/process-nav.css';
</style>
