<template>
  <div id="process">
    <aside>
      <ul>
        <li
          v-for="(step, index) in steps"
          :key="index"
          :class="{
            active: currentStep === index,
            completed: isStepCompleted(index),
          }">
          <router-link :to="step.route">
            <div class="mx-1 flex md:mr-2 md:items-center">
              <span class="index">{{ index + 1 }}</span>

              <div class="text-content">
                <span class="step">
                  {{ step.label }}
                </span>
                <span
                  v-if="getStepSummary(index)"
                  class="summary">
                  {{ getStepSummary(index) }}
                </span>
              </div>
            </div>
            <i
              v-if="currentStep === index"
              :class="['pi', 'angle', piAngle]"
              style="font-size: 1.4rem" />
          </router-link>
        </li>
      </ul>
    </aside>

    <section class="process-content">
      <slot></slot>
      <div
        v-if="currentStep !== 0 && showNavigationButtons"
        class="mt-6 flex justify-between">
        <Button
          size="small"
          icon="pi pi-arrow-left"
          icon-pos="left"
          variant="outlined"
          @click="$emit('prevStep')" />
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
import { useCartProgressStore } from '@/store/cartProgressStore.ts';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Button } from 'primevue';

// Props
defineProps<{ currentStep: number; showNavigationButtons?: boolean }>();

const isMobile = ref(false);
const piAngle = computed(() => 'pi-angle-down');

const updateIsMobile = () => {
  const width = window.visualViewport?.width || window.innerWidth;
  isMobile.value = width < 768;
};
onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

// Store
const cartProgressStore = useCartProgressStore();

const steps = [
  { label: 'Carrito de compras', route: '/cart/cart-first-step' },
  { label: 'Confirmación de dirección', route: '/cart/cart-second-step' },
  { label: 'Felicitación por canje', route: '/cart/cart-third-step' },
];

const getStepSummary = (index: number) => computed(() => cartProgressStore.getStepSummary(index)).value;
const isStepCompleted = (index: number) => !!getStepSummary(index);
</script>

<style scoped>
@import '@/assets/css/cart-process-nav.css';
</style>
