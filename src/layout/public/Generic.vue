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
          <!-- Botón del ícono -->
          <PButton
            type="button"
            :icon="item.icon"
            severity="help"
            text
            rounded
            :title="item.label"
            @click="item.items ? toggleMenu(item.label, $event) : item.command && item.command()" />
          <!-- Menú emergente -->
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
    <slot></slot>
  </main>

  <FooterSpazio />
  <PDialog
    v-model:visible="showLoginDialog"
    :modal="true"
    :closable="true"
    :header="$t('login.title')"
    class="w-11/12 sm:w-5/12">
    <LoginForm @loginSuccess="handleLoginSuccess" />
  </PDialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, provide } from 'vue';
import FooterSpazio from '@/components/public/footer/FooterSpazio.vue';
import { Menubar, Button as PButton, Dialog as PDialog, Menu as PMenu } from 'primevue';
import { useUserStore } from '@/store/user';
import type { PublicMenuItemInterface } from '@/interfaces/public-menu-item.interface.ts';
import LoginForm from '@/components/LoginForm.vue';

export default defineComponent({
  name: 'Generic',
  components: { Menubar, FooterSpazio, PButton, PDialog, LoginForm, PMenu },
  setup() {
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

      if (userStore.user) {
        const roleItems = userStore.user.roles
          .map((role): PublicMenuItemInterface | null => {
            switch (role.name) {
              case 'ADMIN':
                return {
                  label: 'Panel de Administración',
                  icon: 'pi pi-cog',
                  command: () => alert('Abrir panel de administración'),
                };
              case 'renter':
                return {
                  label: 'Mis Arriendos',
                  icon: 'pi pi-building',
                  items: [
                    { label: 'Departamento', command: () => alert('Ver departamento') },
                    { label: 'Oficina', command: () => alert('Ver oficina') },
                  ],
                };
              case 'propertyOwner':
                return {
                  label: 'Mis Propiedades',
                  icon: 'pi pi-home',
                  items: [
                    { label: 'Casa en Quito', command: () => alert('Ver casa') },
                    { label: 'Terreno en Guayaquil', command: () => alert('Ver terreno') },
                  ],
                };
              case 'agent':
                return {
                  label: 'Gestión de Clientes',
                  icon: 'pi pi-users',
                  command: () => alert('Gestionar clientes'),
                };
              default:
                return null;
            }
          })
          .filter((item): item is PublicMenuItemInterface => item !== null);

        items.push(...roleItems);
      }
      return items;
    });
    const menuRefs = ref<{ [key: string]: any }>({});
    const setMenuRef = (key: string) => {
      if (!menuRefs.value[key]) {
        menuRefs.value[key] = ref();
      }
      return menuRefs.value[key];
    };
    // Alternar el menú emergente al hacer clic
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
      if (userStore.user) {
        items.push({
          label: 'Mi cuenta',
          icon: 'pi pi-user',
          items: [
            { label: 'Perfil', icon: 'pi pi-user-edit', command: () => alert('Perfil') },
            { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => alert('Cerrar sesión') },
          ],
        });
      } else {
        items.push({
          label: 'Iniciar sesión',
          icon: 'pi pi-sign-in',
          command: () => {
            showLoginDialog.value = true;
          },
        });
      }
      return items;
    });

    //LOGIN DIALOG
    const showLoginDialog = ref(false);
    provide('openLoginDialog', () => {
      showLoginDialog.value = true;
    });
    const handleLoginSuccess = ({ user, token }: { user: any; token: string }) => {
      console.log('Usuario autenticado:', user, 'Token:', token);
      showLoginDialog.value = false;
    };

    return { menuItems, secondaryItems, toggleMenu, setMenuRef, handleLoginSuccess, showLoginDialog };
  },
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
