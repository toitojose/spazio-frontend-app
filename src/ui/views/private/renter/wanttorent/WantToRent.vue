<template>
  <ProcessLayout
    :current-step="currentStep"
    :show-navigation-buttons="false">
    <div class="flex min-h-full flex-col justify-evenly space-y-8">
      <div>
        <!-- Título -->
        <h2 class="mb-2 text-center text-2xl font-semibold"> Comienza tu proceso de arriendo fácil y seguro. </h2>

        <!-- Bienvenida -->
        <p class="text-center text-gray-600">
          Este proceso nos ayuda a garantizar la confianza entre inquilinos y propietarios. <br />
          Llena los campos solicitados en este proceso para arrendar. Es muy rápido y seguro.
        </p>
      </div>
      <!-- Beneficios -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          class="flex cursor-pointer items-start space-x-4 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-lg"
          @click="redirectToVerification">
          <div class="icon flex items-center justify-center text-secondary">
            <i
              class="pi pi-arrow-right"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-md mb-1 font-bold">Clic aqui para iniciar tu proceso de arrendamiento</h3>
            <p class="text-xs">Da clic aquí para comenzar definiendo tu estado actual.</p>
          </div>
        </div>
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="flex items-start space-x-4 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-lg">
          <div class="icon flex items-center justify-center text-secondary">
            <i
              class="pi"
              :class="benefit.icon"
              style="font-size: 1.5rem"></i>
          </div>
          <div>
            <h3 class="text-md mb-1 font-bold">{{ benefit.title }}</h3>
            <p class="text-xs">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </ProcessLayout>
</template>

<script setup lang="ts">
import ProcessLayout from '@/layout/renter/ProcessLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { useRenterProgressStore } from '@/store/renterProgressStore.ts';
import { useUserStore } from '@/store/user.ts';
import { computed, inject, ref } from 'vue';

const benefits = [
  {
    icon: 'pi-lock',
    title: 'Privacidad Garantizada',
    description: 'Tu información estará segura y solo accesible para propietarios aprobados por ti.',
  },
  {
    icon: 'pi-clock',
    title: 'Ahorra Tiempo',
    description: 'Llena una sola vez los documentos y postúlate a varias propiedades sin repetir el proceso.',
  },
  {
    icon: 'pi-camera',
    title: 'Valida tu Identidad',
    description: 'Spazio garantiza que eres una persona real, generando confianza entre los propietarios.',
  },
  {
    icon: 'pi-star',
    title: 'Construye tu Reputación',
    description: 'Tu historial de arriendos mejora tu reputación, lo que te da ventajas frente a propietarios.',
  },
  {
    icon: 'pi-check-circle',
    title: 'Proceso Simplificado',
    description: 'Tu información estará lista para futuros arrendamientos, simplificando el proceso.',
  },
];
const route = useRoute();
const currentStep = computed(() => renterProgressStore.getStepIndexByRoute(route.path));
const isWaitingForAuth = ref(false);
const openAuthDialog = inject<(formType: 'login') => void>('openAuthDialog') || null;

const renterProgressStore = useRenterProgressStore();
const userStore = useUserStore();
const userId = computed(() => userStore.userId || null);
const router = useRouter();

const checkedProcess = () => {
  renterProgressStore.markStepCompleted(currentStep, true);
  renterProgressStore.updateStepSummary(currentStep, 'Introducción completada');
  router.push('/renter/select-scenario');
};
const redirectToVerification = () => {
  if (userId.value) {
    checkedProcess();
  } else {
    isWaitingForAuth.value = true;
    openAuthDialog?.('login');
  }
};
</script>

<style></style>
