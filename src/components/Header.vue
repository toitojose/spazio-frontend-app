<template>
  <header
    class="fixed top-0 z-50 flex h-12 w-full items-center justify-between bg-primary px-4 py-2 text-white lg:pl-24">
    <span
      v-if="!showSidebarButton"
      class="hidden text-xs sm:block">
      Acumula puntos pagando tu arriendo a tiempo
    </span>
    <button
      v-else
      class="text-white"
      @click="showSidebar">
      <i class="sp-spazio-iso"></i>
    </button>
    <div class="relative">
      <nav
        id="info-roles"
        class="flex space-x-4">
        <a
          href="/renter"
          class="flex items-center space-x-1"
          title="Ver información para inquilinos">
          <i class="spz-renter-icon"></i>
          <span class="text-sm">Inquilinos</span>
        </a>
        <a
          href="/agent"
          class="flex items-center space-x-1"
          title="Ver información para asesores inmobiliarios">
          <i class="spz-agent-icon"></i>
          <span class="text-sm">Agente Inmobiliario</span>
        </a>
        <a
          href="/property-owner"
          class="flex items-center space-x-1"
          title="Ver información para propietarios">
          <i class="spz-propertyowner-icon"></i>
          <span class="text-sm">Propietario</span>
        </a>
      </nav>
    </div>
    <slot></slot>
  </header>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue';

const showSidebar = inject('showSidebar') as () => void;

const showSidebarButton = ref(window.innerWidth < 768);

const updateButtonVisibility = () => {
  showSidebarButton.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', updateButtonVisibility);
  updateButtonVisibility();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateButtonVisibility);
});
</script>

<style scoped>
#info-roles a span {
  @apply hidden hover:underline sm:block;
}
</style>
