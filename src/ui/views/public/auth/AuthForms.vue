<template>
  <component
    :is="currentForm"
    @authSuccess="$emit('authSuccess')" />
</template>

<script setup lang="ts">
import { watch, ref, markRaw, defineAsyncComponent } from 'vue';

// Props
const props = defineProps<{
  formType: 'login' | 'signup';
}>();

// Componentes asíncronos
const LoginForm = markRaw(defineAsyncComponent(() => import('@/components/public/auth/LoginForm.vue')));
const SignUpForm = markRaw(defineAsyncComponent(() => import('@/components/public/auth/SignUpForm.vue')));

// Control del formulario actual
const currentForm = ref(LoginForm);

// Observa cambios en formType para actualizar el formulario
watch(
  () => props.formType,
  (newFormType) => {
    console.log('Cambiando formulario a:', newFormType); // DEBUG
    currentForm.value = newFormType === 'login' ? LoginForm : SignUpForm;
  },
  { immediate: true },
);
</script>

<style scoped></style>
