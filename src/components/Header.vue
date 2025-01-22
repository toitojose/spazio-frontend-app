<template>
  <header class="fixed z-10 flex h-12 w-full items-center justify-between bg-primary px-4 py-2 pl-24 text-white">
    <span class="hidden text-xs sm:block"> Acumula puntos pagando tu arriendo a tiempo </span>
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

<script setup lang="ts"></script>

<style scoped>
#info-roles a span {
  @apply hidden hover:underline sm:block;
}
</style>
