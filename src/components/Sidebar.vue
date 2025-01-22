<template>
  <div>
    <!-- Sidebar -->
    <Drawer
      v-model:visible="isVisible"
      position="left"
      :modal="false"
      :dismissable="false"
      :showCloseIcon="false"
      :class="isHovered ? 'hover' : 'normal'"
      @mouseover="onHover"
      @mouseleave="onLeave">
      <template #header>
        <i
          class="sp-spazio-iso text-2xl text-white"
          :class="{ 'opacity-full': !isHovered, '': isHovered }"></i>
        <i
          class="sp-spazio-logotipo text-2xl text-white"
          :class="{ 'opacity-full block': isHovered, 'opacity-none hidden': !isHovered }"></i>
      </template>

      <!-- Menú -->
      <nav class="sidebar-nav">
        <!-- Sección Inquilino -->
        <div>
          <h3 class="sidebar-nav-title">Inquilino</h3>
          <ul class="mt-2 space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-send"></i>
                <span>Quiero Arrendar</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-home"></i>
                <span>Mis arriendos</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 text-white">
                <i class="pi pi-briefcase"></i>
                <span>Oportunidades</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-dollar"></i>
                <span>Pagos</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-user"></i>
                <span>Información personal</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Sección Premios -->
        <div>
          <h3 class="sidebar-nav-title">Premios</h3>
          <ul class="mt-2 space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-shopping-bag"></i>
                <span>Catálogo</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-refresh"></i>
                <span>Canjear premios</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-clock"></i>
                <span>Historial de canjes</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-star"></i>
                <span>Mis spazios</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Sección Propietario -->
        <div>
          <h3 class="sidebar-nav-title">Propietario</h3>
          <ul class="mt-2 space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-send"></i>
                <span>Quiero arrendar</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-building"></i>
                <span>Mis propiedades</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-briefcase"></i>
                <span>Oportunidades</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-wallet"></i>
                <span>Mis ingresos</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Sección Asesor Inmobiliario -->
        <div>
          <h3 class="sidebar-nav-title">Asesor Inmobiliario</h3>
          <ul class="mt-2 space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-send"></i>
                <span>Propiedades</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-building"></i>
                <span>Prospectos</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100">
                <i class="pi pi-briefcase"></i>
                <span>Seguimiento contratos</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Drawer from 'primevue/drawer';

// Estado del Drawer
const isVisible = ref(true);

// Control de hover
const isHovered = ref(false);

const onHover = () => {
  isHovered.value = true;
};

const onLeave = () => {
  isHovered.value = false;
};
</script>

<style>
.p-drawer-left .p-drawer {
  @apply overflow-hidden border-none bg-white shadow-lg transition-all duration-500 ease-in-out;
}
.p-drawer-left .p-drawer .p-drawer-header {
  @apply flex h-12 bg-primary p-2 text-center;
}
/* Estado inicial */
.p-drawer-left .p-drawer .p-drawer-header .sp-spazio-iso {
  @apply transition-opacity transition-transform duration-300 ease-in-out;
  transform: translateX(0);
  opacity: 1;
}

/* Estado de hover */
.p-drawer-left .p-drawer:hover .p-drawer-header .sp-spazio-iso {
  transform: translateX(100px);
  opacity: 0;
}
.p-drawer-left .p-drawer.normal {
  @apply w-20;
}

.p-drawer-left .p-drawer.hover {
  @apply w-64;
}
.p-drawer-left .p-drawer .p-drawer-header .sp-spazio-logotipo {
  font-size: 1.5rem;
}
.p-drawer-left .p-drawer .p-drawer-header .sp-spazio-logotipo,
.p-drawer-left .p-drawer .p-drawer-header .sp-spazio-iso {
  @apply transition-opacity duration-300 ease-in-out;
}
.p-drawer-left .p-drawer .p-drawer-header .opacity-full {
  @apply visible opacity-100;
}
.p-drawer-left .p-drawer .p-drawer-header .opacity-none {
  @apply invisible opacity-0;
}
.p-drawer-left .p-drawer .p-drawer-content {
  overflow: hidden;
}

/* Navigation items */
.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav .sidebar-nav-title {
  @apply mt-4 text-sm font-bold uppercase text-gray-500;
}
.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav .sidebar-nav-title,
.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav li a span {
  @apply text-nowrap;
}
.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav .sidebar-nav-title,
.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav li a span {
  @apply transition-opacity duration-300 ease-in-out;
}

.p-drawer-left .p-drawer.normal .p-drawer-content .sidebar-nav .sidebar-nav-title,
.p-drawer-left .p-drawer.normal .p-drawer-content .sidebar-nav li a span {
  @apply opacity-0;
}

.p-drawer-left .p-drawer.hover .p-drawer-content .sidebar-nav .sidebar-nav-title,
.p-drawer-left .p-drawer.hover .p-drawer-content .sidebar-nav li a span {
  @apply opacity-100;
}
</style>
