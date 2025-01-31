<template>
  <div class="min-h-screen pt-12 lg:flex">
    <aside class="border-b bg-gray-50 p-4 lg:w-1/4 lg:border-r lg:p-8">
      <ul class="flex justify-center text-xs md:flex-col">
        <li
          v-for="(step, index) in steps"
          :key="index"
          class="flex lg:block">
          <div class="flex flex-col lg:flex-row lg:space-x-2">
            <router-link
              :to="step.route"
              class="flex flex-col text-left lg:flex-row lg:space-x-2"
              :class="{
                'font-bold text-accent': currentStep === index,
                'text-gray-500': currentStep !== index,
              }">
              <i
                :class="[
                  'pi',
                  currentStep === index ? 'pi-circle-fill text-accent' : 'pi-circle text-gray-500',
                  'text-xl',
                ]"></i>
              <span
                :class="{
                  'font-bold text-accent': currentStep === index,
                  'hidden lg:block': currentStep !== index,
                }">
                {{ step.label }}
              </span>
            </router-link>
          </div>
          <div
            v-if="index < steps.length - 1"
            class="mt-2 h-[1px] w-6 lg:ml-2 lg:mt-0 lg:h-6 lg:w-[1px]"
            :class="{
              'bg-green-500': isStepCompleted(index + 1),
              'bg-gray-300': !isStepCompleted(index + 1),
            }"></div>
        </li>
      </ul>
    </aside>

    <!-- Contenido principal -->
    <section class="process p-8 lg:w-3/4">
      <slot></slot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRenterProgressStore } from '@/store/renterProgressStore.ts';

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

// Verificar si un paso está completado
const isStepCompleted = (index: number): boolean => {
  return renterProgressStore.completedSteps.includes(index);
};
</script>

<style scoped>
.process .p-steppanel {
  @apply bg-transparent;
}

.process .p-inputtext {
  @apply border-primary-200 text-primary;
}

.process .p-inputtext::placeholder {
  color: var(--primary-color-200);
}

.process .p-inputtext,
.process .p-inputnumber,
.process .p-select {
  @apply w-full;
}
</style>
