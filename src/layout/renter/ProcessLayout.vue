<template>
  <div id="process">
    <aside>
      <ul>
        <li
          v-for="(step, i) in visibleSteps"
          :key="i"
          :class="{
            active: currentStep === i,
            completed: step.isCompleted,
          }">
          <router-link :to="step.route">
            <div class="mx-1 flex md:mr-2 md:items-center">
              <span class="index">{{ i + 1 }}</span>
              <div class="text-content">
                <span class="step">{{ step.label }}</span>
                <span
                  v-if="step.summary"
                  class="summary">
                  {{ i === 1 ? t('renter.scenarios.' + step.summary) : step.summary }}
                </span>
              </div>
            </div>
            <i
              v-if="currentStep === i"
              :class="['pi', 'angle', piAngle]"
              style="font-size: 1.4rem"></i>
          </router-link>
        </li>
      </ul>
    </aside>

    <section class="process-content">
      <slot></slot>
      <div
        v-if="currentStep !== 0 && showNavigationButtons && isStepCompleted(currentStep)"
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
import { useRenterProgressStore } from '@/store/renterProgressStore.ts';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Button } from 'primevue';
import { useI18n } from 'vue-i18n';

// Props
defineProps<{ currentStep: number; showNavigationButtons: boolean }>();
const { t } = useI18n();

const isMobile = ref(false);
const piAngle = computed(() => (isMobile.value ? 'pi-angle-down' : 'pi-angle-right'));

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

// Store de progreso
const renterProgressStore = useRenterProgressStore();

// Información estática de los pasos
const visibleSteps = computed(() => renterProgressStore.getVisibleSteps);

const getStepSummary = (index: number) => computed(() => renterProgressStore.getStepSummary(index)).value;
const isStepCompleted = (index: number): boolean => !!getStepSummary(index);
</script>

<style scoped>
@import '@/assets/css/process-nav.css';
</style>
