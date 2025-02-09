<template>
  <div>
    <div v-if="isAuthenticated">
      <Message
        severity="success"
        class="mb-4">
        ¡Hola, <span class="font-semibold">{{ firstName }}!</span> <br />
        Has iniciado sesión, ahora puedes seguir explorando.
      </Message>
    </div>

    <component
      :is="currentForm"
      v-else
      @toggleForm="toggleForm" />
  </div>
</template>

<script setup lang="ts">
import { watch, ref, markRaw, defineAsyncComponent, computed } from 'vue';
import { useUserStore } from '@/store/user.ts';
import Message from 'primevue/message';

// Props
const props = defineProps<{
  formType: 'login' | 'signup';
}>();

//Estados

// Componentes asíncronos
const LoginForm = markRaw(defineAsyncComponent(() => import('@/components/public/auth/LoginForm.vue')));
const SignUpForm = markRaw(defineAsyncComponent(() => import('@/components/public/auth/SignUpForm.vue')));

// Control del formulario actual
const currentForm = ref<typeof LoginForm | typeof SignUpForm>(LoginForm);

// Cambiar formulario al alternar
const toggleForm = () => {
  currentForm.value = currentForm.value === LoginForm ? SignUpForm : LoginForm;
};
const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);
const firstName = computed(() => userStore.userFirstName);

// Observa cambios en formType para inicializar el formulario
watch(
  () => props.formType,
  (newFormType) => {
    currentForm.value = newFormType === 'login' ? LoginForm : SignUpForm;
  },
  { immediate: true },
);
</script>

<style scoped></style>
