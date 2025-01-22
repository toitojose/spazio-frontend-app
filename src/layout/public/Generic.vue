<template>
  <!-- Header -->
  <Menubar
    id="main-sidebar"
    :model="menuItems">
    <template #start>
      <a
        href="/"
        class="flex items-center">
        <span class="sp-spazio-logotipo text-2xl"></span>
      </a>
    </template>

    <!-- Carrito al final -->
    <template #end>
      <div class="flex items-center space-x-4">
        <div
          v-for="item in secondaryItems"
          :key="item.label"
          class="relative">
          <PButton
            type="button"
            :icon="item.icon"
            severity="help"
            text
            rounded
            :title="item.label"
            @click="item.items ? toggleMenu(item.label, $event) : item.command && item.command()" />
          <PMenu
            v-if="item.items"
            :ref="setMenuRef(item.label)"
            :model="item.items"
            :popup="true" />
        </div>
      </div>
    </template>
  </Menubar>

  <!-- Main Wrapper -->
  <main
    id="main"
    class="wrapper bg-gray-100">
    <router-view />
  </main>

  <FooterSpazio />

  <!-- Diálogo de Autenticación -->
  <PDialog
    v-model:visible="showAuthDialog"
    :modal="true"
    :closable="true"
    :header="$t(authDialogTitle)"
    class="w-11/12 sm:w-5/12">
    <AuthForms
      v-if="showAuthDialog"
      :formType="authFormType"
      @authSuccess="handleAuthSuccess" />
  </PDialog>
</template>

<script setup lang="ts">
import { ref, computed, provide, watch } from 'vue';
import FooterSpazio from '@/components/public/footer/FooterSpazio.vue';
import { Menubar, Button as PButton, Dialog as PDialog, Menu as PMenu } from 'primevue';
import { useUserStore } from '@/store/user';
import type { PublicMenuItemInterface } from '@/interfaces/public-menu-item.interface.ts';
import AuthForms from '@/ui/views/public/auth/AuthForms.vue';

const userStore = useUserStore();

const menuItems = computed<PublicMenuItemInterface[]>(() => {
  const items: PublicMenuItemInterface[] = [
    { label: 'Más canjeados', icon: 'pi pi-thumbs-up', command: () => alert('Más canjeados') },
    { label: 'Recientes', icon: 'pi pi-clock', command: () => alert('Recientes') },
    {
      label: 'Categorías',
      icon: 'pi pi-list',
      items: [
        { label: 'Electrodomésticos', icon: 'pi pi-mobile', command: () => alert('Ver Electrodomésticos') },
        { label: 'Muebles', icon: 'pi pi-home', command: () => alert('Ver Muebles') },
        { label: 'Ropa', icon: 'pi pi-shopping-bag', command: () => alert('Ver Ropa') },
        { label: 'Libros', icon: 'pi pi-book', command: () => alert('Ver Libros') },
        { label: 'Tecnología', icon: 'pi pi-desktop', command: () => alert('Ver Tecnología') },
      ],
    },
  ];
  return items;
});

const menuRefs = ref<{ [key: string]: any }>({});
const setMenuRef = (key: string) => {
  if (!menuRefs.value[key]) {
    menuRefs.value[key] = ref();
  }
  return menuRefs.value[key];
};

const toggleMenu = (key: string, event: Event) => {
  const menu = menuRefs.value[key];
  if (menu && menu.value) {
    menu.value.toggle(event);
  }
};

const secondaryItems = computed<PublicMenuItemInterface[]>(() => {
  const items: PublicMenuItemInterface[] = [
    { label: 'Carrito', icon: 'pi pi-shopping-cart', command: () => alert('Carrito de canje') },
  ];

  if (!userStore.user) {
    items.push({ label: 'Iniciar sesión', icon: 'pi pi-sign-in', command: () => openAuthDialog('login') });
  }

  return items;
});

// Estados del diálogo de autenticación
const authFormType = ref<'login' | 'signup'>('login');
const showAuthDialog = ref(false);
const authDialogTitle = ref('auth.title');

// Proveer la función para abrir el diálogo
provide('openAuthDialog', (formType: 'login' | 'signup') => {
  console.log('Abrir formulario:', formType); // Debug
  authFormType.value = formType;
  authDialogTitle.value = formType === 'login' ? 'login.title' : 'register.title';
  showAuthDialog.value = true;
});

// Manejar autenticación exitosa
const handleAuthSuccess = ({ user, token }: { user: any; token: string }) => {
  console.log('Autenticación exitosa:', user, 'Token:', token);
  showAuthDialog.value = false;
};

// Monitorear el diálogo
watch(showAuthDialog, (newVal) => {
  console.log('Estado del diálogo:', newVal);
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
