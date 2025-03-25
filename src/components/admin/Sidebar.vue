<template>
  <Drawer
    v-model:visible="drawerVisible"
    position="left"
    :modal="isMobile"
    :dismissable="isMobile"
    :showCloseIcon="isMobile"
    :class="isMobile || isHovered ? 'hover' : 'normal'"
    @hide="closeSidebar"
    @mouseover="onHover"
    @mouseleave="onLeave">
    <template #header>
      <i
        class="sp-spazio-iso hidden text-2xl text-white lg:block"
        :class="{
          'opacity-full': !isHovered,
          'const isMobile = computed(() => window.innerWidth < 768);': isHovered,
        }"></i>
      <i
        class="sp-spazio-logotipo text-2xl text-white"
        :class="{ 'opacity-full block': isHovered || isMobile, 'opacity-none hidden': !isHovered && !isMobile }"></i>
    </template>

    <nav class="sidebar-nav">
      <ul class="mt-2 space-y-2">
        <li>
          <a
            href="/"
            class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100"
            :class="{ active: isActive('/') }">
            <i class="pi pi-home"></i>
            <span>Pagina principal</span>
          </a>
        </li>
      </ul>
      <div v-if="Object.keys(menuItems).length > 0">
        <div
          v-for="(group, roleName) in menuItems"
          :key="roleName"
          class="group">
          <h3 class="sidebar-nav-title">
            {{ roleName }}
          </h3>
          <ul class="mt-2 space-y-2">
            <li
              v-for="item in group"
              :key="item.path">
              <a
                :href="item.path"
                class="flex items-center space-x-3 rounded px-3 py-2 hover:bg-gray-100"
                :class="{ active: isActive(item.path) }">
                <i :class="item.meta?.icon || 'pi pi-question'"></i>
                <span>{{ item.title }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </Drawer>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Drawer from 'primevue/drawer';
import { useRoute } from 'vue-router';

const props = defineProps<{
  menuItems: Record<string, any>;
  isVisible: boolean;
}>();
const emit = defineEmits(['update:isVisible']);

// Estado del Drawer
const isMobile = ref(false);
const isHovered = ref(false);

const updateIsMobile = () => {
  const width = window.visualViewport?.width || window.innerWidth;
  isMobile.value = width < 768;
};

const onHover = () => {
  if (!isMobile.value) {
    isHovered.value = true;
  }
};
const onLeave = () => {
  if (!isMobile.value) {
    isHovered.value = false;
  }
};

const drawerVisible = computed({
  get: () => {
    return props.isVisible;
  },
  set: (value) => {
    emit('update:isVisible', value);
  },
});
const closeSidebar = () => {
  drawerVisible.value = false;
};

const route = useRoute();
const isActive = (path: string) => route.path === path;

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});
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
.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav * {
  @apply transition-all duration-300 ease-in-out;
}
.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav .sidebar-nav-title {
  @apply mt-4 text-sm font-bold uppercase text-gray-500;
}

.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav .sidebar-nav-title,
.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav li a {
  @apply text-primary;
}
.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav li a:hover,
.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav li a:focus {
  background: linear-gradient(to right, var(--accent-color-100) 0%, var(--light-surface-100) 100%);
}

.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav li a.active {
  @apply bg-gradient-to-r from-accent to-secondary text-white;
}
.p-drawer-left .p-drawer .p-drawer-content .sidebar-nav li a span {
  @apply text-nowrap text-sm;
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
