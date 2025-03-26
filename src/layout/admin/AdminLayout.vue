<template>
  <div class="relative">
    <Sidebar
      :menu-items="groupedMenuItems"
      :is-visible="isSidebarVisible"
      @update:isVisible="handleSidebarVisibility" />
    <header
      class="fixed top-0 z-50 flex h-12 w-full items-center justify-between bg-primary px-4 py-2 text-white lg:pl-24">
      <div class="ml-auto"> Bienvenido, {{ adminName }}! </div>
    </header>
    <main
      id="main"
      class="wrapper min-h-screen bg-gray-100 lg:ml-20">
      <div class="min-h-16 px-8 pb-6 pt-20">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, onMounted, onUnmounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import { useUserStore } from '@/store/user.ts';
import { createRoleRouteMap, getMenuItemsByRoles } from '@/router/private/menu-items.ts';
import { useI18n } from 'vue-i18n';
import type { RolesEnum } from '@/enums/roles.enum.ts';

const logo = ref('sp-spazio-iso');
const { t } = useI18n();

const updateClass = () => {
  if (window.innerWidth >= 1024) {
    logo.value = 'sp-spazio-logotipo';
  } else {
    logo.value = 'sp-spazio-iso';
  }
};

const isSidebarVisible = ref(window.innerWidth >= 768);
const showSidebar = () => {
  isSidebarVisible.value = true;
};
provide('showSidebar', showSidebar);
const updateSidebarVisibility = () => {
  isSidebarVisible.value = window.innerWidth >= 768;
};
const handleSidebarVisibility = (value: boolean) => {
  console.log('Evento update:isVisible recibido con valor:', value);
  isSidebarVisible.value = value;
};

onMounted(() => {
  updateClass();
  updateSidebarVisibility();
  window.addEventListener('resize', updateClass);
  window.addEventListener('resize', updateSidebarVisibility);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateClass);
  window.removeEventListener('resize', updateSidebarVisibility);
});

const userStore = useUserStore();
const adminName = userStore.userName;

const menuItems = computed(() => getMenuItemsByRoles(userStore.userRoles, t));
const groupedMenuItems = computed(() => {
  const roleRouteMap = createRoleRouteMap(t);

  if (!menuItems.value || !Array.isArray(menuItems.value)) {
    return {};
  }

  return Object.keys(roleRouteMap).reduce(
    (acc, role) => {
      const roleKey = role as RolesEnum;
      const roleRoutes = menuItems.value.filter((route) =>
        roleRouteMap[roleKey]?.routes.some((r) => r.path === route.path),
      );

      if (roleRoutes.length) {
        acc[roleRouteMap[roleKey].name] = roleRoutes;
      }

      return acc;
    },
    {} as Record<string, typeof menuItems.value>,
  );
});
</script>

<style scoped>
.wrapper {
  flex: 1;
}
</style>
<style>
@import '@/assets/css/generic.css';
</style>
