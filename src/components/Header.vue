<template>
  <header class="flex h-12 items-center justify-between bg-primary px-4 py-2 text-white">
    <small> Acumula puntos pagando tu arriendo a tiempo </small>
    <!-- Navegación con Call to Action (inquilino, agente, propietario) -->
    <div class="relative hidden sm:flex">
      <nav
        id="info-roles"
        class="flex space-x-4">
        <a
          href="#"
          class="flex items-center space-x-1">
          <i class="spz-renter-icon"></i>
          <span class="text-sm">Inquilinos</span>
        </a>
        <a
          href="#"
          class="flex items-center space-x-1">
          <i class="spz-agent-icon"></i>
          <span class="text-sm">Agente Inmobiliario</span>
        </a>
        <a
          href="#"
          class="flex items-center space-x-1">
          <i class="spz-propertyowner-icon"></i>
          <span class="text-sm">Propietario</span>
        </a>
      </nav>
    </div>

    <!-- Navegación Comprimida (Tres puntos para mobile) -->
    <div class="relative sm:hidden">
      <button
        class="flex items-center justify-center text-lg focus:outline-none"
        @click="toggleDropdown">
        <i class="pi pi-ellipsis-h"></i>
      </button>
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 z-10 mt-2 rounded bg-gray-800 text-white shadow-lg">
        <nav class="flex flex-col">
          <a
            href="#"
            class="flex items-center px-4 py-2 hover:bg-gray-700">
            <i class="pi pi-home mr-2"></i> Inquilinos
          </a>
          <a
            href="#"
            class="flex items-center px-4 py-2 hover:bg-gray-700">
            <i class="pi pi-building mr-2"></i> Agente Inmobiliario
          </a>
          <a
            href="#"
            class="flex items-center px-4 py-2 hover:bg-gray-700">
            <i class="pi pi-user mr-2"></i> Propietario
          </a>
        </nav>
      </div>
    </div>

    <!-- Navegación de Iconos a la Derecha -->
    <nav class="flex items-center space-x-4">
      <a
        href="#"
        class="text-lg">
        <i class="pi pi-list"></i>
      </a>
      <a
        href="#"
        class="text-lg">
        <i class="pi pi-heart"></i>
      </a>
      <a
        href="#"
        class="text-lg">
        <i class="pi pi-user"></i>
      </a>
      <a
        href="#"
        class="text-lg">
        <i class="pi pi-shopping-cart"></i>
      </a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style scoped>
#info-roles a span {
  @apply hover:underline;
}
</style>
