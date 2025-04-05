<template>
  <div id="process">
    <aside>
      <ul>
        <li
          v-for="(step, index) in steps"
          :key="index"
          :class="{ active: currentStep === index }">
          <router-link
            :to="canNavigate(index) ? step.route : ''"
            @click.prevent="!canNavigate(index) && $event.stopPropagation()">
            <div class="mx-1 flex md:mr-2 md:items-center">
              <span class="index">{{ index + 1 }}</span>
              <div class="text-content">
                <span class="step">{{ step.label }}</span>
              </div>
            </div>
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
import { ref, onMounted, onUnmounted } from 'vue';
import { Button } from 'primevue';

// Props
const props = defineProps<{ currentStep: number; showNavigationButtons?: boolean }>();

const isMobile = ref(false);

function updateIsMobile() {
  const width = window.visualViewport?.width || window.innerWidth;
  isMobile.value = width < 768;
}

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

// Pasos
const steps = [
  { label: 'Carrito de compras', route: '/cart/cart-first-step' },
  { label: 'Confirmación de dirección', route: '/cart/cart-second-step' },
  { label: 'Felicitación por canje', route: '/cart/cart-third-step' },
];

function canNavigate(index: number) {
  if (props.currentStep === 0 || props.currentStep === 1) {
    // Paso 1 => puede ver 1 o 2 y Paso 2 => puede ver 2 o 1
    return index <= 1;
  } else {
    // Paso 3 => solo el propio paso
    return index === 2;
  }
}
</script>

<style scoped>
@import '@/assets/css/cart-process-nav.css';
</style>
