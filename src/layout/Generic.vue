<template>
  <div class="relative">
    <Sidebar
      :menu-items="groupedMenuItems"
      :is-visible="isSidebarVisible"
      @update:isVisible="handleSidebarVisibility" />
    <Header>
      <nav class="flex items-center space-x-0">
        <div
          v-for="item in secondaryItems"
          :key="item.label"
          class="relative">
          <Button
            type="button"
            :icon="item.icon"
            severity="help"
            text
            rounded
            :title="item.label"
            @click="item.items ? toggleMenu(item.label, $event) : item.command && item.command()" />
          <Menu
            v-if="item.items"
            :ref="setMenuRef(item.label)"
            :model="item.items"
            :popup="true" />
        </div>
      </nav>
    </Header>
    <main
      id="main"
      class="wrapper min-h-screen bg-gray-100 lg:ml-20">
      <router-view />
    </main>

    <FooterSpazio />
  </div>

  <PDialog
    v-model:visible="showAuthDialog"
    :modal="true"
    :closable="true"
    :header="$t(authDialogTitle)"
    class="w-11/12 sm:w-5/12">
    <AuthForms :formType="authFormType" />
  </PDialog>

  <PDialog
    v-model:visible="isAdmin"
    :modal="true"
    :closable="true"
    :header="$t(authDialogTitle)"
    class="w-11/12 sm:w-5/12">
    <InternalRedirect />
  </PDialog>
</template>

<script setup lang="ts">
import { ref, computed, provide, onMounted, onUnmounted } from 'vue';
import FooterSpazio from '@/components/public/footer/FooterSpazio.vue';
import { Dialog as PDialog, Button, Menu } from 'primevue';
import type { PublicMenuItemInterface } from '@/interfaces/public-menu-item.interface.ts';
import AuthForms from '@/ui/views/public/auth/AuthForms.vue';
import InternalRedirect from '@/components/InternalRedirect.vue';
import Header from '@/components/Header.vue';
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

const menuRefs = ref<{ [key: string]: any }>({});
const setMenuRef = (key: string) => {
  if (!Object.prototype.hasOwnProperty.call(menuRefs.value, key)) {
    menuRefs.value[key] = ref(null);
  }
  return menuRefs.value[key];
};

const toggleMenu = (key: string, event: Event) => {
  const menu = menuRefs.value[key]?.value; // Asegura que existe antes de acceder
  if (menu) {
    menu.toggle(event);
  }
};
const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);
const getSecondaryItems = (): PublicMenuItemInterface[] => {
  const items: PublicMenuItemInterface[] = [
    { label: 'Carrito', icon: 'pi pi-shopping-cart', command: () => alert('Carrito de canje') },
    { label: 'Tus productos', icon: 'pi pi-heart', command: () => alert('Tus productos') },
    { label: 'Categorias', icon: 'pi pi-list', command: () => alert('Categorias') },
  ];

  if (isAuthenticated.value) {
    items.push({
      label: 'Mi cuenta',
      icon: 'pi pi-user',
      items: [
        { label: 'Perfil', icon: 'pi pi-user-edit', command: () => alert('Perfil') },
        { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => alert('Cerrar sesión') },
      ],
    });
  } else {
    items.push({ label: 'Iniciar sesión', icon: 'pi pi-sign-in', command: () => openAuthDialog('login') });
  }

  return items;
};
const secondaryItems = ref<PublicMenuItemInterface[]>(getSecondaryItems());




// Estados del diálogo de autenticación
const authFormType = ref<'login' | 'signup'>('login');
const showAuthDialog = ref(false);
const authDialogTitle = ref('auth.title');

const openAuthDialog = (formType: 'login' | 'signup') => {
  authFormType.value = formType;
  authDialogTitle.value = formType === 'login' ? 'login.title' : 'register.title';
  showAuthDialog.value = true;
};
provide('openAuthDialog', openAuthDialog);

/****** temporal *********/
const role = ['RENTER'];
/****** temporal *********/
/*const menuItems = computed(() => getMenuItemsByRoles(userStore.userRoles, t));*/
const menuItems = computed(() => getMenuItemsByRoles(role, t));
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

//Estados dialog redirigir
const isAdmin = ref(userStore.isAdmin());

</script>

<style scoped>
.wrapper {
  flex: 1;
}
</style>
<style>
@import '@/assets/css/generic.css';
</style>
